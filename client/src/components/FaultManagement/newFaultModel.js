import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import styles from "./faultModel.module.css";
import Axios from "axios";

const NewFaultModel = (props) => {
  const [fault, setFault] = useState({
    number: "",
    status: "New",
    team: "",
    description: "",
    formIsValid: false,
  });
  const [savingForm,setSavingForm]=useState(false)

  const [client, setClient] = useState({
    id: "",
    name: "",
    surname: "",
    idIsValid: false,
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
        idIsValid: false,
      };
    });
    setSavingForm(false);
    generateFaultNumber();
  };

  const submitNewFault = (e) => {
    e.preventDefault();
    setSavingForm(true);
    Axios.post(`faultManagement/NewFaultModel`, {
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
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const generateFaultNumber = () => {
    Axios.get(`faultManagement/NewFaultModel/newNumber`)
      .then((response) => {
        console.log(response.data);
        if (response.data) {
          setFault((prevState) => {
            return {
              ...prevState,
              number: response.data,
            };
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setFault((prevState) => {
          return {
            ...prevState,
            number: 100000000,
          };
        });
      });
  };

  useEffect(() => {
    generateFaultNumber();
  }, []);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFault((prevState) => {
        return {
          ...prevState,
          formIsValid: fault.description.length > 0,
        };
      });
    }, 250);

    return () => {
      console.log("Clean-Up Timeout");
      clearTimeout(identifier);
    };
  }, [fault.description]);

  const clientIdHandler = (e) => {
    let value = e.target.value;
    setClient((prevState) => {
      return { ...prevState, id: value };
    });
    if (value.length === 9) {
      //need to add if in the id is match
      Axios.put(`faultManagement/clientID`, {
        id: parseInt(value),
      }).then((response) => {
        if (response.data) {
          setClient((prevState) => {
            return {
              ...prevState,
              name: response.data.name,
              surname: response.data.surname,
            };
          });
          setClient((prevState) => {
            return { ...prevState, idIsValid: true };
          });
          return;
        }
      });
    }
    setClient((prevState) => {
      return { ...prevState, idIsValid: false };
    });
  };

  return (
    <>
      <a
        onClick={handleOpen}
        className="btn btn-success"
        data-toggle="modal"
        style={{ fontSize: "16px" }}
      >
        <i className="material-icons">&#xE147;</i> <span>New Fault</span>
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
          <Modal.Body>
            <table>
              <tbody>
                <tr>
                  <td className={styles["td"]}>
                    <Form.Label>
                      <strong>No.</strong>
                    </Form.Label>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      className={styles["form-control"]}
                      value={fault.number}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label>
                      <strong>Status</strong>
                    </Form.Label>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      className={styles["form-control"]}
                      value={fault.status}
                      readOnly
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <Form.Label>
                      <strong>Client ID</strong>
                    </Form.Label>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      className={styles["form-control"]}
                      value={client.id}
                      onChange={clientIdHandler}
                    />
                  </td>
                </tr>
                {client.idIsValid && (
                  <tr>
                    <td>
                      <Form.Label>
                        <strong>Client Name</strong>
                      </Form.Label>
                    </td>
                    <td>
                      <Form.Control
                        type="text"
                        className={styles["form-control"]}
                        value={`${client.name}, ${client.surname}`}
                        readOnly
                      />
                    </td>
                  </tr>
                )}
                <tr>
                  <td>
                    <Form.Label>
                      <strong>Team</strong>
                    </Form.Label>
                  </td>
                  <td>
                    <Form.Control
                      type="text"
                      className={styles["form-control"]}
                      value={fault.team}
                      onChange={(e) => {
                        setFault((prevState) => {
                          return { ...prevState, team: e.target.value };
                        });
                      }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <Form.Group size="lg" controlId="email">
              <Form.Label>
                <strong>Description :</strong>
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
            <Button variant="secondary" onClick={handleClose} disabled={fault.savingForm}>
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

export default NewFaultModel;