import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import styled from "styled-components";
// import components
import {
	Card,
	CardHeader,
	CardContent,
	CardActions,
	Button,
	FormControl,
	FilledInput,
	InputLabel,
	InputAdornment,
	TextField,
	IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

// ******************
// component
// ******************
const signup = (props) => {
	const [formData, setFormData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		confirmPassword: "",
		showPassword: false,
	});

	const showPasswordIcon = (
		<InputAdornment position="end">
			<IconButton
				aria-label="toggle password visibility"
				edge="end"
				onClick={() =>
					setFormData({
						...formData,
						showPassword: !formData.showPassword,
					})
				}
			>
				{formData.showPassword ? <Visibility /> : <VisibilityOff />}
			</IconButton>
		</InputAdornment>
	);

	const handleChange = (target) => (event) => {
		const newData = {
			...formData,
			[target]: event.target.value,
		};
		setFormData(newData);
	};

	return (
		<StyledCard>
			<CardHeader title="Sign Up" />
			<CardContent>
				<Form noValidate autoComplete="off">
					<TextField
						label="First Name"
						variant="filled"
						fullWidth
						margin="normal"
						value={formData.firstName}
						onChange={handleChange("firstName")}
					/>
					<TextField
						label="Last Name"
						variant="filled"
						fullWidth
						margin="normal"
						value={formData.lastName}
						onChange={handleChange("lastName")}
					/>
					<TextField
						required
						label="Email"
						variant="filled"
						type="email"
						fullWidth
						margin="normal"
						value={formData.email}
						onChange={handleChange("email")}
					/>
					{/* custom password input */}
					<FormControl required fullWidth margin="normal" variant="filled">
						<InputLabel htmlFor="password">Password</InputLabel>
						<FilledInput
							id="conpassword"
							type={formData.showPassword ? "text" : "password"}
							endAdornment={showPasswordIcon}
							value={formData.password}
							onChange={handleChange("password")}
						/>
					</FormControl>
					{/* custom confirm password input */}
					<FormControl required fullWidth margin="normal" variant="filled">
						<InputLabel htmlFor="confirmPassword">
							Confirm Password
						</InputLabel>
						<FilledInput
							id="confirm-password"
							type={formData.showPassword ? "text" : "password"}
							endAdornment={showPasswordIcon}
							value={formData.confirmPassword}
							onChange={handleChange("confirmPassword")}
						/>
					</FormControl>
				</Form>
			</CardContent>
			<StyledCardActions>
				<Button variant="contained" color="primary">
					Register
				</Button>
				<Button variant="contained" color="secondary">
					Go Back
				</Button>
			</StyledCardActions>
		</StyledCard>
	);
};

export default signup;

// ******************
// styles
// ******************

const StyledCard = styled(Card)`
	margin: 1rem 0;
`;
const StyledCardActions = styled(CardActions)`
	padding: 1rem;
`;
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;
