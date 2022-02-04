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
    team: props.team,
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

  const submitNewRequest = (e) => {
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

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className={styles["modal"]}
      >
        {/* closeButton */}
        <Modal.Header className={styles["modal-header"]}>
          <Modal.Title>
            <h3>
              <strong>New Request</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitNewRequest}>
          <Modal.Body className={styles["modal-body"]}>
            <Row>
              <Form.Group as={Col} className={styles["form-group-sub-title"]}>
                <Form.Label
                  style={{ textDecoration: "underline", textAlign: "center" }}
                >
                  <h4>
                    <strong>Handler details</strong>
                    {/*--------------Handler Details----------------*/}
                  </h4>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>Team</strong>
                </Form.Label>
                <Form.Control
                  value={request.team}
                  //   onChange={(e) => {
                  //     teamHandler(e, setRequest, setTeamMember);
                  //   }}
                  readOnly
                />
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className={styles["form-group-sub-title"]}>
                <Form.Label
                  style={{ textDecoration: "underline", textAlign: "center" }}
                >
                  <h4>
                    <strong>Request details</strong>
                    {/*--------------Request Details----------------*/}
                  </h4>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              {/* <Form.Group as={Col}>
                <Form.Label>
                  <strong>Urgency level</strong>
                </Form.Label>
                <Form.Control
                  type="text"
                  value={fault.urgency}
                  as="select"
                  onChange={(e) => {
                    urgencyHandler(e, setFault);
                  }}
                >
                  <>
                    <option value={"Low"}>Low</option>
                    <option value={"Regular"}>Regular</option>
                    <option value={"High"}>Urgent</option>
                  </>
                </Form.Control>
              </Form.Group> */}
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>No.</strong>
                </Form.Label>
                <Form.Control type="text" value={request.number} readOnly />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>Status</strong>
                </Form.Label>
                <Form.Control type="text" value={request.status} readOnly />
              </Form.Group>
            </Row>

            <Form.Group size="lg" controlId="email">
              <Form.Label>
                <strong>Description </strong>
              </Form.Label>
              <br />
              <Form.Control
                as="textarea"
                value={request.description}
                onChange={(e) =>
                  setRequest((prevState) => {
                    return { ...prevState, description: e.target.value };
                  })
                }
                style={{ width: "100%", height: "200px" }}
              />
            </Form.Group>

            <br />
            {/* <Form.Control
                autoFocus
            /> */}
          </Modal.Body>

          <Modal.Footer>
            <Button
              variant="secondary"
              onClick={() => {
                handleClose();
                resetStates();
              }}
              disabled={request.savingForm}
            >
              Close
            </Button>
            {!savingForm ? (
              <Button
                variant="primary"
                type="submit"
                disabled={!request.formIsValid}
              >
                Save
              </Button>
            ) : (
              <Button variant="primary" disabled>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                />
                <span> Saving...</span>
              </Button>
            )}
          </Modal.Footer>
        </Form>
      </Modal>

      <MessageModal
        show={request.showCreatedMessage}
        header="Request has created!"
      >
        <Form.Group>
          <Form.Label>
            <h4>
              <strong>Request No. : </strong>
              {request.number}
            </h4>
          </Form.Label>
        </Form.Group>
      </MessageModal>
    </>
  );
};

export default NewRequestModal;
