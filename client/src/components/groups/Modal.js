/* eslint-disable no-nested-ternary */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-return-assign */
/* eslint-disable no-underscore-dangle */
import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../../redux/actions/globalTypes';
import { createPost, updatePost } from '../../redux/actions/postAction';
import Icons from '../Icons';
import { imageShow, videoShow } from '../../utils/mediaShow';

const StatusModal = ({ user }) => {
    const { auth, theme, status, socket } = useSelector((state) => state);
    const dispatch = useDispatch();

    const [content, setContent] = useState('');
    const [group, setGroup] = useState(user._id);
    const [images, setImages] = useState([]);
    const [stream, setStream] = useState(false);
    const videoRef = useRef();
    const refCanvas = useRef();
    const [tracks, setTracks] = useState('');

    const handleChangeImages = (e) => {
        const files = [...e.target.files];
        let err = '';
        const newImages = [];

        files.forEach((file) => {
            if (!file) {
                return (err = 'File does not exist.');
            }
            if (file.size > 1024 * 1024 * 5) {
                return (err = 'Image size must be less than 5 mb.');
            }
            return newImages.push(file);
        });
        if (err) {
            dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
        }
        setImages([...images, ...newImages]);
    };

    const deleteImages = (index) => {
        const newArr = [...images];
        newArr.splice(index, 1);
        setImages(newArr);
    };

    const handleStream = () => {
        setStream(true);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((mediaStream) => {
                    videoRef.current.srcObject = mediaStream;
                    videoRef.current.play();
                    const track = mediaStream.getTracks();
                    setTracks(track[0]);
                })
                .catch((err) => console.log(err));
        }
    };

    const handleCapture = () => {
        const width = videoRef.current.clientWidth;
        const height = videoRef.current.clientHeight;

        refCanvas.current.setAttribute('width', width);
        refCanvas.current.setAttribute('height', height);

        const ctx = refCanvas.current.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0, width, height);

        const URL = refCanvas.current.toDataURL();
        setImages([...images, { camera: URL }]);
    };

    const handleStopStream = () => {
        tracks.stop();
        setStream(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // const group = user._id
        console.log(group);

        if (status.onEdit) {
            dispatch(updatePost({ content, group, images, auth, status }));
        } else {
            dispatch(createPost({ content, group, images, auth, socket }));
        }

        setContent('');
        setGroup(user._id);
        setImages([]);
        if (tracks) {
            tracks.stop();
        }
        dispatch({
            type: GLOBALTYPES.STATUS,
            payload: false
        });
    };

    useEffect(() => {
        if (status.onEdit) {
            setContent(status.content);
            setGroup(status.group);
            setImages(status.images);
        }
    }, [status]);

    return (
        <div className="status_modal">
            <form onSubmit={handleSubmit}>
                <div className="status_header">
                    <h5 className="m-0">Create Post</h5>
                    <span onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: false })}>&times;</span>
                </div>
                <div className="status_body">
                    <textarea
                        onChange={(e) => setContent(e.target.value)}
                        value={content}
                        name="content"
                        placeholder={`Post to ${user.fullname}`}
                        style={{
                            filter: theme ? 'invert(1)' : 'invert(0)',
                            color: theme ? 'white' : '#111',
                            background: theme ? 'rgb(0,0,0,0.3)' : ''
                        }}
                    />
                    <input
                        onChange={(e) => setGroup(`${user._id}`)}
                        value={user._id}
                        hidden="hidden"
                        name="group"
                        placeholder={`Post to ${user._id}`}
                    />

                    <div className="d-flex">
                        <div className="flex-fill" />
                        <Icons setContent={setContent} content={content} theme={theme} />
                    </div>

                    <div className="show_images">
                        {images.map((img, index) => (
                            <div key={index} className="file_img">
                                {img.camera ? (
                                    imageShow(img.camera, theme)
                                ) : img.url ? (
                                    <>{img.url.match(/video/i) ? videoShow(img.url) : imageShow(img.url)}</>
                                ) : (
                                    <>
                                        {img.type.match(/video/i)
                                            ? videoShow(URL.createObjectURL(img, theme))
                                            : imageShow(URL.createObjectURL(img, theme))}
                                    </>
                                )}
                                <span onClick={() => deleteImages(index)}>&times;</span>
                            </div>
                        ))}
                    </div>

                    {stream && (
                        <div className="stream position-relative">
                            <video
                                width="100%"
                                height="100%"
                                ref={videoRef}
                                style={{ filter: theme ? 'invert(1)' : 'invert(0)' }}
                                autoPlay
                                muted
                            />

                            <span onClick={handleStopStream}>&times;</span>
                            <canvas style={{ display: 'none' }} ref={refCanvas} />
                        </div>
                    )}

                    <div className="input_images">
                        {stream ? (
                            <i className="fas fa-camera" onClick={handleCapture} />
                        ) : (
                            <>
                                <i className="fas fa-camera" onClick={handleStream} />
                                <div className="file_upload">
                                    <i className="fas fa-image" />
                                    <input
                                        onChange={handleChangeImages}
                                        type="file"
                                        name="file"
                                        id="file"
                                        multiple
                                        accept="image/*,video/*"
                                    />
                                </div>
                            </>
                        )}
                    </div>
                </div>
                <div className="status_footer">
                    <button type="submit" className="btn btn-primary w-100">
                        Post
                    </button>
                </div>
            </form>
        </div>
    );
};

export default StatusModal;
