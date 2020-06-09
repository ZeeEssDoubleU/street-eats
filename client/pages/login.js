import React, { useState } from "react";
import Link from "next/link";
import styled from "styled-components";
import Cookies from "js-cookie";
// import components
import {
	Container,
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
import Card_withElevate from "../components/Card_withElevate";
// import store / utils
import { saveCredsToCookies, getUser_current } from "../store/actions/auth";
import useStore from "../store/useStore";
import { loginUser } from "../store/actions/auth";

// ******************
// component
// ******************
const login = (props) => {
	const { state, dispatch } = useStore();
	const [formData, setFormData] = useState({
		identifier: "",
		password: "",
		password_show: false,
	});

	const handleChange = (target) => (event) => {
		const newData = {
			...formData,
			[target]: event.target.value,
		};
		setFormData(newData);
	};

	const onSubmit = (event) => {
		event.preventDefault();
		loginUser(formData, state, dispatch);
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
			<Card_withElevate>
				<CardHeader title="Login" />
				<CardContent>
					<Form autoComplete="off" id="form-login" onSubmit={onSubmit}>
						<TextField
							required
							label="Email"
							variant="filled"
							type="email"
							fullWidth
							margin="normal"
							value={formData.identifier}
							onChange={handleChange("identifier")}
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
					</Form>
				</CardContent>
				<StyledCardActions>
					<Button
						variant="contained"
						color="primary"
						size="large"
						form="form-login"
						type="submit"
					>
						Login
					</Button>
					<Link href="/signup" passHref>
						<Button color="primary">Sign Up</Button>
					</Link>
					{/* // TODO: remove when ready */}
					<Button
						onClick={() => {
							console.log("cookies_test:", Cookies.get());
						}}
					>
						Test
					</Button>
				</StyledCardActions>
			</Card_withElevate>
		</Container>
	);
};

export default login;

// ******************
// styles
// ******************

const StyledCardActions = styled(CardActions)`
	padding: 1rem;
`;
const Form = styled.form`
	display: flex;
	flex-wrap: wrap;
`;
