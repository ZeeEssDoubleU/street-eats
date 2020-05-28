import { createMuiTheme } from "@material-ui/core";
import { blueGrey, deepOrange, purple, pink } from "@material-ui/core/colors";

export const theme = createMuiTheme({
	palette: {
		primary: {
			main: blueGrey[900],
		},
		secondary: deepOrange,
	},
});
