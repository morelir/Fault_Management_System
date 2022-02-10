import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "react-bootstrap/Spinner";
import styles from "./ModalDialog.module.css";
import Axios from "axios";

const ModalDialog = (props) => {
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
      const response = await Axios.put(props.native, {
        _id: props._id,
      });
      props.update(response.data);
      setSavingForm(false);
      handleClose();
    } catch (err) {
      console.log(err);
    }
  };
  // #closeModal
  return (
    <>
      <button className="button" >
        <a href={props.href} className={props.className} data-toggle="modal">
          <i
            className="material-icons"
            onClick={handleOpen}
            data-toggle="tooltip"
            title={props.title}
          >
            {/* &#xE872; */}
            <strong style={{ fontFamily: "none" }}>{props.btn_name} </strong>
            <span style={{ fontSize: props.icon_font }}> {props.icon} </span>
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
        {/* closeButton Close Fault*/}
        <Modal.Header className={`${styles["modal-header"]} ${styles[`modal-header-${props.type}`]} `}>
          <Modal.Title>
            <h3>
              <strong>{props.header}</strong>
            </h3>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>{props.children}</Modal.Body>
        
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

export default ModalDialog;