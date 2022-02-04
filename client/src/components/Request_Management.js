import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import "./fault_management.css";
import Spinner from "react-bootstrap/Spinner";
import EditFaultModel from "./FaultManagement/editFaultModel";
import CloseFaultModal from "./FaultManagement/closeFaultModal";
import AuthContext from "../store/auth-context";
import DoneFaultModal from "./FaultManagement/doneFaultModal";
import Icon from "../shared/components/FormElements/Icon";

const RequestManagement = (props) => {
    const authCtx = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const evenPos = (pos) => pos % 2 == 0;
    
    const getData = async () => {
        try {
          let response = await Axios.get("/requestManagement");
          setRequests(response.data);
          
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(async () => {
        await getData();
    }, []);

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
                        <strong>Requests List</strong>
                      </h2>
                    </div>
                  </div>
                </div>
                <table className="table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>No.</th>
                      <th>Status</th>
                      <th>Date created</th>
                      <th>Handler Team</th>
                      <th>Handler Team member</th>
                      <th>Handling duration</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {!isLoading ? (
                      requests
                        .filter(
                          (request) =>
                            request.status !== "Close" &&
                            request.team === authCtx.user.team 
                
                        )
                        .map((request, pos) => {
                          return (
                            <React.Fragment key={request.number}>
                              <tr
                                id={
                                  evenPos(pos) ? "fault-even-pos" : "fault-odd-pos"
                                }
                              >
                                <td>{request.number}</td>
                                {request.status==="In treatment" &&
                                <td className="In_treatment_status">
                                  <strong>{request.status}{" "}</strong> 
                                </td>
                                }
                                {request.status==="Done" &&
                                <td className="done_status">
                                  <strong>{request.status}{" "}</strong>
                                </td>
                                }
                                <td>{displayDate(request.date_created)}</td>
                                <td>{`${request.clientName}, ${request.clientSurname}`}</td>
                                <td>{request.team}</td>
                                {request.teamMemberID === null ? (
                                  <td></td>
                                ) : (
                                  <td>{`${request.teamMemberName}, ${request.teamMemberSurname}`}</td>
                                )}
                                <td>{request.handling_duration}</td>
                                <td>
                                  {/* <EditFaultModel
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
                                      <CloseFaultModal
                                        _id={fault._id}
                                        updateFaults={updateFaults}
                                      />
                                    </>
                                  ) : (
                                    <DoneFaultModal
                                      _id={fault._id}
                                      updateFaults={updateFaults}
                                    />
                                  )} */}
                                </td>
                              </tr>
                              <tr
                                id={
                                  evenPos(pos) ? "fault-even-pos" : "fault-odd-pos"
                                }
                              >
                                <td colSpan="8" className="fault-description">
                                  <span>{request.equipment_SerialNumbers}</span>
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

export default RequestManagement;
