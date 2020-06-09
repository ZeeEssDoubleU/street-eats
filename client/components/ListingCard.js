import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";
// import components
import {
	Card,
	CardContent,
	CardMedia,
	CardActionArea,
	Typography,
} from "@material-ui/core";
import CardActionButton from "./CardActionButton";

export const ListingCard = (props) => {
	const button = (
		<CardActionButton
			variant="contained"
			color="secondary"
			onClick={props.buttonClick}
		>
			{props.buttonText}
		</CardActionButton>
	);

	const buttonType = props.hasLink ? (
		<Link as={props.as} href={props.href} passHref>
			{button}
		</Link>
	) : (
		<>{button}</>
	);

	return (
		<Card>
			<StyledActionArea disableRipple>
				<CardImage image={props.image} />
				<CardContent>
					<Typography variant="h5" component="h2" gutterBottom>
						{props.name}
					</Typography>
					<Typography>{props.description}</Typography>
				</CardContent>
				{buttonType}
			</StyledActionArea>
		</Card>
	);
};
ListingCard.propTypes = {};
export default ListingCard;

// ******************
// styles
// ******************

const StyledActionArea = styled(CardActionArea)`
	cursor: default;
`;
const CardImage = styled(CardMedia)`
	height: 15rem;
`;
