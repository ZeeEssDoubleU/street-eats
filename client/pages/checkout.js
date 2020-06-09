import React, { useEffect } from "react";
import PropTypes from "prop-types";
import Router, { useRouter } from "next/router";
import { loadStripe } from "@stripe/stripe-js";
// import components
import CheckoutForm from "../components/CheckoutForm";
import { Elements as StripeElementsProvider } from "@stripe/react-stripe-js";
// import store / actions
import useStore from "../store/useStore";
import { paymentIntent_create } from "../store/actions/order";
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

	useEffect(() => {
		// redirect login if not logged in
		if (!state.isAuthenticated) {
			Router.push("/login");
			// redirect to restaurants if no cart
		} else if (state.cart.length === 0) {
			Router.back();
		}
	}, []);

	useEffect(() => {
		if (router.route === "/checkout") {
			const checkoutSlug = router.query.restaurant;
			paymentIntent_create(checkoutSlug, state, dispatch);
		}
	}, [router.route]);

	return (
		<StripeElementsProvider stripe={stripePromise}>
			<CheckoutForm />
		</StripeElementsProvider>
	);
};
checkout.propTypes = {};
export default checkout;
