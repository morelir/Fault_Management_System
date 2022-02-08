import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import styles from "./Request_Management.module.css";
import Spinner from "react-bootstrap/Spinner";
import AuthContext from "../store/auth-context";
import DisplayRequestModal from "./RequestManagement/DisplayRequestModal";


const RequestManagement = (props) => {
    const authCtx = useContext(AuthContext);
    const [requests, setRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const evenPos = (pos) => pos % 2 == 0;
    
    const getData = async () => {
        try {
          let response = await Axios.get("/requestManagement");
          setRequests(response.data);
          setIsLoading(false)
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
            <div className={styles.table_responsive}>
              <div className={styles.table_wrapper}>
                <div className={styles.table_title}>
                  <div className="row">
                    <div className="col-sm-11">
                      <h2>
                        <strong>Request List</strong>
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
                                <td>{request.team}</td>         
                                {request.teamMemberID === null ? (
                                  <td></td>
                                ) : (
                                  <td>{`${request.teamMemberName}, ${request.teamMemberSurname}`}</td>
                                )}
                                <td>{request.handling_duration}</td>
                                <td>
                                  <DisplayRequestModal
                                    // fault={fault}
                                    // teams={teams.filter(
                                    //   (team) =>
                                    //     team.name === "Technical service" ||
                                    //     team.name === "Customer service"
                                    // )}
                                    // users={users}
                                    // clients={clients}
                                    // updateFaults={updateFaults}
                                  />
                                  {/* {authCtx.user.team === "Customer service" ? (
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
                              {/* <tr
                                id={
                                  evenPos(pos) ? "fault-even-pos" : "fault-odd-pos"
                                }
                              >
                                <td colSpan="8" className="fault-description">
                                  <span>{request.note}</span>
                                </td>
                              </tr> */}
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
