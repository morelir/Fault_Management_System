import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import styles from "./faultModel.module.css";
import Axios from "axios";

const DoneFaultModal = (props) => {
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
      setSavingForm(true)
      const response = await Axios.put("/faultManagement/doneFault", {
        _id: props._id,
      });
      props.updateFaults(response.data);
      setSavingForm(false)
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <a href="#doneModal" className="done" data-toggle="modal">
        <i
          className="material-icons"
          onClick={handleOpen}
          data-toggle="tooltip"
          title="Done"
        >
          {/* &#xE872; */}
          <span style={{ fontSize: "21px" }}> check_circle_outline</span>
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
              <strong>Done Fault</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body><strong>Are you sure the fault has been done ?</strong></Modal.Body>
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

export default DoneFaultModal;