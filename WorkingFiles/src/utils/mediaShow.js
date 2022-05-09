/* eslint-disable jsx-a11y/media-has-caption */
export const imageShow = (src, theme) => (
    <img src={src} className="img-thumbnail" alt="uploaded pics" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
);

export const videoShow = (src, theme) => (
    <video controls src={src} className="img-thumbnail" alt="uploaded pics" style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} />
);
