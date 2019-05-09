import React, { Component } from 'react';
// import axios from "axios";
import axios from "../../axios";

import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';


class Blog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
            selectedPostId : null,
            error : false
        }
    }

    componentDidMount() {
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
            this.setState({error: true})
        })
    }

    postSelectedHandler = (id) => {
        this.setState({selectedPostId: id})
    }

    render () {
        let posts = this.state.posts.map( post => {
            return (
                <Post 
                    title={post.title}
                    key={post.id}
                    author={post.author}
                    clicked={ () => this.postSelectedHandler(post.id)}/>
            )
        })
        if(this.state.error) {
            posts = <p style={{textAlign: "center"}}>Something Went Wrong</p>
        }
        return (
            <div>
                <section className="Posts">
                    {posts}
                </section>
                <section>
                    <FullPost 
                        id={this.state.selectedPostId}/>
                </section>
                <section>
                    <NewPost />
                </section>
            </div>
        );
    }
}

export default Blog;