import React, { useContext, useState, useEffect } from "react";
import Axios from "axios";
import styles from "./Request_Management.module.css";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import AuthContext from "../store/auth-context";
import DisplayRequestModal from "./RequestManagement/DisplayRequestModal";
import ModalDialog from "../shared/components/Modals/ModalDialog";
import NewPurchaseRequestModal from "./RequestManagement/NewPurchaseRequestModal";

const RequestManagement = (props) => {
  const authCtx = useContext(AuthContext);
  const [requests, setRequests] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const evenPos = (pos) => pos % 2 == 0;

  const getData = async () => {
    try {
      let response = await Axios.get("arrays/requests");
      let requests=response.data
      response = await Axios.get("arrays/purchaseRequests");
      requests=[...requests,...response.data]
      console.log(requests)
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
                <div className="col-sm-12">
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
                            <td>
                              <strong>{request.status} </strong>
                            </td>
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
                                request={request}
                                users={users}
                                updateRequests={updateRequests}
                                // updateFaults={updateFaults}
                              />
                              {authCtx.user.team === "Stock" ? (
                                <>
                                  <NewPurchaseRequestModal
                                    products={request.products}
                                    number={request.number}
                                    updateRequests={updateRequests}
                                    request={request.existPurchaseRequest}
                                    team="Purchase"
                                  />
                                  <ModalDialog
                                    type="request"
                                    native="/requestManagement/closeRequest"
                                    _id={request._id}
                                    update={updateRequests}
                                    className="close"
                                    btn_name="Close"
                                    icon="lock"
                                    icon_font="20px"
                                    href="#closeModal"
                                    header="Close Request"
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
                                  {/* <NewRequestModal
                                    products={products}
                                    number={fault.number}
                                    team="Stock"
                                  />*/}
                                  {/* <ModalDialog
                                    type="request"
                                    native="/requestManagement/closePurchaseRequest"
                                    _id={request._id}
                                    update={updateRequests}
                                    className="close"
                                    btn_name="Close"
                                    icon="lock"
                                    icon_font="20px"
                                    href="#closeModal"
                                    header="Close Purchase Request"
                                  >
                                    <Form.Group>
                                      <Form.Label>
                                        <strong>
                                          Are you sure you want to close the
                                          request ?
                                        </strong>
                                      </Form.Label>
                                    </Form.Group>
                                  </ModalDialog> */}
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
