import React from "react";
import { StylesProvider, CssBaseline } from "@material-ui/core";
import { ThemeProvider as MuiThemeProvider } from "@material-ui/core/styles";
import { ThemeProvider } from "styled-components";
// import styles
import { theme } from "../styles/theme";
import ResetStyle from "../styles/reset";
import GlobalStyle from "../styles/global";
// import "bootstrap/dist/css/bootstrap.min.css"; // ? enable as needed
// components
import Layout from "../components/Layout";
// import store
import { StoreProvider } from "../store/useStore";

const WrapRoot = ({ Component, pageProps }) => {
	return (
		<StylesProvider injectFirst>
			<CssBaseline />
			<MuiThemeProvider theme={theme}>
				<ThemeProvider theme={theme}>
					<StoreProvider>
						<Layout {...pageProps}>
							<Component {...pageProps} />
						</Layout>
					</StoreProvider>
				</ThemeProvider>
			</MuiThemeProvider>
		</StylesProvider>
	);
};

export default WrapRoot;
