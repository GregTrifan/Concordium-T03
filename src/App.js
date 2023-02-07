import Navbar from "./components/Navbar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Toaster } from "react-hot-toast";
const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function App() {
	return (
		<ThemeProvider theme={darkTheme}>
			<Toaster />
			<CssBaseline />
			<Navbar />
		</ThemeProvider>
	);
}

export default App;
