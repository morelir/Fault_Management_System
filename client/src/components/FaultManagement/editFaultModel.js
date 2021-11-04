import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Spinner from "react-bootstrap/Spinner";
import styles from "./faultModel.module.css";
import Axios from "axios";
import {
  clientIdHandler,
  teamMemberIdHandler,
  teamHandler,
} from "../../utils/functions";

const EditFaultModel = (props) => {
  const [fault, setFault] = useState({
    number: props.fault.number,
    status: props.fault.status,
    team: props.fault.team,
    description: props.fault.description,
    teams: [],
    formIsValid: true,
  });
  const [savingForm, setSavingForm] = useState(false);

  const [client, setClient] = useState({
    id: props.fault.clientID,
    name: props.fault.clientName,
    surname: props.fault.clientSurname,
    idIsValid: true,
  });

  const [teamMember, setTeamMember] = useState({
    id: props.fault.teamMemberID,
    name: props.fault.teamMemberName,
    surname: props.fault.teamMemberSurname,
    idIsValid: props.fault.teamMemberID === null ? false : true,
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const resetStates = () => {
    setFault((prevState) => {
      return {
        ...prevState,
        number: props.fault.number,
        description: props.fault.description,
        team: props.fault.team,
        formIsValid: true,
      };
    });
    setClient((prevState) => {
      return {
        id: props.fault.clientID,
        name: props.fault.clientName,
        surname: props.fault.clientSurname,
        idIsValid: true,
      };
    });
    setTeamMember((prevState) => {
      return {
        id: props.fault.teamMemberID,
        name: props.fault.teamMemberName,
        surname: props.fault.teamMemberSurname,
        idIsValid: props.fault.teamMemberID === null ? false : true,
      };
    });
   
  };

  const submitSaveFault = (e) => {
    e.preventDefault();
    setSavingForm(true);
    Axios.post(`faultManagement/EditFaultModel`, {
      _id: props.fault._id,
      number: parseInt(fault.number),
      status: fault.status,
      clientID: parseInt(client.id),
      team: fault.team,
      description: fault.description,
    })
      .then((response) => {
        props.updateFaults(response.data);
        handleClose();
        resetStates();
        setSavingForm(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // order teams that team handler first in the array
  const orderTeamsByTeamHandler = () => {
    let temp;
    let orderTeams = props.teams.filter((team) => {
      if (team.name === fault.team) {
        temp = team;
      }
      return team.name !== fault.team;
    });
    orderTeams.unshift(temp);
    setFault((prevState) => {
      return {
        ...prevState,
        teams: orderTeams,
      };
    });
  };

  useEffect(() => {
    orderTeamsByTeamHandler();
    // console.log(fault.teams)
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFault((prevState) => {
        return {
          ...prevState,
          formIsValid:
            fault.description.length > 0 &&
            client.idIsValid &&
            (teamMember.idIsValid ||
              teamMember.id === null ||
              teamMember.id.length === 0),
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
      <a href="#editModal" className="edit" data-toggle="modal">
        <i
          className="material-icons"
          onClick={handleOpen}
          data-toggle="tooltip"
          title="Edit"
        >
          {/* &#xE254; */}
          <span style={{ fontSize: "16px" }}>✏️</span>
        </i>
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
              <strong>Edit Fault</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={submitSaveFault}>
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
                  as="select"
                  value={fault.team}
                  onChange={(e) => {
                    teamHandler(e, setFault, setTeamMember);
                  }}
                >
                  {fault.teams.map((team) => {
                    return (
                      <option key={team._id} value={team.name}>
                        {team.name}
                      </option>
                    );
                  })}
                </Form.Control>
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
                <Form.Control
                  type="text"
                  value={teamMember.id}
                  onChange={(e) => {
                    teamMemberIdHandler(e, setTeamMember, props);
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
                    <strong>Fault details</strong>
                    {/*--------------Fault Details----------------*/}
                  </h4>
                </Form.Label>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>
                  <strong>No.</strong>
                </Form.Label>
                <Form.Control type="text" value={fault.number} readOnly />
              </Form.Group>

              <Form.Group as={Col}>
                <Form.Label>
                  <strong>Status</strong>
                </Form.Label>
                <Form.Control type="text" value={fault.status} readOnly />
              </Form.Group>
            </Row>

            <Form.Group size="lg" controlId="email">
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
    </>
  );
};

export default EditFaultModel;
