import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
// import components
import { Button } from "@material-ui/core";

// ******************
// component
// ******************

// forwardRef used to forward link components down to button hwen necessary
const CardActionButton = forwardRef((props, ref) => {
	return (
		<Thing {...props} ref={ref} size="large">
			{props.children}
		</Thing>
	);
});

CardActionButton.propTypes = {};
export default CardActionButton;

// ******************
// styles
// ******************

const Thing = styled(Button)`
	margin: 1rem;
	width: ${(props) => (props.fullWidth ? "calc(100% - (2 * 1rem))" : null)};
`;
