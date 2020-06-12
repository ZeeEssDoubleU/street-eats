import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Router from "next/router";
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

const CheckoutForm = ({ paymentIntent }) => {
	const stripe = useStripe();
	const elements = useElements();
	const [loading, setLoading] = useState(false);

	const [paymentInfo, setPaymentInfo] = useState({
		name: "",
		address: "",
		city: "",
		postalCode: "",
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

		try {
			// setLoading(true);
			const response = await stripe.confirmCardPayment(
				paymentIntent.client_secret,
				{
					payment_method: {
						card: elements.getElement(CardNumberElement),
						billing_details: {
							name: paymentInfo.name,
							address: paymentInfo.address,
						},
					},
				},
			);
			setLoading(response ? true : false);

			// The payment has been processed!
			if (result.paymentIntent.status === "succeeded") {
				// setLoading(false);

				// Show a success message to your customer
				console.log("payment result:", result);

				// There's a risk of the customer closing the window before callback execution
				// Set up a webhook or plugin to listen for the payment_intent.succeeded event that handles any business critical post-payment actions.
			}
		} catch (error) {
			console.error(error);
		}
	};

	return loading ? (
		<div>Loading...</div>
	) : (
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
							<Grid item xs={12} md={6}>
								<TextField
									required
									label="City"
									variant="filled"
									fullWidth
									value={paymentInfo.city}
									onChange={handleChange("city")}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									label="State"
									variant="filled"
									fullWidth
									value={paymentInfo.state}
									onChange={handleChange("state")}
								/>
							</Grid>
							<Grid item xs={6} md={3}>
								<TextField
									required
									label="Zip Code"
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
									label=" "
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
					<CardActionButton
						color="secondary"
						variant="contained"
						type="submit"
						form="form-billing"
						disabled={!stripe || !elements ? true : false}
					>
						Place Order
					</CardActionButton>
					<CardActionButton onClick={() => Router.back()}>
						Cancel
					</CardActionButton>
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
