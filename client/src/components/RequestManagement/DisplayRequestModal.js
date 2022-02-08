import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
// import styles from "./faultModel.module.css";
import Axios from "axios";
import {
  clientIdHandler,
  teamMemberIdHandler,
  teamHandler,
} from "../../utils/functions";

const DisplayRequestModal = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };
  return (
    <button className="button">
      <a href="#editModal" className="edit" data-toggle="modal">
        <i
          className="material-icons icon-blue "
          onClick={handleOpen}
          data-toggle="tooltip"
          title="Edit"
        >
          <strong style={{ fontFamily: "none" }}>Display </strong>
          {/* &#xE254; */}
          <span style={{ fontSize: "20px" }}>mode</span>
        </i>
      </a>
    </button>
  );
};

export default DisplayRequestModal;
