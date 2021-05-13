import { useRouter } from "next/router"
// import components
import { Container } from "@material-ui/core"
import { PrivateRoute } from "../../components/Auth"
import { CartList } from "../../components/Cart"
import Checkout from "../../components/Pages/Checkout"
import { useIsomorphicEffect } from "../../hooks"
// import store / actions / utils
import useStore from "../../store/useStore"
import { creds_areValid } from "../../store/actions/auth"

// ***********
// component
// ***********

export default ({ isAuth, ...props }) => {
	const router = useRouter()
	const { state } = useStore()

	useIsomorphicEffect(() => {
		// redirect to restaurants if no cart
		if (state.cart.length === 0) {
			router.back()
		}
	}, [])

	const conditionalCheckout =
		state.cart?.length === 0 ? <CartList /> : <Checkout {...props} />

	return (
		<PrivateRoute isAuth={isAuth}>
			<Container maxWidth="sm">{conditionalCheckout}</Container>
		</PrivateRoute>
	)
}

// ***********
// inital props
// ***********
export async function getServerSideProps(ctx) {
	const isAuth = creds_areValid(ctx)

	return { props: { isAuth } }
}
