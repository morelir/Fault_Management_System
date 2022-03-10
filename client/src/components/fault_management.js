import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import "./fault_management.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import NewFaultModel from "./FaultManagement/newFaultModel";
import EditFaultModel from "./FaultManagement/editFaultModel";
import FaultsFilter from "./FaultManagement/FaultsFilter";
import AuthContext from "../store/auth-context";
import NewRequestModal from "./FaultManagement/NewRequestModal";
import ModalDialog from "../shared/components/Modals/ModalDialog";
import { BsFilterRight } from "react-icons/bs";
import {
  displayDate,
  getTimeDuration,
  faultActivity,
  defaultFilter,
  teamFilter
} from "../utils/functions";

const FaultManagement = (props) => {
  const authCtx = useContext(AuthContext);
  const [allFaults, setAllFaults] = useState([]);
  const [faults, setFaults] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);
  const [clients, setClients] = useState([]);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(true);
  const handleOpen = () => {
    if (!isOpen) setIsOpen(true);
    else setIsOpen(false);
  };

  const evenPos = (pos) => pos % 2 == 0;

  const getData = async () => {
    try {
      let response = await Axios.get("arrays/faults");
      setAllFaults(response.data);
      setFaults(defaultFilter(response.data, authCtx.user.team));
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
    setFaults(teamFilter(faults, authCtx.user.team));
  };

  const resetFaults = () => {
    setFaults(defaultFilter(allFaults, authCtx.user.team));
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
                {!isLoading && (
                  <>
                    {authCtx.user.team === "Customer service" ? (
                      <>
                        <div className="col-sm-9">
                          <NewFaultModel
                            users={users}
                            clients={clients}
                            updateFaults={updateFaults}
                          />
                        </div>

                        <a
                          className="col-sm-1 btn"
                          style={{ marginLeft: "0" }}
                        >
                          <BsFilterRight
                            onClick={handleOpen}
                            style={{ fontSize: "25px" }}
                          />
                        </a>
                      </>
                    ) : (
                      <div className="col-sm-10">
                        <a className="btn">
                          <BsFilterRight
                            onClick={handleOpen}
                            style={{ fontSize: "25px" }}
                          />
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <table className="table table-striped table-hover">
              <FaultsFilter
                faults={allFaults}
                users={users}
                clients={clients}
                isOpen={isOpen}
                updateFaults={updateFaults}
                resetFaults={resetFaults}
              />
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
                  faults.length === 0 ? (
                    <tr id={"fault-even-pos"}> 
                      <td colSpan="9">
                        <strong>Not Found</strong>
                      </td>
                    </tr>
                  ) : (
                    faults.map((fault, pos) => {
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

                            <td>{displayDate(fault.date_created)}</td>
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
                            <td>{getTimeDuration(fault.date_created)}</td>
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
                                    authCtx={authCtx}
                                    Activity={faultActivity}
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
                                    urgencyLevel={fault.urgencyLevel}
                                    team="Stock"
                                  />
                                  <ModalDialog
                                    type="fault"
                                    _id={fault._id}
                                    authCtx={authCtx}
                                    Activity={faultActivity}
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
                  )
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
