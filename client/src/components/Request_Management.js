import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import styles from "./Request_Management.module.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import AuthContext from "../store/auth-context";
import DisplayRequestModal from "./RequestManagement/DisplayRequestModal";
import ModalDialog from "../shared/components/Modals/ModalDialog";
import NewPurchaseRequestModal from "./RequestManagement/NewPurchaseRequestModal";
import Order from "./RequestManagement/Order";
import {
  displayDate,
  getTimeDuration,
  requestActivity,
  closePurchaseRequestActivity,
} from "../utils/functions";

const RequestManagement = (props) => {
  const authCtx = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const evenPos = (pos) => pos % 2 == 0;

  const getData = async () => {
    try {
      let response = await Axios.get("arrays/requests");
      let requests = response.data;
      response = await Axios.get("arrays/purchaseRequests");
      requests = [...requests, ...response.data];
      setRequests(requests);
      response = await Axios.get(`arrays/users`);
      setUsers(response.data);
      setIsLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(async () => {
    await getData();
  }, []);

  const updateRequests = (requests) => {
    setRequests(requests);
  };

  return (
    <main>
      {/* className="container-xl" */}
      <div className={`container-xl ${styles["container-max-width"]}`}>
        {/* className="table-responsive" */}
        <div className={styles.table_responsive}>
          <div className={styles.table_wrapper}>
            <div className={styles.table_title}>
              <div className="row">
                <div className="col-sm-12">
                  {authCtx.user.team === "Stock" ? (
                    <h2>
                      <strong>Component Request List</strong>
                    </h2>
                  ) : (
                    <h2>
                      <strong>Purchase Request List</strong>
                    </h2>
                  )}
                </div>
              </div>
            </div>
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Date created</th>
                  <th>Status</th>
                  <th>Urgency level</th>
                  <th>Time Duration</th>
                  <th>Handler Team member</th>
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
                            <td>{displayDate(request.date_created)}</td>
                            <td>
                              <strong>{request.status} </strong>
                            </td>
                            <td
                              className={`urgencyLevel-${request.urgencyLevel}`}
                            >
                              <strong>{request.urgencyLevel}</strong>
                            </td>
                            <td>{getTimeDuration(request.date_created)}</td>
                            {request.teamMemberID === null ? (
                              <td></td>
                            ) : (
                              <td>{`${request.teamMemberName}, ${request.teamMemberSurname}`}</td>
                            )}

                            <td>
                              <DisplayRequestModal
                                request={request}
                                users={users}
                                updateRequests={updateRequests}
                                // updateFaults={updateFaults}
                              />
                              {authCtx.user.team === "Stock" ? (
                                <>
                                  <NewPurchaseRequestModal
                                    request={request}
                                    updateRequests={updateRequests}
                                    team="Purchase"
                                  />
                                  <ModalDialog
                                    type="request"
                                    _id={request._id}
                                    authCtx={authCtx}
                                    Activity={requestActivity}
                                    native="/requestManagement/closeRequest"
                                    update={updateRequests}
                                    className="close"
                                    btn_name="Close"
                                    btn_disabled={
                                      request.status ===
                                      "Waiting for component purchase"
                                    }
                                    icon="lock"
                                    icon_font="20px"
                                    href="#closeModal"
                                    header="Close request"
                                  >
                                    <Form.Group>
                                      <Form.Label>
                                        <strong>
                                          Are you sure you want to close the
                                          request ?
                                        </strong>
                                      </Form.Label>
                                    </Form.Group>
                                  </ModalDialog>
                                </>
                              ) : (
                                <>
                                  <Order
                                    request={request}
                                    updateRequests={updateRequests}
                                    team="Purchase"
                                  />
                                  <ModalDialog
                                    type="request"
                                    _id={request._id}
                                    authCtx={authCtx}
                                    Activity={closePurchaseRequestActivity}
                                    native="/requestManagement/closePurchaseRequest"
                                    update={updateRequests}
                                    className="close"
                                    btn_name="Close"
                                    icon="lock"
                                    icon_font="20px"
                                    href="#closeModal"
                                    header="Close purchase request"
                                  >
                                    <Form.Group>
                                      <Form.Label>
                                        <strong>
                                          Are you sure you want to close the
                                          purchase request ?
                                        </strong>
                                      </Form.Label>
                                    </Form.Group>
                                  </ModalDialog>
                                </>
                              )}
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
