import axios from "axios";
import { setRequestHeaders } from "./auth";

export const actionTypes_cart = {
	CREATE_PAYMENT_INTENT: "CREATE_PAYMENT_INTENT",
	GET_PAYMENT_INTENT: "GET_PAYMENT_INTENT",
};

export const paymentIntent_create = async (checkoutSlug, state, dispatch) => {
	const items = state.cart
		? state.cart.filter((restaurant) => restaurant.slug === checkoutSlug)
		: null;

	console.log("ITEMS", items);

	try {
		const response = await axios.post(
			"http://localhost:1337/orders/payment-intent",
			items,
			setRequestHeaders(),
		);
		const { client_secret } = response.data;

		dispatch({
			type: actionTypes_cart.CREATE_PAYMENT_INTENT,
			payload: null,
		});

		// return payment intent client_secret
		return client_secret;
	} catch (error) {
		console.error(error);
	}
};
