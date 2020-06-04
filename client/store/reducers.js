import isEmpty from "lodash/fp/isEmpty";
import Cookies from "js-cookie";
// import actions / utils
import { actionTypes_auth, getUser_current } from "./actions/auth";
import { actionTypes_cart } from "./actions/cart";

// ******************
// reducers
// ******************
export const initState =
	typeof window !== "undefined"
		? {
				isAuthenticated: !isEmpty(getUser_current()),
				user_current: getUser_current(),
				cart: {
					items: [],
					total: 0,
				},
		  }
		: {};
export const reducer_root = (state, action) => {
	console.log("action:", action);

	switch (action.type) {
		// *** auth actions
		case actionTypes_auth.SET_CURRENT_USER:
			return {
				...state,
				user_current: action.payload,
				isAuthenticated: !isEmpty(action.payload), // if no user, set to false
			};
		// *** cart actions
		case actionTypes_cart.ADD_ITEM:
			return {
				...state,
				cart: reducer_addItem(state.cart, action.payload),
			};
		case actionTypes_cart.REMOVE_ITEM:
			return {
				...state,
				cart: reducer_removeItem(state.cart, action.payload),
			};
		default:
			return state;
	}
};

const reducer_addItem = (cart, payload) => {
	const { id, name, price, restaurant } = payload;
	const newItem = { id, name, price, restaurant };

	// check if newItem has already been added
	const alreadyAdded = cart.items.find((item) => item.id === newItem.id);

	let updatedItems;
	// if NOT already added, add newItem to cart
	if (!alreadyAdded) {
		newItem.quantity = 1;
		updatedItems = [...cart.items, newItem];
	}
	// if newItem already added, find match and increment quantity +1
	else {
		alreadyAdded.quantity += 1;
		updatedItems = cart.items.map((item) =>
			item.id === newItem.id ? alreadyAdded : item,
		);
	}
	const updatedTotal = cart.total + newItem.price;

	const updatedCart = {
		...cart,
		items: updatedItems,
		total: updatedTotal,
	};

	Cookies.set("cart", updatedCart);
	return updatedCart;
};

const reducer_removeItem = (cart, payload) => {
	const { id } = payload;
	const removeItem = { id };

	// check if removeItem is actually removeable
	const itemRemovable = cart.items.find((item) => item.id === removeItem.id);

	let updatedItems;
	// if there is only 1 of the removeable item, remove the item completely
	if (itemRemovable.quantity === 1) {
		updatedItems = cart.items.filter((item) => item.id !== removeItem.id);
	}
	// if there is MORE than 1 of the removeable item, decrement by 1
	else {
		itemRemovable.quantity -= 1;
		updatedItems = cart.items.map((item) =>
			item.id === removeItem.id ? itemRemovable : item,
		);
	}
	const updatedTotal = cart.total - itemRemovable.price;

	const updatedCart = {
		...cart,
		items: updatedItems,
		total: updatedTotal,
	};

	Cookies.set("cart", updatedCart);
	return updatedCart;
};
