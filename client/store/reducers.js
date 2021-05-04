import isEmpty from "lodash/fp/isEmpty"
// import actions / utils
import { actionTypes_auth, getUser_current } from "./actions/auth"
import { actionTypes_cart, cart_getSaved } from "./actions/cart"
import { actionTypes_layout } from "./actions/layout"

// ***********
// initial state
// ***********
export const initState = (isSmallerThanLarge) =>
	typeof window !== "undefined"
		? {
				isAuthenticated: !isEmpty(getUser_current()),
				user_current: getUser_current(),
				cart: cart_getSaved(),
				isSmallerThanLarge,
				display_cart: false,
		  }
		: {}

// ***********
// root reducer
// ***********
export const reducer_root = (state, action) => {
	console.log("action:", action)

	switch (action.type) {
		// *** auth actions
		case actionTypes_auth.SET_CURRENT_USER:
			return {
				...state,
				user_current: action.payload,
				isAuthenticated: !isEmpty(action.payload), // if no user, set to false
			}
		// *** cart actions
		case actionTypes_cart.ADD_ITEM:
			return {
				...state,
				cart: reducer_cart_addItem(state.cart, action.payload),
			}
		case actionTypes_cart.REMOVE_ITEM:
			return {
				...state,
				cart: reducer_cart_removeItem(state.cart, action.payload),
			}
		case actionTypes_cart.REMOVE_RESTAURANT_FROM_CART:
			return {
				...state,
				cart: reducer_removedRestaurant(state.cart, action.payload),
			}
		case actionTypes_cart.TOGGLE_CART:
			return {
				...state,
				display_cart: action.payload,
			}
		case actionTypes_layout.SET_IS_MOBILE:
			return {
				...state,
				isSmallerThanLarge: action.payload,
			}

		default:
			return state
	}
}

// ***********
// sub reducers
// ***********

// TODO: need to make sure cart actions cant be performed without being auth.  state.isAuthenticated === true
// *** add item
const reducer_cart_addItem = (cart, payload) => {
	const { dish, restaurant } = payload
	const newItem = {
		id: dish.id,
		name: dish.name,
		price: dish.price,
		quantity: 1,
	}
	const newRestaurant = {
		id: restaurant.id,
		name: restaurant.name,
		slug: restaurant.slug,
		items: [],
		items_price: 0,
		items_count: 0,
	}

	// check if restaurant has been added to cart
	const restaurantExists = cart.find(
		(restaurant) => restaurant.id === newRestaurant.id,
	)

	// set restaurant to update
	const updateRestaurant = restaurantExists ? restaurantExists : newRestaurant

	// check if item has been added to existing restaurant
	const itemExists = updateRestaurant.items.find(
		(item) => item.id === newItem.id,
	)

	// UPDATE restaurant cart items
	updateRestaurant.items = !itemExists
		? // if newItem NOT already added, add to restaurant cart
		  [...updateRestaurant.items, newItem]
		: // if newItem already added, find match and increment quantity +1
		  updateRestaurant.items.map((item) => {
				if (item.id === newItem.id) {
					item.quantity += 1
					return item
				} else {
					return item
				}
		  })

	// UPDATE restaurant cart total cost
	updateRestaurant.items_price = updateRestaurant.items_price + newItem.price
	updateRestaurant.items_count =
		updateRestaurant.items_count + newItem.quantity

	// UPDATE global cart with updated restaurant cart
	const updateCart = restaurantExists
		? // if restaurant already added, find match and update restaurant
		  cart.map((restaurant) =>
				restaurant.id === updateRestaurant.id
					? updateRestaurant
					: restaurant,
		  )
		: // if restaurant NOT already added, add to cart
		  [...cart, updateRestaurant]

	localStorage.setItem("cart", JSON.stringify(updateCart))
	return updateCart
}

// *** remove item
const reducer_cart_removeItem = (cart, payload) => {
	const { dish, restaurant } = payload
	const cart_removeItem = { id: dish.id }
	const cart_removeRestaurant = { id: restaurant.id }

	// check if restaurant has been added to cart
	const restaurantExists = cart.find(
		(restaurant) => restaurant.id === cart_removeRestaurant.id,
	)

	// set restaurant to update
	const updateRestaurant = restaurantExists

	// check if item has been added to existing restaurant
	const itemExists = updateRestaurant.items.find(
		(item) => item.id === cart_removeItem.id,
	)

	// UPDATE restaurant cart items
	updateRestaurant.items =
		itemExists.quantity === 1
			? // if there is only 1 item, remove the item completely
			  updateRestaurant.items.filter(
					(item) => item.id !== cart_removeItem.id,
			  )
			: // if there is MORE than 1 of the item, decrement by 1
			  updateRestaurant.items.map((item) => {
					if (item.id === cart_removeItem.id) {
						item.quantity -= 1
						return item
					} else {
						return item
					}
			  })

	// UPDATE restaurant cart total cost
	updateRestaurant.items_price =
		updateRestaurant.items_price - itemExists.price
	updateRestaurant.items_count = updateRestaurant.items_count - 1

	// UPDATE global cart with updated restaurant cart
	const updateCart = cart
		.map((restaurant) =>
			// UPDATE corresponding restaurant
			restaurant.id === updateRestaurant.id ? updateRestaurant : restaurant,
		)
		// REMOVE any restaurants from cart that don't have items
		.filter((restaurant) => restaurant.items.length > 0)

	localStorage.setItem("cart", JSON.stringify(updateCart))
	return updateCart
}

// *** remove restaurant from cart
const reducer_removedRestaurant = (cart, payload) => {
	const id = payload
	const updateCart = cart.filter((restaurant) => restaurant.id !== id)

	localStorage.setItem("cart", JSON.stringify(updateCart))
	return updateCart
}
