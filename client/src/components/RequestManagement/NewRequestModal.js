import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import MessageModal from "../../shared/components/UIElements/messageModal";
import styles from "./RequestModal.module.css";
import styleBtn from "./NewRequestModal.module.css";
import Axios from "axios";
import {
  clientIdHandler,
  teamMemberIdHandler,
  teamHandler,
  urgencyHandler,
} from "../../utils/functions";

const NewRequestModal = (props) => {
  const [request, setRequest] = useState({
    number: props.number,
    status: "In treatment",
    equipment_SerialNumbers: {},
    formIsValid: false,
    showCreatedMessage: false,
  });

  const [savingForm, setSavingForm] = useState(false);

  const [client, setClient] = useState({
    id: "",
    name: "",
    surname: "",
    idIsValid: false,
  });

  const [teamMember, setTeamMember] = useState({
    id: "",
    name: "",
    surname: "",
    idIsValid: false,
  });

  const [showCreatedMessage, setShowCreatedMessage] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const resetStates = () => {
    setRequest((prevState) => {
      return {
        ...prevState,
        number: props.number,
        status: "In treatment",
        equipment_SerialNumbers: {},
        formIsValid: false,
        showCreatedMessage: false,
      };
    });
    setClient((prevState) => {
      return {
        ...prevState,
        id: "",
        name: "",
        surname: "",
        idIsValid: false,
      };
    });
    setTeamMember((prevState) => {
      return {
        ...prevState,
        id: "",
        name: "",
        surname: "",
        idIsValid: false,
      };
    });
  };

  const submitNewFault = (e) => {
    e.preventDefault();
    setSavingForm(true);
    Axios.post(`requestManagement/NewRequest`, {
      number: request.number,
      status: request.status,
      clientID: parseInt(client.id),
      team: request.team,
      teamMemberID: parseInt(teamMember.id),
      equipment_SerialNumbers: request.equipment_SerialNumbers,
    })
      .then((response) => {
        handleClose();
        resetStates();
        setSavingForm(false);

        // setShowCreatedMessage(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <button className="button">
        <a href="#requestModal" className="request" data-toggle="modal">
          <i
            className="material-icons icon-blue "
            onClick={handleOpen}
            data-toggle="tooltip"
            title="Request"
          >
            <strong style={{ fontFamily: "none" }}>Request </strong>
            {/* &#xE254; */}
            <span style={{ fontSize: "21px" }}>note_add</span>
          </i>
        </a>
      </button>
    </>
  );
};

export default NewRequestModal;
