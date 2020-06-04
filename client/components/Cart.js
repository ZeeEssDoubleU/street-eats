import React from "react";
import PropTypes from "prop-types";
// import components
import {
	SwipeableDrawer,
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

const Cart = (props) => {
	const { state, dispath } = useStore();

	return <>This is the cart</>;
};

Cart.propTypes = {};

export default Cart;
