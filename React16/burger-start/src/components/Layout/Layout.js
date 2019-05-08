import React from "react";
import "./Layout.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

class Layout extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showSideDrawer: false
        }
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSideDrawer: false})
    }

    sideDrawerToggleHandler = () => {
        this.setState( prevState => ({
            showSideDrawer : !prevState.showSideDrawer,
        }))
    }
    render() {
        return (
            <React.Fragment>
                <Toolbar 
                    drawerToggleClicked={this.sideDrawerToggleHandler}/>
                <SideDrawer closed={this.sideDrawerClosedHandler} open={this.state.showSideDrawer}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
    
    


export default Layout;