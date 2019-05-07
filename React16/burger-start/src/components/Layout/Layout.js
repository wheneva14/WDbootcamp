import React from "react";
import "./Layout.scss";

const layout = (props) => (
    <React.Fragment>
        <div>Toolbar, side, backdrop</div>
        <main className="Content">
            {props.children}
        </main>
    </React.Fragment>
    
)

export default layout;