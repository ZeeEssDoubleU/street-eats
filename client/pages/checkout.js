import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Router, { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
import Cookies from "js-cookie";
// import components
import CheckoutForm from "../components/CheckoutForm";
import { Elements as StripeElementsProvider } from "@stripe/react-stripe-js";
// import store / actions
import useStore from "../store/useStore";
import {
	paymentIntent_create,
	paymentIntent_retrieve,
	paymentIntent_update,
} from "../store/actions/order";
import { setRequestHeaders } from "../store/actions/auth";
// import api keys
import keys from "../../config/keys";

// ******************
// component
// ******************

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(keys.STRIPE_P_KEY);

const checkout = (props) => {
	const router = useRouter();
	const { state, dispatch } = useStore();

	const filterCart = async () => {
		// grab page slug for cart filtering
		const checkoutSlug = router.query.restaurant;

		// declare checkout items
		const restaurant = await state.cart?.filter(
			(restaurant) => restaurant.slug === checkoutSlug,
		);
		const items = await restaurant[0]?.items;
		return items;
	};

	const getPaymentIntent = async () => {
		const items = await filterCart();

		// check if payment intent already exists
		const paymentIntent_id = await Cookies.get("paymentIntent_id");
		let paymentIntent;

		// if intent exists, GET payment intent
		if (paymentIntent_id) {
			paymentIntent = await paymentIntent_retrieve(
				paymentIntent_id,
				items,
				dispatch,
			);
		}
		// it no intent, CREATE payment intent
		else {
			paymentIntent = await paymentIntent_create(items, dispatch);

			// set payment intent id to cookie for future retrieval
			Cookies.set("paymentIntent_id", paymentIntent.id);
		}

		return paymentIntent;
	};

	useEffect(() => {
		// redirect login if not logged in
		if (!state.isAuthenticated) {
			Router.push("/login");
		}
		// redirect to restaurants if no cart
		else if (state.cart.length === 0) {
			Router.back();
		}
	}, []);

	useEffect(() => {
		if (router.route === "/checkout") {
			getPaymentIntent();
		}
	}, [router.route, state.cart]);

	return (
		<StripeElementsProvider stripe={stripePromise}>
			<CheckoutForm />
		</StripeElementsProvider>
	);
};
checkout.propTypes = {};
export default checkout;
