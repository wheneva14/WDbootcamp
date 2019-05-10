import React, { Component } from 'react';
import { Route, NavLink, Switch, Redirect } from "react-router-dom";

import Posts from "./Posts/Posts";
import FullPost from "./FullPost/FullPost";
// import NewPost from "./NewPost/NewPost"
import asyncComponent from "../../hoc/asyncComponent";
import './Blog.css';



const NewPost = React.lazy( () => import("./NewPost/NewPost"));



class Blog extends Component {
   
    state = {
        auth: false,
    }

    render () {
        
        
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li>
                                <NavLink 
                                    to="/posts" 
                                    exact>Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink 
                                    to="/new-post">New Post
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                </header>
                <Switch>
                    <Route path="/new-post" component={asyncComponent(NewPost)} />
                    <Route path="/posts" component={Posts} />
                    <Redirect to="posts" />
                    {/* <Redirect from="/" to="/posts" /> */}
                </Switch>
                {/* <Route path="/" render={ () => <Posts/>} /> */}
                
                
            </div>
        );
    }
}

export default Blog;