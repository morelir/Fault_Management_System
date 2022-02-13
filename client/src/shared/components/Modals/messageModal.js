import React, { useState,useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "./messageModal.module.css";

const MessageModal = (props) => {
  const [show, setShow] = useState(props.show);

  const handleClose = () => {
    props.handleClose(false);
  };

  useEffect(() => {
    setShow(props.show)
  }, [props.show]);

  return (
    <Modal show={props.show} className={styles.modal}>
      <Modal.Header className={`${styles["modal-header"]} ${styles[`modal-header-${props.type}`]} `}>
        <Modal.Title>
          <h3>
            <strong>{props.header}</strong>
          </h3>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleClose}>
            Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MessageModal;
