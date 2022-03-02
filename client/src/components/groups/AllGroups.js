import React from 'react'
import { getAllGroups } from '../../redux/actions/groupAction'
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import LoadIcon from '../../images/loading.gif'



const AllGroups = () => {
    const { auth, groups } = useSelector(state => state)
    const dispatch = useDispatch()

    return (
        <div class="all_groups">

            {console.log(groups.groups)}

            {
                groups.loading
                    ? <img src={LoadIcon} alt="loading" className="d-block mx-auto my-4" />
                    : <div className="suggestions">
                        {
                            groups.groups.map(group => (
                                <Link
                                    to={`/group/${group._id}`}
                                    // onClick={handleCloseAll}
                                    style={{ textDecoration: "none" }}
                                >
                                    <div className="single_group">
                                        <img src="https://bootdey.com/img/Content/avatar/avatar2.png" className="single-story-bg" />
                                        <div className="story-author">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar2.png" alt="logo" />
                                            <p>{group.name}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        }

                    </div>
            }


        </div>
    )
}

export default AllGroups