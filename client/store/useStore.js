import React, {
	createContext,
	useContext,
	useEffect,
	useState,
	useReducer,
} from "react";
import isEmpty from "lodash/fp/isEmpty";
import Cookies from "js-cookie";
// import actions / utils
import { actionTypes_auth, getUser_current } from "./actions/auth";
import { actionTypes_cart } from "./actions/cart";

// ******************
// reducer
// ******************
const reducer = (state, action) => {
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
		// TODO: need to set up cart reducer logic
		case actionTypes_cart.ADD_ITEM:
		case actionTypes_cart.REMOVE_ITEM:
		default:
			return state;
	}
};

// ******************
// initial state
// ******************

// ! this causing render error on logout button.  May need to move initial logic to useEffect in StoreProvider
const initialState =
	typeof window !== "undefined"
		? {
				isAuthenticated: !isEmpty(getUser_current()),
				user_current: getUser_current(),
				cart: [],
		  }
		: {}; // fall back to empty object if window undefined

const StoreContext = createContext();

export const StoreProvider = ({ children }) => {
	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<StoreContext.Provider value={{ state, dispatch }}>
			{children}
		</StoreContext.Provider>
	);
};

// useStore hook.  Acts as Consumer through useContext
export default () => {
	const { state, dispatch } = useContext(StoreContext);
	return { state, dispatch };
};
