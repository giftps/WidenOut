/* eslint-disable import/no-dynamic-require */
import React from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFound from '../components/NotFound';

const generatePage = (pageName) => {
    // eslint-disable-next-line global-require
    const component = () => require(`../pages/${pageName}`).default;

    try {
        return React.createElement(component());
    } catch (err) {
        return <NotFound />;
    }
};

const PageRender = () => {
    const { page, id } = useParams();
    const { auth } = useSelector((state) => state);

    let pageName = '';
    if (auth.token) {
        if (id) {
            pageName = `${page}/[id]`;
        } else {
            pageName = `${page}`;
        }
    }

    return generatePage(pageName);
};

export default PageRender;
