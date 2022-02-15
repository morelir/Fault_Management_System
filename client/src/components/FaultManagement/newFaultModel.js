import React, { useContext, useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import MessageModal from "../../shared/components/Modals/messageModal";
import styles from "./faultModel.module.css";
import styleBtn from "./newFaultModel.module.css";
import Axios from "axios";
import {
  clientIdHandler,
  teamMemberIdHandler,
  teamHandler,
  urgencyHandler,
} from "../../utils/functions";
const NewFaultModel = (props) => {
  const [fault, setFault] = useState({
    number: "",
    status: "New",
    urgencyLevel: "Normal",
    team: props.teams[1].name,
    description: "",
    teams: props.teams,
    formIsValid: false,
  });
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
  const [savingForm, setSavingForm] = useState(false);
  const [showCreatedMessage, setShowCreatedMessage] = useState(false);
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleCloseMessage = () => {
    setShowCreatedMessage(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const resetStates = () => {
    setFault((prevState) => {
      return {
        ...prevState,
        number: "",
        description: "",
        team: "",
        formIsValid: false,
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
    Axios.post(`faultManagement/NewFaultModel`, {
      status: "In treatment",
      clientID: parseInt(client.id),
      team: fault.team,
      teamMemberID: parseInt(teamMember.id),
      urgencyLevel: fault.urgencyLevel,
      description: fault.description,
    })
      .then((response) => {
        props.updateFaults(response.data.faults);
        handleClose();
        resetStates();
        setSavingForm(false);
        setFault((prevState) => {
          return {
            ...prevState,
            number: response.data.faultNumber,
          };
        });
        setShowCreatedMessage(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFault((prevState) => {
        return {
          ...prevState,
          formIsValid:
            fault.description.length > 0 &&
            client.idIsValid &&
            (teamMember.idIsValid || teamMember.id.length === 0),
        };
      });
    }, 250);

    return () => {
      console.log("Clean-Up Timeout");
      clearTimeout(identifier);
    };
  }, [fault.description, client.id, teamMember.id]);

  return (
    <>
      <a
        onClick={handleOpen}
        className={`btn  ${styleBtn.btn}`}
        data-toggle="modal"
        style={{ fontSize: "18px", borderRadius: "6px", fontWeight: "600" }}
      >
        <i style={{ marginTop: "4px" }} className="material-icons">
          &#xE147;
        </i>{" "}
        <span>New Fault</span>
      </a>

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
              <strong>New Fault</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitNewFault}>
          <Modal.Body className={styles["modal-body"]}>
            <Row>
              <Form.Group as={Col} className={styles["form-group-sub-title"]}>
                <Form.Label style={{ textDecoration: "underline" }}>
                  <h4>
                    <strong>Client details</strong>
                    {/*--------------Client Details----------------*/}
                  </h4>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>Client name</strong>
                </Form.Label>
                {client.idIsValid ? (
                  <Form.Control
                    type="text"
                    value={client.name + ", " + client.surname}
                    readOnly
                  />
                ) : (
                  <Form.Control value="" type="text" readOnly />
                )}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>Client ID</strong>
                </Form.Label>

                <Form.Control
                  type="text"
                  value={client.id}
                  onChange={(e) => {
                    clientIdHandler(e, setClient, props);
                  }}
                />
              </Form.Group>
            </Row>

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
                  value={fault.team}
                  onChange={(e) => {
                    teamHandler(e, setFault, setTeamMember);
                  }}
                  readOnly
                />
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>Team member name</strong>
                </Form.Label>
                {teamMember.idIsValid ? (
                  <Form.Control
                    type="text"
                    value={teamMember.name + ", " + teamMember.surname}
                    readOnly
                  />
                ) : (
                  <Form.Control value="" type="text" readOnly />
                )}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>Team member ID</strong>
                </Form.Label>
                {fault.team === "Customer service" ? (
                  <Form.Control
                    type="text"
                    value={teamMember.id}
                    onChange={(e) => {
                      teamMemberIdHandler(e, fault.team, setTeamMember, props);
                    }}
                  />
                ) : (
                  <Form.Control type="text" value={teamMember.id} readOnly />
                )}
              </Form.Group>
            </Row>

            <Row>
              <Form.Group as={Col} className={styles["form-group-sub-title"]}>
                <Form.Label
                  style={{ textDecoration: "underline", textAlign: "center" }}
                >
                  <h4>
                    <strong>Fault details</strong>
                    {/*--------------Fault Details----------------*/}
                  </h4>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
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
                    <option value={"Normal"}>Regular</option>
                    <option value={"High"}>High</option>
                  </>
                </Form.Control>
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>
                  <strong>Status</strong>
                </Form.Label>
                <Form.Control type="text" value={fault.status} readOnly />
              </Form.Group>
            </Row>

            <Form.Group size="lg" controlId="email" className={styles.textarea}>
              <Form.Label>
                <strong>Description </strong>
              </Form.Label>
              <br />
              <Form.Control 
                as="textarea"
                value={fault.description}
                onChange={(e) =>
                  setFault((prevState) => {
                    return { ...prevState, description: e.target.value };
                  })
                }
                style={{ width: "100%", height: "200px" }}
              />
              {/* <div className={styles.history}>asdasdasd</div> */}
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
              disabled={fault.savingForm}
            >
              Close
            </Button>
            {!savingForm ? (
              <Button
                variant="primary"
                type="submit"
                disabled={!fault.formIsValid}
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
        show={showCreatedMessage}
        handleClose={handleCloseMessage}
        header="Fault has created!"
      >
        <Form.Group>
          <Form.Label>
            <h4>
              <strong>Fault No. : </strong>
              {fault.number}
            </h4>
          </Form.Label>
        </Form.Group>
      </MessageModal>
    </>
  );
};

export default NewFaultModel;
