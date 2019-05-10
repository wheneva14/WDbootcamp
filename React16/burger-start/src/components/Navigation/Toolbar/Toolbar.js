import React from "react";
import "./Toolbar.scss";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigatonItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";

const toolbar = (props) => (
    <header className="Toolbar">
        <DrawerToggle
            clicked={props.drawerToggleClicked}/>
        <Logo height="80%"/>
        <nav className="DesktopOnly">
            <NavigationItems/>
        </nav>
    </header>
)

export default toolbar;