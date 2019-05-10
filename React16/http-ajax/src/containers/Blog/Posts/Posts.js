import React from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import FullPost from "../FullPost/FullPost";
import { Route } from "react-router-dom";
import "./Posts.css";

class Posts extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        // console.log(this.props)
        axios({
            method: "get",
            url: '/posts',
        })
        .then( response => {
            const posts = response.data.slice(0, 4);
            const updatedPosts = posts.map( post => {
                return {
                    ...post,
                    author: 'Max'
                }
            })
            this.setState({posts: updatedPosts})
        })
        .catch( error => {
            console.log(error);
            // this.setState({error: true})
        })
    }

    postSelectedHandler = (id) => {
        this.props.history.push("/posts/" + id)
    }


    render () {

        let posts = this.state.posts.map( post => {
            return (
                
                <Post 
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={ () => this.postSelectedHandler(post.id)}/>
                
            )
        })

        if(this.state.error) {
            posts = <p style={{textAlign: "center"}}>Something Went Wrong</p>
        }

        return (
            <React.Fragment>
                <section className="Posts">
                    {posts}
                </section>
                <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
            </React.Fragment>
                
            
        )
    }
}


export default Posts;