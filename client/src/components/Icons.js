/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/accessible-emoji */
import React, { useState, useRef, useEffect } from 'react';
import 'emoji-mart/css/emoji-mart.css';
import { Picker } from 'emoji-mart';
import { Menu, ButtonBase } from '@mui/material';

const ITEM_HEIGHT = 98;

const Icons = ({ setContent, content, theme }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    /**
     * anchorRef is used on different componets and specifying one type leads to other components throwing an error
     * */
    const anchorRef = useRef(null);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div
            className="nav-item dropdown"
            style={{
                opacity: '1',
                zIndex: '10',
                filter: theme ? 'invert(1)' : 'invert(0)'
            }}
        >
            <ButtonBase
                aria-controls={open ? 'long-menu' : undefined}
                aria-expanded={open ? 'true' : undefined}
                aria-haspopup="true"
                onClick={handleClick}
            >
                <span>🙂</span>
            </ButtonBase>
            {/* <span
                className="nav-link position-relative px-1"
                id="navbarDropdow"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                ref={anchorRef}
                aria-controls={open ? 'menu-list-grow' : undefined}
                aria-haspopup="true"
                onClick={handleToggle}
            >
            </span> */}
            <Menu
                id="long-menu"
                MenuListProps={{
                    'aria-labelledby': 'long-button'
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                PaperProps={{
                    style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                        width: '42ch'
                    }
                }}
            >
                <Picker
                    theme={theme ? 'dark' : 'light'}
                    showSkinTones="true"
                    showPreview="false"
                    onSelect={(emoji) => setContent(content + emoji.native)}
                    i18n={{
                        search: 'Search',
                        clear: 'Clear', // Accessible label on "clear" button
                        notfound: 'No Emoji Found',
                        skintext: 'Choose your default skin tone',
                        categories: {
                            search: 'Search Results',
                            recent: 'Frequently Used',
                            smileys: 'Smileys & Emotion',
                            people: 'People & Body',
                            nature: 'Animals & Nature',
                            foods: 'Food & Drink',
                            activity: 'Activity',
                            places: 'Travel & Places',
                            objects: 'Objects',
                            symbols: 'Symbols',
                            flags: 'Flags',
                            custom: 'Custom'
                        },
                        categorieslabel: 'Emoji categories', // Accessible title for the list of categories
                        skintones: {
                            1: 'Default Skin Tone',
                            2: 'Light Skin Tone',
                            3: 'Medium-Light Skin Tone',
                            4: 'Medium Skin Tone',
                            5: 'Medium-Dark Skin Tone',
                            6: 'Dark Skin Tone'
                        }
                    }}
                />
            </Menu>
        </div>
    );
};

export default Icons;
