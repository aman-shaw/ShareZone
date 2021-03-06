import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ViewComfyRoundedIcon from '@material-ui/icons/ViewComfyRounded';
import { makeStyles, useTheme } from '@material-ui/core/styles';
// import InsertNew from './InsertNew';
import { connect } from 'react-redux';
import ReduxBookList from './ReduxBookList';
import ViewAllBooks from './ViewAllBooks';
import AllBooks from './AllBooks';

import { BrowserRouter as Router, Route, Switch, Link, Redirect, useLocation, useHistory, useRouteMatch } from 'react-router-dom'
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        [theme.breakpoints.up('sm')]: {
            // width: `calc(100% - ${drawerWidth}px)`,
            marginLeft: drawerWidth,
        },
        backgroundColor: '#ffab00',
        position: 'absolute',
        top: '70px'
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up()]: {
            display: 'none',
        },
    },
    // necessary for content to be below app bar
    toolbar: theme.mixins.toolbar,
    drawerPaper: {
        width: drawerWidth,
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
    },
    navbar: {
        position: 'absolute'
    }
}));

const LibraryMain = (props) => {
    // console.log(props.auth._id)
    const { window } = props;
    const classes = useStyles();
    const theme = useTheme();
    const [mobileOpen, setMobileOpen] = React.useState(false);
    //const [url, setUrl] = React.useState('/LibraryMain');
    const history = useHistory();
    const location = useLocation();
    const { path, url } = useRouteMatch();
    const handleDrawerToggle = (link) => {
        // setUrl(url);
        // history.push('/LibraryMain');
        // if (link == 'LibraryMain/insert') {
        //     history.push('LibraryMain/insert');
        //     setUrl('LibraryMain/insert');
        // }
        // else if (link == 'LibraryMain/view') {
        //     history.push('LibraryMain/view');
        //     setUrl('LibraryMain/view');
        // }
        // else {
        //     history.push(url);
        // }
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        {
            key: 1,
            item: 'My Library',
            icon: <ViewComfyRoundedIcon />,
            //link: `LibraryMain/view`
            link: `view`
        },
        {
            key: 2,
            item: 'Insert New',
            icon: <AddCircleOutlineIcon />,
            //link: `LibraryMain/insert`
            link: `insert`
        },
        {
            key: 3,
            item: 'All ',
            icon: <AddCircleOutlineIcon />,
            //link: `LibraryMain/insert`
            link: `all`
        }
    ]

    const drawer = (
        <div>
            <div className={classes.toolbar} />
            <Divider />
            <List>
                {menuItems.map(({ key, item, icon, link }) => (
                    <ListItem
                        button
                        key={key}
                        component={Link}
                        to={`${url}/${link}`}
                        onClick={() => { handleDrawerToggle(link) }}
                    >
                        <ListItemIcon >{icon}</ListItemIcon>
                        <ListItemText primary={item} />
                    </ListItem>
                ))}
            </List>
            <Divider />
        </div>
    );

    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Router>
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
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
                            LIBRARY SECTION
                        </Typography>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer} aria-label="mailbox folders">
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            ModalProps={{
                                keepMounted: true
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        {/* <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            {drawer}
                        </Drawer> */}
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    {/* {url == 'LibraryMain/insert' ? <InsertNew /> : null}
                    {url == 'LibraryMain/view' ? <ViewAllBooks /> : null} */}
                    <Redirect from={`${path}`} to={`${path}/insert`} />
                    <Switch>
                        <Route path={`${path}/insert`}>
                            {/* <InsertNew /> */}
                            <ReduxBookList />
                        </Route>
                        <Route path={`${path}/view`}>
                            <ViewAllBooks />
                        </Route>
                        <Route path={`${path}/all`}>
                            <AllBooks />
                        </Route>
                    </Switch>
                </main>
            </div>
        </Router>
    );
}

const mapStateToProps = (state) => {
    return {
        auth: state.auth
    }
}

export default connect(mapStateToProps)(LibraryMain);

