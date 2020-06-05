import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";
import Router from "next/router";

export const actionTypes_auth = {
	SET_CURRENT_USER: "SET_CURRENT_USER",
};

// if token exists, apply to ALL request auth headers
// need to add this manually to all api requests
export const setRequestHeaders = (state) => {
	const token = Cookies.get("jwt");

	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : null,
		},
	};
};

export const saveCredsToCookies = (credentials, state, dispatch) => {
	if (!process.browser) return;

	Cookies.set("user_current", credentials.user.username);
	Cookies.set("jwt", credentials.jwt);

	dispatch({
		type: actionTypes_auth.SET_CURRENT_USER,
		payload: credentials.user.username,
	});
};

export const removeCredsFromCookies = (state, dispatch) => {
	if (!process.browser) return;

	Cookies.remove("user_current");
	Cookies.remove("jwt");

	dispatch({
		type: actionTypes_auth.SET_CURRENT_USER,
		payload: null,
	});
	// to log out from all windows
	window.localStorage.setItem("logout", Date.now());

	Router.push("/login");
};

export const getUser_current = () => Cookies.get("user_current") || null;