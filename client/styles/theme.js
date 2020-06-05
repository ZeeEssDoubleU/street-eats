import { createMuiTheme } from "@material-ui/core";
import { blueGrey, deepOrange } from "@material-ui/core/colors";

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: blueGrey[900],
		},
		secondary: deepOrange,
	},
	drawer: {
		width: "24rem",
		zIndex: 10,
	},
	button: {
		disabled: {
			color: "rgba(0, 0, 0, 0.87)",
			backgroundColor: "none",
			borderColor: "rgba(0, 0, 0, 0.23)",
			borderRightColor: "transparent",
		},
	},
});
