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
	CardActions,
	Button,
	Typography,
} from "@material-ui/core";

const RestaurantList = (props) => {
	const [restaurants, setRestaurants] = useState();

	const getRestaurants = async () => {
		try {
			const response = await axios({
				method: "get",
				url: "/restaurants",
				baseURL: "http://localhost:1337",
			});
			console.log("response", response);

			setRestaurants(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		getRestaurants();
	}, []);

	const displayRestaurants =
		restaurants &&
		restaurants.map((restaurant) => (
			<Grid item key={restaurant.id}>
				<Card>
					<CardActionArea>
						<CardImage
							image={`http://localhost:1337${restaurant.image[0].url}`}
						/>
						<CardContent>
							<Typography variant="h5" component="h2" gutterBottom>
								{restaurant.name}
							</Typography>
							<Typography>{restaurant.description}</Typography>
						</CardContent>
					</CardActionArea>
					<StyledCardActions>
						<Link href={`/restaurants/${restaurant.slug}`} passHref>
							<Button variant="contained" color="secondary">
								View
							</Button>
						</Link>
					</StyledCardActions>
				</Card>
			</Grid>
		));

	return <StyledGrid>{displayRestaurants}</StyledGrid>;
};

export default RestaurantList;

const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, 24rem);
	justify-content: center;
	grid-gap: 1rem;
	margin: 1rem 0;
`;

const CardImage = styled(CardMedia)`
	height: 15rem;
`;

const StyledCardActions = styled(CardActions)`
	padding: 1rem;
`;
