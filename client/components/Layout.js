import React from "react";
import styled from "styled-components";
import Head from "next/head";
import Link from "next/link";
import { AppBar, Container, Button, Typography } from "@material-ui/core";

const Layout = (props) => {
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
				<script src="https://js.stripe.com/v3" />
			</Head>
			<AppBar color="primary">
				<Nav>
					<NavBrand>
						<Link href="/" passHref>
							<StyledButton className="nav-brand">
								<Typography variant="h6">Home</Typography>
							</StyledButton>
						</Link>
					</NavBrand>
					<NavMenu>
						<Link href="/login" passHref>
							<StyledButton>Login</StyledButton>
						</Link>
						<Link href="/signup" passHref>
							<StyledButton>Sign Up</StyledButton>
						</Link>
					</NavMenu>
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
	padding: 1em;
	color: white;
`;
const Main = styled(Container)`
	padding-top: 4rem;
`;
