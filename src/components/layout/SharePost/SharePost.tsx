import React, {FC, useState} from 'react';
import styles from './SharePost.module.scss';
import {Avatar, Button, IconButton} from "@mui/material";
import {useAppSelector, useFetching} from "../../../utils/hooks";
import {
    CloseSharp,
    EmojiEmotionsOutlined,
    PermMedia, Person, Tag,

} from "@mui/icons-material";
import postService from "../../../services/post-service";
import cn from "classnames";
import uploadService from "../../../services/upload.service";
import FullSectionLoader from "../FullSectionLoader/FullSectionLoader";

const SharePost: FC = (props) => {
    const {user} = useAppSelector(state => state.auth)
    const [postText, setPostText] = useState<string>("")
    const [file, setFile] = useState<string | null>(null);
    const [fileFetch, isLoading, error] = useFetching(() => handleChangeFile)

    const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            const formData = new FormData();
            if (!event.target.files) return;
            const file = event.target.files[0];
            formData.append("file", file);
            const {data} = await uploadService.sendToServer(formData)
            setFile(data)
        } catch (err) {
            console.warn(err)
        }
    }
    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const newPost = {
    //         user: user.userInfo.id,
    //         desc: description
    //     }
    //     if (file) newPost.img = file
    //     try {
    //         const {data} = await postService.createPost(newPost);
    //         data.user = user.userInfo;
    //         pushNewPost(data)
    //         setFile(null)
    //         setDescribtion("")
    //     } catch (err) {
    //         console.log(err)
    //     }
    //
    // }


    return (
        <div className={styles.share}>
            <div className={styles.top}>
                <Avatar src={""}/>
                <div className={styles.inputWrapper}>
                    <input value={postText} onChange={(event) => setPostText(event.currentTarget.value)} type="text"
                           placeholder={"What`s on your mind, " + user?.userInfo.username + " ?"}/>
                </div>
                <Button
                    onClick={fileFetch}
                    className={cn({
                        [styles.active]: postText.length || file
                    })} variant={"contained"} sx={{bgcolor: "var(--color-primary)"}}>Create</Button>
            </div>

            {
                isLoading
                    ? <FullSectionLoader size={"small"}/>
                    : file && <div className={styles.photo}>
                    <img src={`/images/${file}`} alt=""/>
                    <div className={styles.exitFile} onClick={ () => setFile(null)}>
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