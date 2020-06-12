import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
// import components
import { Grid } from "@material-ui/core";
import CardActionButton from "../../components/CardActionButton";
import ListingCard from "../../components/ListingCard";
// import urls
import keys from "../../../config/keys";

// ******************
// component
// ******************

const restaurants = ({ restaurants }) => {
	const displayRestaurants = restaurants?.map((restaurant) => (
		<Grid item key={restaurant.id}>
			<ListingCard
				image={`${keys.API_DOMAIN}${restaurant.image[0].url}`}
				name={restaurant.name}
				description={restaurant.description}
				buttonText="View Menu"
				hasLink
				as={`/restaurants/${restaurant.slug}`}
				href={`/restaurants/[restaurant]`}
			/>
		</Grid>
	));

	return <StyledGrid>{displayRestaurants}</StyledGrid>;
};

export default restaurants;

// ******************
// initial props
// ******************
export const getStaticProps = async () => {
	try {
		const { data } = await axios.get(`${keys.API_DOMAIN}/restaurants`);
		const restaurants = data;

		return {
			props: {
				restaurants,
			},
		};
	} catch (error) {
		console.error(error);
	}
};

// ******************
// styles
// ******************

import { StyledGrid } from "../../styles/elements";
