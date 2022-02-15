import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import "./fault_management.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import NewFaultModel from "./FaultManagement/newFaultModel";
import EditFaultModel from "./FaultManagement/editFaultModel";
import AuthContext from "../store/auth-context";
import Icon from "../shared/components/FormElements/Icon";
import NewRequestModal from "./FaultManagement/NewRequestModal";
import ModalDialog from "../shared/components/Modals/ModalDialog";
import * as utils from "./utils/functions"

const FaultManagement = (props) => {
  const authCtx = useContext(AuthContext);
  const [faults, setFaults] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const evenPos = (pos) => pos % 2 == 0;

  const getData = async () => {
    try {
      let response = await Axios.get("arrays/faults");
      setFaults(response.data);
      response = await Axios.get(`arrays/teams`);
      setTeams(response.data);
      response = await Axios.get(`arrays/users`);
      setUsers(response.data);
      response = await Axios.get(`arrays/clients`);
      setClients(response.data);
      response = await Axios.get(`arrays/products`);
      setProducts(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await getData();
  }, []);

  const updateFaults = (faults) => {
    setFaults(faults);
  };

 

  return (
    <main>
      {/* className="container-xl" */}
      <div className="container-xl container-max-width">
        {/* className="table-responsive" */}
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-2">
                  <h2>
                    <strong>Fault List</strong>
                  </h2>
                </div>
                {authCtx.user.team === "Customer service" && !isLoading && (
                  <div className="col-sm-10">
                    <NewFaultModel
                      teams={teams.filter(
                        (team) =>
                          team.name === "Technical service" ||
                          team.name === "Customer service"
                      )}
                      users={users}
                      clients={clients}
                      updateFaults={updateFaults}
                    />
                  </div>
                )}
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Status</th>
                  <th>Date created</th>
                  <th>Client name </th>
                  <th>Handler Team</th>
                  <th>Handler Team member</th>
                  <th>Urgency level</th>
                  <th>Handling duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  faults
                    .filter(
                      (fault) =>
                        fault.status !== "Close" &&
                        (fault.team === authCtx.user.team ||
                          authCtx.user.team === "Customer service")
                    )
                    .map((fault, pos) => {
                      return (
                        <React.Fragment key={fault.number}>
                          <tr
                            id={
                              evenPos(pos) ? "fault-even-pos" : "fault-odd-pos"
                            }
                          >
                            <td>{fault.number}</td>

                            <td>
                              <strong>{fault.status} </strong>
                            </td>

                            <td>{utils.displayDate(fault.date_created)}</td>
                            <td>{`${fault.clientName}, ${fault.clientSurname}`}</td>
                            <td>{fault.team}</td>
                            {fault.teamMemberID === null ? (
                              <td></td>
                            ) : (
                              <td>{`${fault.teamMemberName}, ${fault.teamMemberSurname}`}</td>
                            )}
                            <td
                              className={`urgencyLevel-${fault.urgencyLevel}`}
                            >
                              <strong>{fault.urgencyLevel}</strong>
                            </td>
                            <td>{utils.getTimeDuration(fault.date_created)}</td>
                            <td>
                              <EditFaultModel
                                fault={fault}
                                teams={teams.filter(
                                  (team) =>
                                    team.name === "Technical service" ||
                                    team.name === "Customer service"
                                )}
                                users={users}
                                clients={clients}
                                updateFaults={updateFaults}
                              />
                              {authCtx.user.team === "Customer service" ? (
                                <>
                                  <ModalDialog
                                    type="fault"
                                    _id={fault._id}
                                    native="/faultManagement/closeFault"
                                    update={updateFaults}
                                    className="close"
                                    btn_name="Close"
                                    btn_disabled={fault.status !== "Done"}
                                    icon="lock"
                                    icon_font="20px"
                                    href="#closeModal"
                                    header="Close Fault"
                                  >
                                    <Form.Group>
                                      <Form.Label>
                                        <strong>
                                          Are you sure you want to close the
                                          fault ?
                                        </strong>
                                      </Form.Label>
                                    </Form.Group>
                                  </ModalDialog>
                                </>
                              ) : (
                                <>
                                  <NewRequestModal
                                    products={products}
                                    number={fault.number}
                                    updateFaults={updateFaults}
                                    request={fault.request}
                                    team="Stock"
                                  />
                                  <ModalDialog
                                    type="fault"
                                    _id={fault._id}
                                    native="/faultManagement/doneFault"
                                    update={updateFaults}
                                    className="done"
                                    btn_name="Done"
                                    btn_disabled={fault.request}
                                    icon="check_circle_outline"
                                    icon_font="21"
                                    href="#doneModal"
                                    header="Done Fault"
                                  >
                                    <Form.Group>
                                      <Form.Label>
                                        <strong>
                                          Are you sure the fault has been done ?
                                        </strong>
                                      </Form.Label>
                                    </Form.Group>
                                  </ModalDialog>
                                </>
                              )}
                            </td>
                          </tr>
                          <tr
                            id={
                              evenPos(pos) ? "fault-even-pos" : "fault-odd-pos"
                            }
                          >
                            <td colSpan="9" className="fault-description">
                              <span>{fault.description}</span>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan="9">
                      <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
};

export default FaultManagement;
