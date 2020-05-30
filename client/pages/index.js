import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
// components
import { Button, FormControlLabel, Switch } from "@material-ui/core";
import RestaurantList from "../components/RestaurantList";

// ******************
// component
// ******************
const index = (props) => {
	return <RestaurantList restaurants={props.restaurants} />;
};

export default index;

// ******************
// initial props
// ******************
// TODO: consider implementing when ready for build
// TODO: also consider moving restaurant fetching to its own page
export async function getStaticProps() {
	try {
		const response = await axios({
			method: "get",
			url: "/restaurants",
			baseURL: "http://localhost:1337",
		});
		const restaurants = response.data;

		return {
			props: {
				restaurants,
			},
		};
	} catch (error) {
		console.error(error);
	}
}
