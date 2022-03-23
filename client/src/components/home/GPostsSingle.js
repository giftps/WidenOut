import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import UserPostCard from "../UserPostCard";
import LoadIcon from "../../images/loading.gif";
import LoadMoreBtn from "../LoadMoreBtn";
import { getDataAPI } from "../../utils/fetchData";
import { PROFILE_TYPES } from "../../redux/actions/profileAction";


const GPostsSingle = ({ auth, profile, dispatch, id }) => {
  const [posts, setPosts] = useState([]);
  const [result, setResult] = useState(9);
  const [page, setPage] = useState(0);
  const [load, setLoad] = useState(false);
  const [user, setUser] = useState(false);

  const { theme } = useSelector((state) => state);

  useEffect(() => {
    profile.posts.forEach((data) => {
      if (data._id === id) {
        setPosts(data.posts);
        setResult(data.result);
        setPage(data.page);
        setUser(data.user);
      }
    });
  }, [profile.posts, id]);

  const handleLoadMore = async () => {
    setLoad(true);
    const res = await getDataAPI(`user_posts/${id}?limit=${page * 9}`, auth.token);
    const newData = { ...res.data, page: page + 1, _id: id };
    dispatch({ type: PROFILE_TYPES.UPDATE_POST, payload: newData });
    setLoad(false);
  };
  // console.log(profile.users)
  return (
    <div className="posts">
      {posts && posts.map((post) => (
        // console.log(post)//<PostCard key={post._id} post={post} theme={theme} />
        <UserPostCard key={post._id} post={post} user={profile.users} theme={theme} />
      ))}

      {load && (
        <img src={LoadIcon} alt="Loading..." className="d-block mx-auto" />
      )}

      <LoadMoreBtn
        result={posts.result}
        page={posts.page}
        load={load}
        handleLoadMore={handleLoadMore}
      />
    </div>
  );
};

export default GPostsSingle;
