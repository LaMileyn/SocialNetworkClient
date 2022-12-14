import React, {FC, useEffect, useState} from 'react';
import styles from './Post.module.scss';
import {Avatar, IconButton} from "@mui/material";
import {
    AccessAlarm, CheckCircleRounded, Comment,
    FavoriteRounded, RemoveRedEyeOutlined,
    SendOutlined
} from "@mui/icons-material";
import {IPost, IUser} from "../../../models";
import PostOptionsMenu from "./PostOptionsMenu/PostOptionsMenu";
import {Link} from "react-router-dom";
import ConfirmModal from "../Modal/ConfirmModal/ConfirmModal";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {deletePost, likePost} from "../../../store/posts/posts.actions";
import PostIcons from "./PostIcons/PostIcons";


interface IProps {
    post: IPost,
    isOwner: boolean
}

const Post: FC<IProps> = ({post, isOwner}) => {
    const dispatch = useAppDispatch();
    const {user} = useAppSelector(state => state.auth)
    const [modalDelete, setModalDelete] = useState<boolean>(false);
    const [modalUpdate, setModalUpdate] = useState<boolean>(false);

    const postDeleteHandler = () => {
        dispatch(deletePost(post._id))
    }
    return (
        <div className={styles.post}>
            <ConfirmModal open={modalDelete} text={"Are you sure you want to delete this post?"}
                          onConfirm={postDeleteHandler} setOpen={setModalDelete}/>
            <div className={styles.left}>
                <Link to={`/profile/${(post.user as IUser)._id}`}>
                    <Avatar
                        src={`/images/${(post.user as IUser).profilePicture}`}/>
                </Link>
            </div>
            <div className={styles.right}>
                <div className={styles.right__top}>
                    <div className={styles.right__userInfo}>
                        <Link to={`/profile/${(post.user as IUser)._id}`}>
                            <div className={styles.username}>{(post.user as IUser).username}</div>
                        </Link>
                        <CheckCircleRounded/>
                        <div className={styles.accountId}>@{(post.user as IUser)._id}</div>
                    </div>
                    <div className={styles.right__optionsAndTime}>
                        <div className={styles.right__timeCreated}>
                            <AccessAlarm sx={{
                                width: 20,
                                height: 20
                            }}/>
                            {post.createdAt.split("T")[0]}
                        </div>
                        {isOwner &&
                            <div className={styles.top__optionsMenu}>
                                <PostOptionsMenu post={post} openDeleteMenu={setModalDelete}
                                                 openUpdateMenu={setModalUpdate}/>
                            </div>
                        }

                    </div>

                </div>
                <div className={styles.right__mainContent}>
                    <p>{post.desc}</p>
                    {post.img &&
                        <div className={styles.photos}>
                            <img
                                src={"/images/" + post.img}/>
                        </div>
                    }
                </div>
                <PostIcons post={post} user={user}/>
            </div>
        </div>
    );
}

export default React.memo(Post);