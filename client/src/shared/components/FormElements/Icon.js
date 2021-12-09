import React from "react";

const Icon = (props) => {
  return (
      <div>
    <a href="#closeModal" className={props.className} data-toggle="modal">
      <i  data-toggle="tooltip" title={props.title}>
        {/* &#xE872; */}
        <span>
          <span className="material-icons-outlined" style={{ fontSize: "16px" }}>
            {props.icon}
          </span>
        </span>
      </i>
    </a>
    </div>
  );
};

export default Icon;
