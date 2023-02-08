import Navbar from "./components/Navbar";
import Counter from "./components/Counter";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
import { useAtomValue } from 'jotai';
import { walletPresentAtom } from './store/walletStore';
import { Typography } from "@mui/material";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
    const walletPresent = useAtomValue(walletPresentAtom);
	return (
		<ThemeProvider theme={darkTheme}>
			<Toaster />
			<CssBaseline />
			<Navbar />
			{walletPresent
            ? (<Counter />)
            : (<Typography variant="h4" sx={{textAlign:"center",marginTop:"3rem"}}>
                Connect Wallet to see content
                </Typography>)}
		</ThemeProvider>
	);
}

export default App;
