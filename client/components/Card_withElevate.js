import React, { useState, useRef } from "react";
import styled from "styled-components";
// import components
import { Card } from "@material-ui/core";

const Card_withElevate = (props) => {
	const [raised, setRaised] = useState(false);
	const focusRef = useRef(false);

	return (
		<Card
			raised={raised}
			onMouseEnter={() => setRaised(true)}
			onMouseLeave={() =>
				setRaised(focusRef.current === true ? raised : false)
			}
			onFocus={() => {
				focusRef.current = true;
				setRaised(true);
			}}
			onBlur={() => {
				focusRef.current = false;
				setRaised(false);
			}}
		>
			{props.children}
		</Card>
	);
};
export default Card_withElevate;

// ******************
// styles
// ******************

import { StyledCard } from "../styles/elements";
