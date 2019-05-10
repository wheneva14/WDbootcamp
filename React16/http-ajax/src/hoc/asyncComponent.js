import React from "react";

function asyncComponent (ImportComponent) {
    return (props) => (
        <React.Suspense fallback={<div>LOADINGGGG</div>}>
            <ImportComponent {...props} />
        </React.Suspense>
    )
}


export default asyncComponent;