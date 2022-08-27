import React, {FC, useEffect, useState} from 'react';
import styles from './Posts.module.scss'
import Post from "../Post/Post";
import {useAppSelector, useFetching} from "../../../utils/hooks";
import {IPost} from "../../../models";
import postService from "../../../services/post-service";
import FullSectionLoader from "../FullSectionLoader/FullSectionLoader";
import SharePost from "../SharePost/SharePost";


interface IProps {
    userId?: string
}

const Posts: FC<IProps> = ({userId}) => {

    const [posts, setPosts] = useState<IPost[]>([]);
    const {user} = useAppSelector(state => state.auth)
    const [fetchPosts, fetching, error] = useFetching(async () => {
        let {data} = userId
            ? await postService.getUserPosts(userId)
            : await postService.getTimeLine()
        setPosts((data as IPost[]).filter(el => el))
    })
    useEffect(() => {
        fetchPosts()
    }, [user])

    if (fetching) return <FullSectionLoader/>
    return (
        <div className={styles.posts}>
            {
                posts.length === 0 && <div className={styles.empty}>
                    <p>No posts found yet..</p>
                </div>
            }
            {
                posts.map((post) => (
                    <div key={post._id} className={styles.post}>
                        <Post post={post}/>
                    </div>
                ))
            }
        </div>
    );
}

export default Posts;