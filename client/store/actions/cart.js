export const actionTypes_cart = {
	ADD_ITEM: "ADD_ITEM",
	REMOVE_ITEM: "REMOVE_ITEM",
};

export const addItem = (item, state, dispatch) => {
	dispatch({
		type: actionTypes_cart.ADD_ITEM,
		payload: item,
	});
};

export const removeItem = (item, state, dispatch) => {
	dispatch({
		type: actionTypes_cart.REMOVE_ITEM,
		payload: item,
	});
};

export const getSavedCart = () =>
	JSON.parse(localStorage.getItem("cart")) || [];
