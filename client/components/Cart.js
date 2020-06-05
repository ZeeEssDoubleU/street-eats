import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
// import components
import {
	Box,
	Container,
	Drawer,
	Card,
	CardHeader,
	CardActionArea,
	CardContent,
	ButtonGroup,
	Button,
	Typography,
} from "@material-ui/core";
import { CardActionButton } from "./elements/CardActionButton";
// import store
import useStore from "../store/useStore";
import { addItem, removeItem } from "../store/actions/cart";

// ******************
// component
// ******************

const Cart = (props) => {
	const { state, dispatch } = useStore();

	const displayItems = (restaurant) => (
		<>
			<Typography variant="h6" gutterBottom>
				Items:
			</Typography>
			{restaurant.items.map((item) => (
				<ItemGroup key={item.id}>
					<GridBetween>
						<Typography>{item.name}</Typography>
						<Typography>
							{item.quantity} x ${item.price}
						</Typography>
					</GridBetween>
					<GridRight>
						<ButtonGroup>
							<ItemCountButton
								onClick={() => {
									const dish = item;
									const payload = { dish, restaurant };
									removeItem(payload, state, dispatch);
								}}
							>
								-
							</ItemCountButton>
							<ItemCount disabled>{item.quantity}</ItemCount>
							<ItemCountButton
								onClick={() => {
									const dish = item;
									const payload = { dish, restaurant };
									addItem(payload, state, dispatch);
								}}
							>
								+
							</ItemCountButton>
						</ButtonGroup>
					</GridRight>
				</ItemGroup>
			))}
			<GridBetween>
				<Typography variant="h6">Total:</Typography>
				<Typography variant="h6">${restaurant.items_total}</Typography>
			</GridBetween>
		</>
	);
	const displayCartAll =
		state.cart &&
		state.cart.map((restaurant) => (
			<StyledCard key={restaurant.id}>
				<StyledActionArea component="div" disableRipple>
					<CardHeader title={restaurant.name} />
					<CardContent>{displayItems(restaurant)}</CardContent>
					<Link
						// TODO: will need to fix these links
						as={`/restaurants/${restaurant.slug}/checkout`}
						href={`/restaurants/[slug]/checkout`}
						passHref
					>
						<CardActionButton
							variant="contained"
							color="secondary"
							fullWidth
						>
							Order
						</CardActionButton>
					</Link>
				</StyledActionArea>
			</StyledCard>
		));

	const displayCartPage = () => {};

	return (
		// TODO: set cart drawer to persistent
		// TODO: add toggle to cart drawer
		// TODO: consider moving drawer component to layout
		<StyledDrawer variant="permanent" anchor="right">
			<Main component="main">
				<Typography variant="h4" component="h2" gutterBottom>
					Shopping Cart:
				</Typography>
				{displayCartAll}
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
const StyledCard = styled(Card)`
	margin: 1rem 0;
`;
const StyledActionArea = styled(CardActionArea)`
	cursor: default;
`;
const ItemGroup = styled.div`
	margin-bottom: 1rem;
`;
const GridBetween = styled.div`
	display: grid;
	grid-template-columns: auto auto;
	grid-gap: 1rem;
	justify-content: space-between;
`;
const GridRight = styled.div`
	display: grid;
	justify-content: left;
`;
const ItemCountButton = styled(Button)`
	height: 1.5rem;
`;
const ItemCount = styled(ItemCountButton)`
	&.Mui-disabled {
		color: ${(props) => props.theme.button.disabled.color};
		border-color: ${(props) => props.theme.button.disabled.borderColor};
		border-right-color: ${(props) =>
			props.theme.button.disabled.borderRightColor};
	}
`;
