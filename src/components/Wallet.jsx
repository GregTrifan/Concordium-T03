import React from 'react'
import Button from '@mui/material/Button';
import LoginIcon from '@mui/icons-material/Login';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { useAtomValue, useSetAtom } from 'jotai';
import { walletPresentAtom, addressPreviewAtom, initiateWalletAtom } from '../store/walletStore';
const Wallet = () => {
    const walletPresent = useAtomValue(walletPresentAtom);
    const previewAddress = useAtomValue(addressPreviewAtom);
    const initiateWallet = useSetAtom(initiateWalletAtom);

  if (walletPresent)
  return (
   <Button startIcon={<AccountBalanceWalletIcon />} color="info" variant="contained">
    {previewAddress}
    </Button>
  )
  return (
    <Button onClick={initiateWallet} startIcon={<LoginIcon />} color="primary" variant="outlined">Connect wallet</Button>
  )
}

export default Wallet