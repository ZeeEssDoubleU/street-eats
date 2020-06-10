import axios from "axios";
import { setRequestHeaders } from "./auth";

export const actionTypes_cart = {
	CREATE_PAYMENT_INTENT: "CREATE_PAYMENT_INTENT",
	GET_PAYMENT_INTENT: "GET_PAYMENT_INTENT",
};

export const paymentIntent_create = async (checkoutSlug, state, dispatch) => {
	const restaurant = await state.cart?.filter(
		(restaurant) => restaurant.slug === checkoutSlug,
	);
	const items = await restaurant[0]?.items;

	try {
		const response = await axios.post(
			"http://localhost:1337/orders/payment-intent/create",
			items,
			setRequestHeaders(),
		);
		const paymentIntent = response.data;
		const { client_secret } = paymentIntent;

		dispatch({
			type: actionTypes_cart.CREATE_PAYMENT_INTENT,
			payload: null,
		});

		// TODO: consider only returning client secret and id
		// return payment intent client_secret
		return paymentIntent;
	} catch (error) {
		console.error(error);
	}
};
export const paymentIntent_retrieve = async (paymentIntent_id, state, dispatch) => {
	try {
		const response = await axios.post(
			"http://localhost:1337/orders/payment-intent/retrieve",
			{ paymentIntent_id },
			setRequestHeaders(),
		);
		const paymentIntent = response.data;
		const { client_secret } = paymentIntent;

		dispatch({
			type: actionTypes_cart.GET_PAYMENT_INTENT,
			payload: null,
		});

		// TODO: consider only returning client secret
		// return payment intent client_secret
		return paymentIntent;
	} catch (error) {
		console.error(error);
	}
};