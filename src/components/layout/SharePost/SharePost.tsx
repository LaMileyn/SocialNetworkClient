import React, {FC, useState} from 'react';
import styles from './SharePost.module.scss';
import {Avatar, Button} from "@mui/material";
import {useAppDispatch, useAppSelector, useFile} from "../../../utils/hooks";
import {
    CloseSharp,
    EmojiEmotionsOutlined,
    PermMedia,  Tag,

} from "@mui/icons-material";

import cn from "classnames";
import {PostCreateModel} from "../../../models";
import {createNewPost} from "../../../store/posts/posts.actions";
import {Link} from "react-router-dom";
import FullSectionLoader from "../FullSectionLoader/FullSectionLoader";

const SharePost: FC = (props) => {
    const dispatch = useAppDispatch();

    const {user} = useAppSelector(state => state.auth)


    const [postText, setPostText] = useState<string>("")
    const [handleChangeFile,loading,error] = useFile( (data) => setFile(data))
    const [file, setFile] = useState<string | null>(null);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        const newPost: PostCreateModel = {
            user: user!.userInfo.id,
            desc: postText
        }
        if (file) newPost.img = file
        dispatch(createNewPost(newPost))
        setFile(null)
        setPostText("");
        setFile(null)
    }


    return (
        <div className={styles.share}>
            <div className={styles.top}>
                <Link to={`/profile/${user?.userInfo.id}`}>
                    <Avatar src={"/images/" + user?.userInfo.profilePicture}/>
                </Link>
                <div className={styles.inputWrapper}>
                    <textarea value={postText}
                              onChange={(event) => setPostText(event.currentTarget.value)}
                              placeholder={"What`s on your mind, " + user?.userInfo.username + " ?"}
                              onKeyPress={ event => event.code === "Enter" && handleSubmit(event)}
                    />
                </div>
                <Button
                    onClick={handleSubmit}
                    type={"submit"}
                    className={cn({
                        [styles.active]: postText.length || file
                    })} variant={"contained"} sx={{bgcolor: "var(--color-primary)"}}>Create</Button>
            </div>

            {   loading
                ? <FullSectionLoader size={"small"} />
                : file && <div className={styles.photo}>
                    <img src={`/images/${file}`} alt=""/>
                    <div className={styles.exitFile} onClick={() => setFile(null)}>
                        <p>Прикреплено 1 фото</p>
                        <CloseSharp/>
                    </div>
                </div>
            }
            <div className={styles.bottom}>
                <div className={styles.bottom__button}>
                    <label className={styles.option} htmlFor={"filer"}>
                        <PermMedia htmlColor={"tomato"} className={styles.shareIcon}/>
                        <span className={styles.options__text}>Фото или Видео</span>
                        <input type="file" id="filer" accept={".png,.jpeg,.jpg"} hidden
                               onChange={handleChangeFile}/>
                    </label>
                </div>
                <div className={styles.bottom__button}>
                    <label className={styles.option} htmlFor={"filer"}>
                        <Tag htmlColor={"var(--color-primary)"} className={styles.shareIcon}/>
                        <span className={styles.options__text}>Tag Friends</span>
                        <input type="file" id="filer" accept={".png,.jpeg,.jpg"} hidden
                               onChange={handleChangeFile}/>
                    </label>
                </div>
                <div className={styles.bottom__button}>
                    <label className={styles.option} htmlFor={"filer"}>
                        <EmojiEmotionsOutlined htmlColor={"yellow"} className={styles.shareIcon}/>
                        <span className={styles.options__text}>Feeling/Activity</span>
                        <input type="file" id="filer" accept={".png,.jpeg,.jpg"} hidden
                               onChange={handleChangeFile}/>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default SharePost;