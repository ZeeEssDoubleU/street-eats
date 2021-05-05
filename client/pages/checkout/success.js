// import components
import Success from "../../components/Pages/Checkout/Success"
import PrivateRoute from "../../components/Auth/PrivateRoute"
// import utils
import { creds_areValid } from "../../store/actions/auth"
import { getOrder } from "../../store/actions/order"

// ***********
// component
// ***********
export default function SuccessPage({ order, isAuth, ...props }) {
	return (
		<PrivateRoute isAuth={isAuth}>
			<Success order={order} {...props} />
		</PrivateRoute>
	)
}

// ***********
// inital props
// ***********

export const getServerSideProps = async (ctx) => {
	// TODO: need to create check so that only logged in user can see their orders
	//		-	check order user id
	//		-	check that logged in user matches order user id

	// TODO: create dashboard where user can check their orders
	//		- filter orders matching user id (db)
	// 	- display all orders

	const isAuth = creds_areValid(ctx)
	const orderId = ctx.query?.order
	const order = orderId && (await getOrder(orderId))

	return {
		props: {
			order: order || null,
			isAuth,
		},
	}
}
