import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
import { useRouter } from "next/router";
// import components
import {
	Card,
	CardHeader,
	CardActionArea,
	CardContent,
} from "@material-ui/core";
import CardActionButton from "./CardActionButton";
import CartCardItems from "./CartCardItems";
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
				query: { restaurant: props.restaurant.slug },
		  }
		: "/login";

	const displayCard = props.isEmpty ? (
		// if card has empty prop, display empty text
		<StyledCard>
			<CardHeader title="Cart is empty!" />
			<CardContent>Add some items to your shopping cart.</CardContent>
		</StyledCard>
	) : (
		// else, display full card
		<StyledCard key={props.restaurant.id}>
			<StyledActionArea component="div" disableRipple>
				<CardHeader title={props.restaurant.name} />
				<CardContent>
					<CartCardItems restaurant={props.restaurant} />
				</CardContent>
				{/* // TODO: isAuthenticted must be true to place order */}
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
			</StyledActionArea>
		</StyledCard>
	);

	return <>{displayCard}</>;
};

CartCard.propTypes = {};
export default CartCard;

// ******************
// styles
// ******************

const StyledCard = styled(Card)`
	margin: 1rem 0;
`;
const StyledActionArea = styled(CardActionArea)`
	cursor: default;
`;
