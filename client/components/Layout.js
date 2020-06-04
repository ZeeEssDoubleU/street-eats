import React, { useState } from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { AppBar, Container, Button, Typography } from "@material-ui/core";
// import store / utils
import useStore from "../store/useStore";
import { removeCredsFromCookies } from "../store/actions/auth";

// ******************
// component
// ******************
const Layout = (props) => {
	const { state, dispatch } = useStore();

	const navMenuItems = state.isAuthenticated ? (
		<>
			<StyledButton onClick={() => removeCredsFromCookies(state, dispatch)}>
				Logout
			</StyledButton>
		</>
	) : (
		<>
			<Link href="/login" passHref>
				<StyledButton>Login</StyledButton>
			</Link>
			<Link href="/signup" passHref>
				<StyledButton>Sign Up</StyledButton>
			</Link>
		</>
	);

	return (
		<>
			<Head>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
				/>
				<link
					rel="stylesheet"
					href="https://fonts.googleapis.com/icon?family=Material+Icons"
				/>
				// TODO: activate when ready
				{/* <script src="https://js.stripe.com/v3" /> */}
			</Head>
			<AppBar color="primary">
				<Nav>
					<NavBrand>
						<Link href="/restaurants" passHref>
							<StyledButton className="nav-brand">
								<Typography variant="h6">Home</Typography>
							</StyledButton>
						</Link>
					</NavBrand>
					<NavMenu>{navMenuItems}</NavMenu>
				</Nav>
			</AppBar>
			<Main component="main" maxWidth="xl">
				{props.children}
			</Main>
			<footer></footer>
		</>
	);
};

Layout.propTypes = {};

export default Layout;

// ******************
// styles
// ******************
const Nav = styled.nav`
	display: flex;
	align-items: center;
	justify-content: space-between;
`;
const NavBrand = styled.div`
	display: flex;
	align-items: center;
`;
const NavMenu = styled.div`
	display: flex;
	align-items: center;
`;
const StyledButton = styled(Button)`
	height: 4rem;
	padding: 1rem;
	color: white;
`;
const Main = styled(Container)`
	padding: calc(4rem + 1rem) 1rem;
`;
