import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { GLOBALTYPES } from '../../redux/actions/globalTypes'

import Modal from './Modal';

const Status = ({ user }) => {
  const { auth } = useSelector(state => state);
  const dispatch = useDispatch();


  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (showModal) {
      dispatch({ type: GLOBALTYPES.MODAL, payload: true });
    } else {
      dispatch({ type: GLOBALTYPES.MODAL, payload: false });
    }
  }, [showModal, dispatch]);

  return (
    <>
      <div className="status my-3 d-flex">
        <button
          // onClick={() => dispatch({ type: GLOBALTYPES.STATUS, payload: true })}
          onClick={() => setShowModal(true)}
          className="btn-1 hover-in-shadow outer-shadow"
          style={{ marginLeft: "7px" }}
        >
          <span style={{ textShadow: "var(--outer-shadow)" }}>
            Post to group
          </span>

        </button>

      </div>
        {showModal && (
          <Modal
            user={user}
            setShowModal={setShowModal}
          />
        )}

    </>
  );
}

export default Status
