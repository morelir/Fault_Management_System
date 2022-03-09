import React, { useContext, useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
//import Button from "react-bootstrap/Button";
import { BiSearchAlt } from "react-icons/bi";
import { CSSTransition } from "react-transition-group";
import { clientIdHandler } from "../../utils/functions";
import Button from "../../shared/components/FormElements/Button";

const FaultsFilter = (props) => {
  const [filter, setFilter] = useState({
    number: "",
    status: "",
    date_created: "",
    clientID: "",
    handler_team: "",
    handler_member: "",
    urgency_level: "",
    handling_duration: "",
    idIsValid: true,
  });
  const [client, setClient] = useState({
    id: "",
    idIsValid: true,
  });
  const [teamMember, setTeamMember] = useState({
    id: "",
    idIsValid: true,
  });
  const [formIsValid, setFormIsValid] = useState(false);

  const handlerID = (e, set, persons, idIsValid, id) => {
    let value = e.target.value;
    if (idIsValid && id.length !== 0) {
      set((prevState) => {
        return { ...prevState, id: "", idIsValid: false };
      });
    } else {
      set((prevState) => {
        return { ...prevState, id: value, idIsValid: false };
      });
    }
    if (value.length === 9) {
      let [person] = persons.filter((person) => person.id === parseInt(value));
      if (person) {
        set((prevState) => {
          return {
            ...prevState,
            id: `${person.name}, ${person.surname}`,
            idIsValid: true,
          };
        });
      }
    } else if (value.length === 0) {
      set((prevState) => {
        return {
          ...prevState,
          id: "",
          idIsValid: true,
        };
      });
    }
  };

  const handleChange = (e) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log("checking form validity");
      setFormIsValid(teamMember.idIsValid && client.idIsValid);
    }, 250);

    return () => {
      console.log("Clean-Up Timeout");
      clearTimeout(identifier);
    };
  }, [teamMember.idIsValid, client.idIsValid]);

  return (
    <thead>
      <CSSTransition
        in={props.isOpen}
        timeout={200}
        classNames="slide-in-up"
        mountOnEnter
        unmountOnExit
      >
        <>
          <tr>
            <th>
              <Form.Group>
                <Form.Label>Fault No.</Form.Label>
                <Form.Control
                  name="number"
                  value={filter.number}
                  onChange={handleChange}
                />
              </Form.Group>
            </th>
            <th>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Control
                  as="select"
                  value={filter.status}
                  onChange={handleChange}
                  name="status"
                >
                  <option value="" selected></option>
                  <option value="In treatment">In treatment</option>
                  <option value="Waiting for component">
                    Waiting for component
                  </option>
                  <option value="Close">Close</option>
                </Form.Control>
              </Form.Group>
            </th>
            <th>
              <Form.Group>
                <Form.Label>Date created</Form.Label>
                <Form.Control
                  name="date_created"
                  value={filter.date_created}
                  onChange={handleChange}
                  type="date"
                />
              </Form.Group>
            </th>
            <th>
              <Form.Group>
                <Form.Label>Client ID</Form.Label>
                <Form.Control
                  value={client.id}
                  onChange={(e) => {
                    handlerID(
                      e,
                      setClient,
                      props.clients,
                      client.idIsValid,
                      client.id
                    );
                  }}
                />
              </Form.Group>
            </th>
            <th>
              <Form.Group>
                <Form.Label>Handler team</Form.Label>
                <Form.Control
                  as="select"
                  name="handler_team"
                  value={filter.handler_team}
                  onChange={handleChange}
                >
                  <option value="" selected></option>
                  <option value={"Customer service"}>Customer service</option>
                  <option value={"Technical service"}>Regular</option>
                </Form.Control>
              </Form.Group>
            </th>
            <th>
              <Form.Group>
                <Form.Label>Handler Member ID</Form.Label>
                <Form.Control
                  value={teamMember.id}
                  onChange={(e) => {
                    handlerID(
                      e,
                      setTeamMember,
                      props.users,
                      teamMember.idIsValid,
                      teamMember.id
                    );
                  }}
                />
              </Form.Group>
            </th>
            <th>
              <Form.Group>
                <Form.Label> Urgency level</Form.Label>
                <Form.Control
                  as="select"
                  name="urgency_level"
                  value={filter.urgency_level}
                  onChange={handleChange}
                >
                  <option value="" selected></option>
                  <option value={"Low"}>Low</option>
                  <option value={"Normal"}>Regular</option>
                  <option value={"High"}>High</option>
                </Form.Control>
              </Form.Group>
            </th>

            <th>
              {/* <Button
                disabled={!formIsValid}
                style={{
                  background: "#38a5ff",
                  borderColor: "#38a5ff",
                  marginTop: "30px",
                }}
                variant="primary"
                type="submit"
              >
                Search <BiSearchAlt />
              </Button> */}
              <Button
                style={{ marginTop: "30px" }}
                type="submit"
                disabled={!formIsValid}
              >
                Search <BiSearchAlt />
              </Button>
            </th>
            <th></th>
          </tr>
        </>
      </CSSTransition>
    </thead>
  );
};

export default FaultsFilter;
