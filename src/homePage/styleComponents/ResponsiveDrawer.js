import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { connect } from "react-redux";
import SearchSigns from "../../search/SearchSigns";
import HearingIcon from "@material-ui/icons/Hearing";
import HomeIcon from "@material-ui/icons/Home";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import FaceIcon from "@material-ui/icons/Face";
import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import VpnKeyOutlinedIcon from "@material-ui/icons/VpnKeyOutlined";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	
	// necessary for content to be below app bar
	toolbar: theme.mixins.toolbar,
	drawerPaper: {
		width: drawerWidth,
	},
}));

function ResponsiveDrawer(props) {

	const { window } = props;
	const classes = useStyles();
	const theme = useTheme();
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const { toggleUpload, toggleMS, toggleContact, logOut, username, logIn } = props;
	const loginLink = (props) => <Link to="/login" {...props} />;

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);

	};

	const drawer = (
		<div>
			<div className={classes.toolbar} />
			<Divider />
			<List>
				<ListItem
					onClick={handleDrawerToggle}
					button
					component={(props) => <Link to="/" {...props} />}
				>
					<ListItemIcon>
						<HomeIcon />
					</ListItemIcon>
					<ListItemText primary="Home" />
				</ListItem>
				<ListItem
					button
					onClick={(toggleUpload, handleDrawerToggle)}
					component={(props) => <Link to="/upload" {...props} />}
				>
					<ListItemIcon>
						<CloudUploadIcon />
					</ListItemIcon>
					<ListItemText primary="Upload" />
				</ListItem>

				{username ? (
					<ListItem
						onClick={handleDrawerToggle}
						button
						component={(props) => <Link to="/user-uploads" {...props} />}
					>
						<ListItemIcon>
							<FaceIcon />
						</ListItemIcon>
						<ListItemText primary="User Videos" />
					</ListItem>
				) : null}

				<ListItem button>
					<ListItemIcon>
						<HearingIcon />
					</ListItemIcon>
					<ListItemText primary="Mission Statement" />
				</ListItem>
				<ListItem button>
					<ListItemIcon>
						<AlternateEmailIcon />
					</ListItemIcon>
					<ListItemText primary="Contact Us" />
				</ListItem>

				<ListItem
					button
					onClick={username ? logOut : null}
					component={!username ? loginLink : ""}
				>
					<ListItemIcon>
						<VpnKeyOutlinedIcon />
					</ListItemIcon>
					<ListItemText primary={username ? "Log Out" : "Log In"} />
				</ListItem>
			</List>
			<Divider />
		</div>
	);

	const container =
		window !== undefined ? () => window().document.body : undefined;

	return (
		<div  className={classes.root}>
			<CssBaseline />
			<AppBar position="fixed" className={classes.appBar}>
				<Toolbar >
					<IconButton
						color="inherit"
						aria-label="open drawer"
						edge="start"
						onClick={handleDrawerToggle}
						className={classes.menuButton}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" noWrap>
						<SearchSigns />
					</Typography>
				</Toolbar>
			</AppBar>
			<nav className={classes.drawer} aria-label="nav folders">
				
					<Drawer
						container={container}
						variant="temporary"
						anchor={theme.direction === "rtl" ? "right" : "left"}
						open={mobileOpen}
						onClose={handleDrawerToggle}
						classes={{
							paper: classes.drawerPaper,
						}}
						ModalProps={{
							keepMounted: true, // Better open performance on mobile.
						}}
					>
						{drawer}
					</Drawer>
				
			</nav>
			<main className={classes.content}>
				<div className={classes.toolbar} />
			</main>
		</div>
	);
}

const mapStateToProps = (state) => {
	return {
		username: state.username,
	};
};

export default connect(mapStateToProps, null)(ResponsiveDrawer);
