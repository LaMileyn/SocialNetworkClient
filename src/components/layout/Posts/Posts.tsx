import React, {FC, useEffect, useState} from 'react';
import styles from './Posts.module.scss'
import Post from "../Post/Post";
import {useAppDispatch, useAppSelector, useFetching} from "../../../utils/hooks";
import {IPost, IUser} from "../../../models";
import postService from "../../../services/post-service";
import FullSectionLoader from "../FullSectionLoader/FullSectionLoader";
import SharePost from "../SharePost/SharePost";
import {getPosts} from "../../../store/posts/posts.actions";
import {TransitionGroup} from "react-transition-group";
import {Collapse} from "@mui/material";


interface IProps {
    userId?: string
}

const Posts: FC<IProps> = ({userId}) => {

    const dispatch = useAppDispatch();

    const {posts, fetching} = useAppSelector(state => state.posts)
    const {user} = useAppSelector(state => state.auth)

    useEffect(() => {
        userId
            ? dispatch(getPosts(userId))
            : dispatch(getPosts())

    }, [user])

    if (fetching && !posts.length) return <FullSectionLoader/>
    return (
        <div className={styles.posts}>
            {
                posts.length === 0 && <div className={styles.empty}>
                    <p>No posts found yet..</p>
                </div>
            }
            <TransitionGroup>
                {
                    posts.map((post) => (
                        <Collapse key={post._id}>
                            <div className={styles.post}>
                                <Post post={post} isOwner={(post.user as IUser)._id === user?.userInfo._id}/>
                            </div>
                        </Collapse>
                    ))
                }
            </TransitionGroup>
        </div>
    );
}

export default Posts;