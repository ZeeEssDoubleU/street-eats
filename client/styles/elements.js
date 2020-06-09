import styled from "styled-components";
// import components
import { Container, Card, CardActionArea } from "@material-ui/core";

export const Main = styled(Container)`
	margin: 4rem 0;
	padding: 1rem;
`;
export const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(
		auto-fit,
		${(props) => props.theme.card.width}
	);
	justify-content: center;
	grid-gap: 1rem;
`;
export const StyledActionArea = styled(CardActionArea)`
	cursor: default;
`;
export const StyledCard = styled(Card)`
	margin: 1rem 0;
`;
