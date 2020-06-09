import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { useRouter } from "next/router";
// import components
import { Typography } from "@material-ui/core";
import CartCard from "./CartCard";
// import store
import useStore from "../store/useStore";

// ******************
// component
// ******************

const Cart = (props) => {
	const { state } = useStore();
	const router = useRouter();

	// TODO: NEED TO CREATE DISPLAY FOR PAGE (SINGLE RESTAURANT) ONLY
	const cartList =
		state.cart &&
		state.cart
			.filter((restaurant) =>
				router.route === "/checkout"
					? restaurant.slug === router.query.restaurant
					: restaurant,
			)
			.map((restaurant) => <CartCard restaurant={restaurant} />);

	return (
		<Main component="main">
			<Typography variant="h4" component="h2" gutterBottom>
				Shopping Cart:
			</Typography>
			{cartList}
		</Main>
	);
};

Cart.propTypes = {};
export default Cart;

// ******************
// styles
// ******************

import { Main } from "../styles/elements";
