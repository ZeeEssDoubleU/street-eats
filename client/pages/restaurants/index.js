import React, { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import styled from "styled-components";
// import components
import {
	Grid,
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	Typography,
} from "@material-ui/core";
import { CardActionButton } from "../../components/elements/CardActionButton";

// ******************
// component
// ******************

const restaurants = ({ restaurants }) => {
	const displayRestaurants =
		restaurants &&
		restaurants.map((restaurant) => (
			<Grid item key={restaurant.id}>
				<Card>
					<StyledActionArea component="div" disableRipple>
						<CardImage
							image={`http://localhost:1337${restaurant.image[0].url}`}
						/>
						<CardContent>
							<Typography variant="h5" component="h2" gutterBottom>
								{restaurant.name}
							</Typography>
							<Typography>{restaurant.description}</Typography>
						</CardContent>
						<Link
							as={`/restaurants/${restaurant.slug}`}
							href={`/restaurants/[slug]`}
							passHref
						>
							<CardActionButton variant="contained" color="secondary">
								View
							</CardActionButton>
						</Link>
					</StyledActionArea>
				</Card>
			</Grid>
		));

	return <StyledGrid>{displayRestaurants}</StyledGrid>;
};

export default restaurants;

// ******************
// initial props
// ******************
export async function getStaticProps() {
	try {
		const response = await axios.get("http://localhost:1337/restaurants");
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

// ******************
// styles
// ******************

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 24rem);
	justify-content: center;
	grid-gap: 1rem;
`;
const StyledActionArea = styled(CardActionArea)`
	cursor: default;
`;
const CardImage = styled(CardMedia)`
	height: 15rem;
`;
