import React from "react";
import "./BuildControl.scss";

const buildControl = (props) => (
    <div className="BuildControl">
        <div className="Label">{props.label}</div>
        <button className="Less" onClick={props.ingRemove} disabled={props.disabled}>Less</button>
        <button className="More" onClick={props.ingAdd}>More</button>
    </div>
);

export default buildControl;