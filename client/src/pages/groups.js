/* eslint-disable no-nested-ternary */
/* eslint-disable consistent-return */
import React, { useEffect } from 'react';

import AllGroups from '../components/groups/AllGroups';
import GPosts from '../components/home/GPosts';
import RightSideBarGroup from '../components/home/RightSideBarGroup';

import { useSelector } from 'react-redux';
import LoadIcon from '../images/loading.gif';

let scroll = 0;

const Home = () => {
    const { ghomePosts } = useSelector((state) => state);

    window.addEventListener('scroll', () => {
        if (window.location.pathname === '/') {
            scroll = window.pageYOffset;
            return scroll;
        }
    });

    useEffect(() => {
        setTimeout(() => {
            window.scrollTo({ top: scroll, behavior: 'smooth' });
        }, 100);
    }, []);

    return (
        <div className="container home row mx-0 my-8">
            <div className="col-md-2" />
            <div className="col-md-6">
                <h3>Discover Cool Groups To Join</h3>
                <AllGroups />

                {/* {console.log(ghomePosts)} */}

                {ghomePosts.loading ? (
                    <img src={LoadIcon} alt="loading" className="d-block mx-auto" />
                ) : ghomePosts.result === 0 && ghomePosts.posts.length === 0 ? (
                    <h5 className="text-center container my-4">
                        {/* There&apos;s no activity from your groups. Find some cool groups to join and the activity will show here */}
                    </h5>
                ) : (
                    // <GPosts />
                    console.log(ghomePosts)
                )}
            </div>
        </div>
    );
};

export default Home;
