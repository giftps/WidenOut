import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getDataAPI } from '../../utils/fetchData';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
// import { Link } from "react-router-dom";
import UserCard from '../UserCard';
import LoadIcon from '../../images/loading.gif';

import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';

const Search = () => {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState([]);

    const { auth } = useSelector((state) => state);
    const dispatch = useDispatch();
    const [load, setLoad] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();

        if (!search) return;

        try {
            setLoad(true);
            const res = await getDataAPI(`search?username=${search}`, auth.token);
            setUsers(res.data.users);
            setLoad(false);
        } catch (err) {
            dispatch({
                type: GLOBALTYPES.ALERT,
                payload: { error: err.response.data.msg }
            });
        }
    };

    const handleClose = () => {
        setSearch('');
        setUsers([]);
    };

    return (
        <Paper
            component="form"
            sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                width: 400,
                backgroundColor: '#E5E5E5',
                borderRadius: 40
            }}
            elevation={0}
        >
            <InputBase sx={{ ml: 1, flex: 1 }} placeholder="Search..." inputProps={{ 'aria-label': 'search...' }} />
            <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
        // <form className="search_form" onSubmit={handleSearch}>
        //   <input
        //     type="text"
        //     title="Enter to Search"
        //     name="search"
        //     value={search}
        //     id="search"
        //     onChange={(e) =>
        //       setSearch(e.target.value.toLowerCase().replace(/ /g, " "))
        //     }
        //   />
        //   <div className="search_icon" style={{ opacity: search ? 0 : 0.3 }}>
        //     <span className="material-icons">search</span>
        //     <span>Enter to Search</span>
        //   </div>

        //   <div
        //     onClick={handleClose}
        //     className="close_search"
        //     style={{ opacity: users.length === 0 ? 0 : 1 }}
        //   >
        //     &times;
        //   </div>

        //   <button type="submit" style={{ display: "none" }}>
        //     Search
        //   </button>

        //   {load && <img className="loading" src={LoadIcon} alt="Loading" />}

        //   <div className="users">
        //     {search &&
        //       users.map((user) => (
        //         <UserCard
        //           key={user._id}
        //           user={user}
        //           border="border"
        //           handleClose={handleClose}
        //         />
        //       ))}
        //   </div>
        // </form>
    );
};

export default Search;
