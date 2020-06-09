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

const CartCard = ({ restaurant }) => {
	const { state, dispatch } = useStore();
	const router = useRouter();

	// check if authenticated
	// redirect to login page if not
	const isAuthenticated = state.isAuthenticated
		? {
				pathname: "/checkout",
				query: { restaurant: restaurant.slug },
		  }
		: "/login";

	return (
		<StyledCard key={restaurant.id}>
			<StyledActionArea component="div" disableRipple>
				<CardHeader title={restaurant.name} />
				<CardContent>
					<CartCardItems restaurant={restaurant} />
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
