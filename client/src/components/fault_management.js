import React, { useState, useEffect } from "react";
import Axios from "axios";
import "./fault_management.css";
import Spinner from "react-bootstrap/Spinner";
import NewFaultModel from "./FaultManagement/newFaultModel";
import EditFaultModel from "./FaultManagement/editFaultModel";

const FaultManagement = (props) => {
  // console.log(props)
  const [faults, setFaults] = useState([]);
  // console.log(faults)
  const [showNewFault, setShowNewFault] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const closeNewFaultHandler = () => {
    setShowNewFault(false);
  };

  const newFaultHandler = () => {
    setShowNewFault(true);
  };

  const evenPos = (pos) => pos % 2 == 0;

  useEffect(() => {
    Axios.get("/faultManagement")
      .then((response) => {
        setFaults(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const updateFaults = (faults) => {
    setFaults(faults);
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
        <div className="table-responsive">
          <div className="table-wrapper">
            <div className="table-title">
              <div className="row">
                <div className="col-sm-2">
                  <h2>
                    <strong>Fault List</strong>
                  </h2>
                </div>
                <div className="col-sm-10">
                  {/* <a
                    onClick={newFaultHandler}
                    className="btn btn-success"
                    data-toggle="modal"
                    style={{ fontSize: "16px" }}
                  >
                  
                    <i className="material-icons">&#xE147;</i>{" "}
                    <span>New Fault</span>
                  </a> */}
                  <NewFaultModel
                    updateFaults={updateFaults}
                  />
                </div>
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
                  <th>Handler </th>
                  <th>Handling duration</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {!isLoading ? (
                  faults.map((fault, pos) => {
                    return (
                      <React.Fragment key={fault.number}>
                        {/* key={fault.number} */}
                        <tr
                          id={evenPos(pos) ? "fault-even-pos" : "fault-odd-pos"}
                        >
                          <td>{fault.number}</td>
                          <td>{fault.status}</td>
                          <td>{displayDate(fault.date_created)}</td>
                          <td>{`${fault.name}, ${fault.surname}`}</td>
                          <td>{fault.team}</td>
                          <td>{fault.handler}</td>
                          <td>{fault.handling_duration}</td>
                          <td>
                            <EditFaultModel fault={fault} updateFaults={updateFaults} />

                            <a
                              href="#deleteEmployeeModal"
                              className="delete"
                              data-toggle="modal"
                            >
                              <i
                                className="material-icons"
                                // onClick="delete_click(this.id)"
                                data-toggle="tooltip"
                                title="Delete"
                              >
                                &#xE872;
                              </i>
                            </a>
                          </td>
                        </tr>
                        <tr
                          id={evenPos(pos) ? "fault-even-pos" : "fault-odd-pos"}
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