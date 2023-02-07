import React,{useState} from 'react'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import { Alert } from '@mui/material';
import toast from 'react-hot-toast';
const Wallet = () => {
    const [provider, setProvider] = useState(null);
    const [address, setAddress] = useState(null);
    const setWallet = () => {
    detectConcordiumProvider()
      .then((provider) => {
        setProvider(provider);
        provider
          .connect()
          .then((accountAddress) => {
            setAddress(accountAddress);
          })
          .catch(() =>
          toast.custom(t=> (<Alert severity="error">
            Connection to the Concordium browser wallet was rejected.
            </Alert>))
          );
      })
      .catch(() =>
        toast.custom(t=> (<Alert severity="error">
            Connection to the Concordium browser wallet timed out.
            </Alert>))
      );
  };
  if (provider && address)
  return (
   <Button startIcon={<AccountBalanceWalletIcon />} color="info" variant="contained">
    {address.slice(0,3)}...{address.slice(address.length-3,address.length)}
    </Button>
  )
  return (
    <Button onClick={()=>setWallet()} startIcon={<LoginIcon />} color="primary" variant="outlined">Connect wallet</Button>
  )
}

export default Wallet