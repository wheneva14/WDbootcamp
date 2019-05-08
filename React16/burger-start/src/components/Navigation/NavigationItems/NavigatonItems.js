import React from "react";
import "./NavigationItems.scss";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = () => (
    <ul className="NavigationItems">
        <NavigationItem
            link="/"
            active
            >Burger Builder</NavigationItem>
        <NavigationItem
            link="/"
            >Check Out</NavigationItem>
    </ul>
)

export default navigationItems;