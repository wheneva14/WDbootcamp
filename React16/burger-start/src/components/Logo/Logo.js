import React from "react";
import burgerLogo from "../../assets/images/burger-logo.png";

const logo = (props) => (
    <div style={{
        backgroundColor: "white",
        padding: "8px",
        height: props.height ? props.height : "100%",
        boxSizing: "border-box",
        borderRadius: "5px"
    }}>
        <img 
            src={burgerLogo} 
            alt="logo"
            style={{
                height: "100%"
            }}/>
    </div>
)

export default logo;