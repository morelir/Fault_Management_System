import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import styles from "./faultModel.module.css";
import Axios from "axios";

const CloseFaultModal = (props) => {
  const [show, setShow] = useState(false);

  const [savingForm, setSavingForm] = useState(false);

  const handleClose = () => {
    setShow(false);
  };

  const handleOpen = () => {
    setShow(true);
  };

  const handleCloseFault = async () => {
    try {
      setSavingForm(true);
      const response = await Axios.put("/faultManagement/closeFault", {
        _id: props._id,
      });
      props.updateFaults(response.data);
      setSavingForm(false);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <button className="button" >
        <a href="#closeModal" className="close" data-toggle="modal">
          <i
            className="material-icons"
            onClick={handleOpen}
            data-toggle="tooltip"
            title="Close"
          >
            {/* &#xE872; */}
            <strong style={{ fontFamily: "none" }}>Close </strong>
            <span style={{ fontSize: "20px" }}> lock </span>
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
              <strong>Close Fault</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <strong>Are you sure you want to close the fault ?</strong>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
            }}
            disabled={savingForm}
          >
            No
          </Button>
          {!savingForm ? (
            <Button variant="primary" type="submit" onClick={handleCloseFault}>
              Yes
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
      </Modal>
    </>
  );
};

export default CloseFaultModal;
