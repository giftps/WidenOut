import React from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Divider from '@mui/material/Divider';

import Menu from './Menu';
import Search from './Search';
import Logo from '../Logo';

import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../../redux/actions/postAction';
import { getSuggestions } from '../../redux/actions/suggestionsAction';

import { getAllGroups } from '../../redux/actions/groupAction';
import { getgPosts } from '../../redux/actions/groupPostAction';

const Header = () => {
    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();

    const handleRefreshHome = () => {
        window.scrollTo({ top: 0 });
        dispatch(getPosts(auth.token));
        dispatch(getSuggestions(auth.token));
        dispatch(getAllGroups(auth.token));
        dispatch(getgPosts(auth.token));
    };

    return (
        <AppBar color="primary" position="static" elevation={0} className="bg-light header flex">
            <div className="main-tool">
                <div className="flex flex-1 logo">
                    <Logo width={32} />
                    <Search />
                </div>

                <div className="flex flex-1 logo">
                    <Divider light={false} sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                    <Menu />
                </div>
            </div>

            {/* <Hidden mdDown>
                    <NavbarFoldedToggleButton className="w-40 h-40 p-0"/>
                </Hidden>

                <Hidden lgUp>
                    <NavbarMobileToggleButton className="w-40 h-40 p-0">
                        <Icon>arrow_back</Icon>
                    </NavbarMobileToggleButton>
                </Hidden> */}
        </AppBar>
    );
    // return (
    //   <div className="header bg-light">
    //     <nav className="navbar navbar-expand-lg navbar-light bg-light justify-content-between">
    //       <div className="container-fluid">
    //         <Link to="/" className="logo" onClick={handleRefreshHome}>
    //           <h1 className="navbar-brand text-uppercase_ p-0 m-0">WidenOut</h1>
    //         </Link>

    //         <Search />

    //         <Menu />

    //       </div>
    //     </nav>
    //   </div>
    // );
};

export default Header;
