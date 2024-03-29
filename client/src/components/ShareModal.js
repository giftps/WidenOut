/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import {
    EmailShareButton,
    EmailIcon,
    FacebookShareButton,
    FacebookIcon,
    LinkedinShareButton,
    LineIcon,
    PinterestShareButton,
    PinterestIcon,
    RedditShareButton,
    RedditIcon,
    TelegramShareButton,
    TelegramIcon,
    TwitterShareButton,
    TwitterIcon,
    WhatsappShareButton,
    WhatsappIcon
} from 'react-share';

const ShareModal = ({ url, theme, setIsShare }) => (
    <div className="share_modal">
        <div className="share_modal-container">
            <div className="share_modal-header">
                <span>Share to...</span>
                <span onClick={() => setIsShare(false)}>&times;</span>
            </div>
            <div className=" share_modal-body" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}>
                <FacebookShareButton url={url}>
                    <FacebookIcon round size={32} />
                </FacebookShareButton>

                <TwitterShareButton url={url}>
                    <TwitterIcon round size={32} />
                </TwitterShareButton>

                <EmailShareButton url={url}>
                    <EmailIcon round size={32} />
                </EmailShareButton>

                <TelegramShareButton url={url}>
                    <TelegramIcon round size={32} />
                </TelegramShareButton>

                <WhatsappShareButton url={url}>
                    <WhatsappIcon round size={32} />
                </WhatsappShareButton>

                <PinterestShareButton url={url}>
                    <PinterestIcon round size={32} />
                </PinterestShareButton>

                <RedditShareButton url={url}>
                    <RedditIcon round size={32} />
                </RedditShareButton>

                <LinkedinShareButton url={url}>
                    <LineIcon round size={32} />
                </LinkedinShareButton>
            </div>
        </div>
    </div>
);

export default ShareModal;
