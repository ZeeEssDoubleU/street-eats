import styled from "styled-components";
// import components
import { Container } from "@material-ui/core";

export const Main = styled(Container)`
	padding: calc(4rem + 1rem) 1rem;
`;
export const StyledGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, 24rem);
	justify-content: center;
	grid-gap: 1rem;
`;
