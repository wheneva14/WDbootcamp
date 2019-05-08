import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.scss";

const controls = [
    {label: "Salad", type: "salad"},
    {label: "Bacon", type: "bacon"},
    {label: "Cheese", type: "cheese"},
    {label: "Meat", type: "meat"},
];

const buildControls = (props) => (
    <div className="BuildControls">
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( ctrl => (
            <BuildControl 
                key={ctrl.label} 
                label={ctrl.label}
                ingAdd={() => props.ingAdd(ctrl.type)}
                ingRemove={() => props.ingRemove(ctrl.type)}
                disabled={props.disabled[ctrl.type]}/>
        ))}
        <button className="OrderButton" disabled={!props.purchasable} onClick={props.ordered}>ORDER NOW</button>
    </div>
);

export default buildControls;