import React, { useState } from "react";
// import components
import {
	Card,
	CardHeader,
	CardActionArea,
	CardContent,
} from "@material-ui/core";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
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
		amount: 0,
		dishes: [],
	});

	const handleSubmit = async (event) => {
		event.preventDefault();
		const { error, paymentMethod } = await stripe.createPaymentMethod({
			type: "card",
			card: elements.getElement(CardElement),
		});
	};

	return (
		<form onSubmit={handleSubmit}>
			<CardElement />
			<button type="submit" disabled={!stripe}>
				Pay
			</button>
		</form>
	);
};
export default CheckoutForm;
