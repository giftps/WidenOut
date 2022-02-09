import React from 'react'
import { useSelector } from "react-redux";

const LikeButton = ({ isLike, handleLike, handleUnLike }) => {
  const { theme } = useSelector(state => state);
  return (
    <div>
      {
        isLike
          ? <i className="material-icons text-danger" onClick={handleUnLike}
            style={{ filter: theme ? 'invert(1)' : 'invert(0)' }} >thumb_up</i>
          : <i className="material-icons" onClick={handleLike} >thumb_up</i>
      }
    </div>
  );
};

export default LikeButton
