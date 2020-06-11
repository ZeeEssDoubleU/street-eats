import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
// import components
import {
	Container,
	CardHeader,
	CardContent,
	Grid,
	TextField,
} from "@material-ui/core";
import {
	useStripe,
	useElements,
	CardNumberElement,
	CardExpiryElement,
	CardCvcElement,
} from "@stripe/react-stripe-js";
import StripeInput from "./StripeInput";
import Card_withElevate from "./Card_withElevate";
import CardActionButton from "./CardActionButton";
// import store / actions / etc
import { paymentIntent_create } from "../store/actions/auth";

// ******************
// component
// ******************

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();

	const [paymentInfo, setPaymentInfo] = useState({
		name: null,
		address: null,
		city: null,
		postalCode: null,
	});

	const handleChange = (target) => (event) => {
		const updateInfo = {
			...paymentInfo,
			[target]: event.target.value,
		};
		setPaymentInfo(updateInfo);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});
	};

	return (
		<Container maxWidth="sm">
			<Card_withElevate>
				<CardHeader title="Billing Information:" />
				<CardContent>
					<form
						autoComplete="off"
						id="form-billing"
						onSubmit={handleSubmit}
					>
						<Grid container spacing={3}>
							<Grid item xs={12}>
								<TextField
									required
									label="Full Name"
									variant="filled"
									fullWidth
									value={paymentInfo.name}
									onChange={handleChange("name")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									label="Address"
									variant="filled"
									fullWidth
									value={paymentInfo.address}
									onChange={handleChange("address")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									label="City"
									variant="filled"
									fullWidth
									value={paymentInfo.city}
									onChange={handleChange("city")}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									label="Postal Code"
									variant="filled"
									fullWidth
									value={paymentInfo.postalCode}
									onChange={handleChange("postalCode")}
								/>
							</Grid>
							<Grid item xs={12} md={6}>
								<TextField
									required
									InputProps={{
										inputComponent: StripeInput,
										inputProps: { component: CardNumberElement },
									}}
									InputLabelProps={{ shrink: true }}
									label="Card Number"
									variant="filled"
									fullWidth
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									InputProps={{
										inputComponent: StripeInput,
										inputProps: { component: CardCvcElement },
									}}
									InputLabelProps={{ shrink: true }}
									variant="filled"
									fullWidth
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									InputProps={{
										inputComponent: StripeInput,
										inputProps: { component: CardExpiryElement },
									}}
									InputLabelProps={{ shrink: true }}
									label="Expiry"
									variant="filled"
									fullWidth
								/>
							</Grid>
						</Grid>
					</form>
				</CardContent>
				<StyledCardActions>
					<CardActionButton color="primary" variant="contained">
						Place Order
					</CardActionButton>
					<CardActionButton>Cancel</CardActionButton>
				</StyledCardActions>
			</Card_withElevate>
		</Container>
	);
};
export default CheckoutForm;

// ******************
// styles
// ******************

import { StyledCardActions } from "../styles/elements";
