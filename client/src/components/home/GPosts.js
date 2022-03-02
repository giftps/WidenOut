import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import PostCard from "../PostCard";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { POST_G_TYPES } from "../../redux/actions/groupPostAction";

const GPostCtrl = () => {
  const { ghomePosts, auth, theme } = useSelector((state) => state);
  const dispatch =  useDispatch();

  const [load, setLoad] = useState(false);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`g_posts?limit=${ghomePosts.page * 9}`, auth.token);
    dispatch({ type: POST_G_TYPES.GET_G_POSTS, payload: {...res.data, page: ghomePosts.page + 1 } });
    setLoad(false);
  };
  return (
    <div className="posts">
      {ghomePosts.posts.map((post) => (
        <PostCard key={post._id} post={post} theme={theme} />
      ))}

      {load && (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
      )}

      <LoadMoreBtn
        result={ghomePosts.result}
        page={ghomePosts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default GPostCtrl;
