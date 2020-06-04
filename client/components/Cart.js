import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import components
import {
	Container,
	Drawer,
	Grid,
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	CardActions,
	Button,
	Typography,
} from "@material-ui/core";
// import store
import useStore from "../store/useStore";
import { addItem, removeItem } from "../store/actions/cart";

// ******************
// component
// ******************

const Cart = (props) => {
	const { state, dispath } = useStore();

	return (
		// TODO: set cart drawer to persistent
		// TODO: add toggle to cart drawer
		// TODO: consider moving drawer component to layout
		<StyledDrawer variant="permanent" anchor="right">
			<Main component="main">
				<Typography variant="h4" component="h2">
					Shopping Cart
				</Typography>
			</Main>
		</StyledDrawer>
	);
};

Cart.propTypes = {};

// ******************
// styles
// ******************

export default Cart;

const StyledDrawer = styled(Drawer)`
	width: ${(props) => props.theme.drawer.width};
	z-index: ${(props) => props.theme.drawer.zIndex};
	.MuiDrawer-paper {
		width: ${(props) => props.theme.drawer.width};
	}
`;

const Main = styled(Container)`
	padding: calc(4rem + 1rem) 1rem;
`;
