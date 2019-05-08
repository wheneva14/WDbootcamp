import React from "react";

const withClass = (className, WrappedComponent) => {
    return (props) => (
        <div className={className}>
            <WrappedComponent></WrappedComponent>
        </div>
    )
}

export default withClass;