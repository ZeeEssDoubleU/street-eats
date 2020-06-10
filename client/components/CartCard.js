import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
// import components
import { CardHeader, CardContent } from "@material-ui/core";
import CardActionButton from "./CardActionButton";
import CartCardItems from "./CartCardItems";
import Card_withElevate from "./Card_withElevate";
// import store
import useStore from "../store/useStore";

// ******************
// component
// ******************

const CartCard = (props) => {
	const { state, dispatch } = useStore();
	const router = useRouter();

	// check if authenticated
	// redirect to login page if not
	const isAuthenticated = state.isAuthenticated
		? {
				pathname: "/checkout",
				query: { restaurant: props.restaurant?.slug },
		  }
		: "/login";

	const displayCard = props.isEmpty ? (
		// if card has empty prop, display empty text
		<Card_withElevate>
			<CardHeader title="Cart is empty!" />
			<CardContent>Add some items to your shopping cart.</CardContent>
		</Card_withElevate>
	) : (
		// else, display full card
		<Card_withElevate key={props.restaurant.id}>
			<CardHeader title={props.restaurant.name} />
			<CardContent>
				<CartCardItems restaurant={props.restaurant} />
			</CardContent>
			<StyledCardActions>
				<Link href={isAuthenticated} passHref>
					<CardActionButton
						variant="contained"
						color="secondary"
						fullWidth
					>
						{router.route === "/checkout"
							? "Place Order"
							: "Go to Checkout"}
					</CardActionButton>
				</Link>
			</StyledCardActions>
		</Card_withElevate>
	);

	return <>{displayCard}</>;
};

CartCard.propTypes = {};
export default CartCard;

// ******************
// styles
// ******************

import { StyledCardActions } from "../styles/elements";
