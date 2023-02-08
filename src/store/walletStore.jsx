import { atom } from "jotai";
import { detectConcordiumProvider } from "@concordium/browser-wallet-api-helpers";
import toast from "react-hot-toast";
import { Alert } from "@mui/material";

export const walletAtom = atom({
	address: null,
	provider: null,
});

export const addressPreviewAtom = atom((get) => {
	const wallet = get(walletAtom);
	if (wallet.address)
		return `${wallet.address.slice(0, 3)}...${wallet.address.slice(
			wallet.address.length - 3,
			wallet.address.length
		)}`;
	return "XXX...XXX";
});
export const walletPresentAtom = atom((get) => {
	const wallet = get(walletAtom);
	return wallet.address !== null && wallet.provider !== null;
});

export const initiateWalletAtom = atom(
	null, // it's a convention to pass `null` for the first argument
	(get, set) => {
		detectConcordiumProvider()
			.then((provider) => {
				set(walletAtom, { ...get(walletAtom), provider });
				provider
					.connect()
					.then((accountAddress) => {
						set(walletAtom, { ...get(walletAtom), address: accountAddress });
					})
					.catch(() =>
						toast.custom((t) => (
							<Alert severity="error">
								Connection to the Concordium wallet has been rejected
							</Alert>
						))
					);
			})
			.catch(() =>
				toast.custom((t) => (
					<Alert severity="error">
						Connection to the Concordium wallet has timed out
					</Alert>
				))
			);
	}
);
