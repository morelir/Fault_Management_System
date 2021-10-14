import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import "./fault_management.css";
import Spinner from "react-bootstrap/Spinner";
import NewFaultModel from "./FaultManagement/newFaultModel";
import EditFaultModel from "./FaultManagement/editFaultModel";
import CloseFaultModal from "./FaultManagement/closeFaultModal";
import AuthContext from "../store/auth-context";

const FaultManagement = (props) => {
  const authCtx = useContext(AuthContext);
  const [faults, setFaults] = useState([]);
  const [teams, setTeams] = useState([]);
  const [users, setUsers] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const evenPos = (pos) => pos % 2 == 0;

  const getData = async () => {
    try {
      let response = await Axios.get("/faultManagement");
      setFaults(response.data);
      response = await Axios.get(`faultManagement/teams`);
      setTeams(response.data);
      response = await Axios.get(`faultManagement/users`);
      setUsers(response.data);
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

  // const deleteFault = (id) => {
  //   updateFaults(faults.filter((fault) => fault._id !== id));
  // };

  const displayDate = (dateFormat) => {
    let date = new Date(dateFormat);
    let month = date.getMonth() + 1;
    let displayDate = `${date.getFullYear()}-${
      month >= 10 ? month : "0" + month
    }-${date.getDate() >= 10 ? date.getDate() : "0" + date.getDate()} ${
      date.getHours() >= 10 ? date.getHours() : "0" + date.getHours()
    }:${date.getMinutes() >= 10 ? date.getMinutes() : "0" + date.getMinutes()}`;
    return displayDate;
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
                  <div className="col-sm-10">
                    <NewFaultModel
                      teams={teams}
                      users={users}
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
                  <th>Team</th>
                  <th>Team member </th>
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
                        fault.team === authCtx.user.team
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
                            <td>{fault.status}</td>
                            <td>{displayDate(fault.date_created)}</td>
                            <td>{`${fault.clientName}, ${fault.clientSurname}`}</td>
                            <td>{fault.team}</td>
                            {fault.teamMemberID === null ? (
                              <td></td>
                            ) : (
                              <td>{`${fault.teamMemberName}, ${fault.teamMemberSurname}`}</td>
                            )}
                            <td>{fault.handling_duration}</td>
                            <td>
                              <EditFaultModel
                                fault={fault}
                                teams={teams}
                                users={users}
                                updateFaults={updateFaults}
                              />
                              <CloseFaultModal
                                _id={fault._id}
                                updateFaults={updateFaults}
                              />
                            </td>
                          </tr>
                          <tr
                            id={
                              evenPos(pos) ? "fault-even-pos" : "fault-odd-pos"
                            }
                          >
                            <td colSpan="8" className="fault-description">
                              <span>{fault.description}</span>
                            </td>
                          </tr>
                        </React.Fragment>
                      );
                    })
                ) : (
                  <tr>
                    <td colSpan="8">
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
