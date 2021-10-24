import React from "react";
import s from './MyPosts.module.css'
import Posts from "./Post/Posts";
import {Button} from "@mui/material";
import {addPostActionCreator, updateNewPostTextActionCreator} from "../../../redux/profile-reducer";




const MyPosts = (props) => {

    let postsElements = props.posts
        .map(p => <Posts message={p.message} countsLike={p.countsLike}/>)

    let newPostElement = React.createRef();

    let addPost = () => {
        //props.addPost();
        props.dispatch(addPostActionCreator());
    }

    let onPostChange =() => {
        let text = newPostElement.current.value;
        //props.updateNewPostText(text);
        props.dispatch(updateNewPostTextActionCreator(text));
    }

    return <div className={s.postsBlock}>
        <h3>My Posts</h3>
        <div>
            <div>
                <textarea onChange={onPostChange}
                          ref={newPostElement}
                          value={props.newPostText}
                          placeholder="Add new post"/>
            </div>
            <div>
                <Button variant="contained" color="success" onClick={addPost}>
                    Add Post
                </Button>
            </div>
        </div>
        <div className={s.posts}>
            {postsElements}
        </div>
    </div>
}
export default MyPosts;