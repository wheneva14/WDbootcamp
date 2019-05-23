import React from "react";
import "./Layout.scss";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";
import { connect } from 'react-redux';

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
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                    isAuth={this.props.isAuth}/>
                <SideDrawer 
                    closed={this.sideDrawerClosedHandler} 
                    open={this.state.showSideDrawer}
                    isAuth={this.props.isAuth}/>
                <main className="Content">
                    {this.props.children}
                </main>
            </React.Fragment>
        )
    }
}
    
const mapStateToProps = state => {
    return {
        isAuth: Boolean(state.auth.token)
    }
}


export default connect(mapStateToProps)(Layout);