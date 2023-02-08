import React, { useEffect, useState } from 'react'
import toast from "react-hot-toast";
import {LinearProgress, Button, Typography, Alert } from "@mui/material";
import { Container,Stack } from '@mui/system';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useAtom,useAtomValue } from 'jotai';
import { walletAtom,walletPresentAtom } from '../store/walletStore';
import { CONTRACT_INDEX, CONTRACT_NAME, RAW_SCHEMA } from '../constants';
import {
  AccountTransactionType,
  CcdAmount,
  deserializeReceiveReturnValue,
  toBuffer,
  SchemaVersion,
} from "@concordium/web-sdk";
const Counter = () => {
     
    const [progressPercent,setProgressPercent] = useState(0);
    const [wallet,setWallet] = useAtom(walletAtom);
    const walletPresent = useAtomValue(walletPresentAtom);
    const [currentNum,setCurrentNum] = useState(0);
    useEffect(()=> {
         const intervalId = setInterval(()=> {
            if (progressPercent<=100)
                setProgressPercent((s)=>s+10);
            else 
                setProgressPercent(0)
            
        },450)
        return () => {
      clearInterval(intervalId);
    };
    },[progressPercent]);

    const fetchCount = () => {
        if (walletPresent) {
            wallet.provider
            .getJsonRpcClient()
            .invokeContract({
                contract: {
                    index:CONTRACT_INDEX,
                    subindex: BigInt(0)
                },
                method: `${CONTRACT_NAME}.view`,
                parameter: toBuffer(''),
            })
            .then(viewData => {
                let returnedVal = deserializeReceiveReturnValue(
                    toBuffer(viewData.returnValue,"hex"),
                    toBuffer(RAW_SCHEMA, "base64"),
                    CONTRACT_NAME,
                    "view",
                    SchemaVersion.V2
                );
                setCurrentNum(returnedVal.count)
            })
        }
    }

    const increment = () => {
        if (walletPresent) {
            wallet.provider
            .sendTransaction(
                wallet.address,
                AccountTransactionType.Update,
                {
                    amount: new CcdAmount(0n),
                    contractAddress: {
                        index:CONTRACT_INDEX,
                        subindex: BigInt(0)
                    },
                    receiveName:`${CONTRACT_NAME}.increment`,
                    maxContractExecutionEnergy: 3000n
                },
                RAW_SCHEMA
            )
            .then((txHash)=>{toast.custom((t) => (
							<Alert severity="success">
								Event executed successfully with Txn ${txHash}
							</Alert>
						))})
            .catch(()=>{
                toast.custom((t) => (
							<Alert severity="error">
								Transaction failed
							</Alert>
						))
                    })
        }
    }

    const decrement = () => {
        if (walletPresent) {
            wallet.provider
            .sendTransaction(
                wallet.address,
                AccountTransactionType.Update,
                {
                    amount: new CcdAmount(0n),
                    contractAddress: {
                        index:CONTRACT_INDEX,
                        subindex: BigInt(0)
                    },
                    receiveName:`${CONTRACT_NAME}.decrement`,
                    maxContractExecutionEnergy: 3000n
                },
                RAW_SCHEMA
            )
            .then((txHash)=>{toast.custom((t) => (
							<Alert severity="success">
								Event executed successfully with Txn ${txHash}
							</Alert>
						))})
            .catch(()=>{
                toast.custom((t) => (
							<Alert severity="error">
								Transaction failed
							</Alert>
						))
                    })
        }
    }

    useEffect(()=> {
        const intervalId = setInterval(()=> {
        fetchCount();
        },2000);
        return ()=> {
            clearInterval(intervalId)
        }
    },[]);
  return (
    <div>
        <Container sx={{textAlign:"center"}}>
            <LinearProgress variant="determinate" value={progressPercent} />
            <Typography variant="h1">{currentNum}</Typography>
           <Stack direction="row" spacing={20} sx={{justifyContent:"center"}}>
            <Button onClick={()=>decrement()} variant="contained" color="error" aria-label="remove" sx={{borderRadius:"50%",width:"50px",height:"60px" }}>
                    <RemoveIcon fontSize="large" />
            </Button>
            

            <Button onClick={()=>increment()} variant="contained" color="primary" aria-label="add"  sx={{borderRadius:"50%",width:"50px",height:"60px" }}>
                    <AddIcon fontSize="large" />
            </Button>
           </Stack>
            
        </Container>
        
    </div>
  )
}

export default Counter