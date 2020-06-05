import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import Router from "next/router";
import styled from "styled-components";
// import components
import {
	Container,
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
// import store / utils
import { saveCredsToCookies } from "../store/actions/auth";
import useStore from "../store/useStore";

// ******************
// component
// ******************
const signup = (props) => {
	const { state, dispatch } = useStore();
	const [formData, setFormData] = useState({
		first_name: "",
		last_name: "",
		username: "",
		email: "",
		password: "",
		password_confirm: "",
		password_show: false,
	});

	const handleChange = (target) => (event) => {
		const newData = {
			...formData,
			[target]: event.target.value,
		};
		setFormData(newData);
	};

	const onSubmit = async (event) => {
		event.preventDefault();
		try {
			const response = await axios.post(
				"http://localhost:1337/auth/local/register",
				formData,
			);
			console.log("response_signup", response.data);

			saveCredsToCookies(response.data, state, dispatch);
			// sendEmailValidation();
		} catch (error) {
			console.error(error.response);
		}
	};

	const showPasswordIcon = (
		<InputAdornment position="end">
			<IconButton
				aria-label="toggle password visibility"
				edge="end"
				onClick={() =>
					setFormData({
						...formData,
						password_show: !formData.password_show,
					})
				}
			>
				{formData.password_show ? <Visibility /> : <VisibilityOff />}
			</IconButton>
		</InputAdornment>
	);

	return (
		<Container maxWidth="sm">
			<StyledCard>
				<CardHeader title="Sign Up" />
				<CardContent>
					<Form
						noValidate
						autoComplete="off"
						id="form-signup"
						onSubmit={onSubmit}
					>
						<TextField
							label="First Name"
							variant="filled"
							fullWidth
							margin="normal"
							value={formData.first_name}
							onChange={handleChange("first_name")}
						/>
						<TextField
							label="Last Name"
							variant="filled"
							fullWidth
							margin="normal"
							value={formData.last_name}
							onChange={handleChange("last_name")}
						/>
						<TextField
							required
							label="Username"
							variant="filled"
							fullWidth
							margin="normal"
							value={formData.username}
							onChange={handleChange("username")}
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
						<FormControl
							required
							fullWidth
							margin="normal"
							variant="filled"
						>
							<InputLabel htmlFor="password">Password</InputLabel>
							<FilledInput
								id="conpassword"
								type={formData.password_show ? "text" : "password"}
								endAdornment={showPasswordIcon}
								value={formData.password}
								onChange={handleChange("password")}
							/>
						</FormControl>
						{/* custom confirm password input */}
						{/* // TODO: set up validation for confirm password */}
						<FormControl
							required
							fullWidth
							margin="normal"
							variant="filled"
						>
							<InputLabel htmlFor="password_confirm">
								Confirm Password
							</InputLabel>
							<FilledInput
								id="confirm-password"
								type={formData.password_show ? "text" : "password"}
								endAdornment={showPasswordIcon}
								value={formData.password_confirm}
								onChange={handleChange("password_confirm")}
							/>
						</FormControl>
					</Form>
				</CardContent>
				<StyledCardActions>
					<Button
						variant="contained"
						color="primary"
						size="large"
						form="form-signup"
						type="submit"
					>
						Register
					</Button>
					<Button color="primary" onClick={() => Router.back()}>
						Go Back
					</Button>
				</StyledCardActions>
			</StyledCard>
		</Container>
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
