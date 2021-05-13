import React from "react"
import styled from "styled-components"
import Link from "next/link"
// import components
import { CardHeader, CardContent } from "@material-ui/core"
import CardActionButton from "./CardActionButton"
import Card_Elevate from "./Card_Elevate"
import CartCardItems from "../Cart/CartCardItems"
// import icons
import { Close } from "@material-ui/icons"
// import store / actions
import useStore from "../../store/useStore"
import { cart_removeRestaurant } from "../../store/actions/cart"

// ***********
// component
// ***********

export default function Card_Cart({ disabled, isEmpty, ...props }) {
	const { state, dispatch } = useStore()

	const displayCard = isEmpty ? (
		// if card has empty prop, display empty text
		<Card_Elevate>
			<CardHeader title="Cart is empty!" />
			<CardContent>Add some items to your shopping cart.</CardContent>
		</Card_Elevate>
	) : (
		// else, display full card
		<Card_Elevate key={props.restaurant.id}>
			<CardHeader
				title={
					<Flex>
						{props.restaurant.name}
						<CloseButton
							onClick={() =>
								cart_removeRestaurant(
									props.restaurant.id,
									state,
									dispatch,
								)
							}
						>
							<Close />
						</CloseButton>
					</Flex>
				}
			/>
			<CardContent>
				<CartCardItems restaurant={props.restaurant} />
			</CardContent>
			{props.cart === "checkout" ? null : (
				<StyledCardActions>
					<Link
						// check if authenticated
						// redirect to login page if not
						href={state.isAuthenticated ? "/checkout/[vendor]" : "/login"}
						as={
							state.isAuthenticated
								? `/checkout/${props.restaurant.slug}`
								: null
						}
						passHref
					>
						<CardActionButton
							variant="contained"
							color="secondary"
							fullWidth
							disabled={disabled}
						>
							{disabled ? "Currently in Checkout" : "Go to Checkout"}
						</CardActionButton>
					</Link>
				</StyledCardActions>
			)}
		</Card_Elevate>
	)

	return <>{displayCard}</>
}

// ***********
// styles
// ***********

import { StyledCardActions } from "../../styles/elements"

const Flex = styled.div`
	display: flex;
	justify-content: space-between;
`
const CloseButton = styled(CardActionButton)`
	margin-left: 2rem;

	&.MuiButton-root {
		height: min-content;
		width: min-content;
		min-width: 0;
		padding: 0.1rem;
	}
`
