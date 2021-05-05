import axios from "axios"
// import components
import Restaurants from "../../components/Pages/Restaurants"

// ************
// component
// ************

export default function RestaurantsPage({ restaurants }) {
	return <Restaurants restaurants={restaurants} />
}

// ************
// initial props
// ************

export async function getStaticProps() {
	try {
		const { data } = await axios.get(
			`${process.env.NEXT_PUBLIC_API_URL}/restaurants`,
		)
		const restaurants = data

		return {
			props: {
				restaurants,
			},
		}
	} catch (error) {
		console.error(error)
		return {
			notFound: true,
		}
	}
}
