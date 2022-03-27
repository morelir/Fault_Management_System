import React, { useState } from "react";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import { BiSearchAlt } from "react-icons/bi";
import { HiOutlineRefresh } from "react-icons/hi";
import { CSSTransition } from "react-transition-group";
//import {  } from "../../utils/functions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const UserFilter = (props) => {
  const [filter, setFilter] = useState({
    number: "",
    status: "",
    from_date_created: "",
    handler_team: "",
    urgency_level: "",
  });
  
  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };
  return (
    <>
      
      <CSSTransition
        in={props.isOpen}
        timeout={300}
        classNames="slide-in-up"
        mountOnEnter
        unmountOnExit
      >
        <Row>
          <Form.Group as={Col}>
            <Form.Label><strong>Fault No.</strong></Form.Label>
            <Form.Control
              name="number"
              value={filter.number}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label><strong>Fault No.</strong></Form.Label>
            <Form.Control
              name="number"
              value={filter.number}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label><strong>Fault No.</strong></Form.Label>
            <Form.Control
              name="number"
              value={filter.number}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group as={Col}>
            <Form.Label><strong>Fault No.</strong></Form.Label>
            <Form.Control
              name="number"
              value={filter.number}
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
      </CSSTransition>
    </>
  );
};

export default UserFilter;
