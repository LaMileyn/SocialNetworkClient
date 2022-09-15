import React, {FC} from 'react';
import styles from "./SharePostBottom.module.scss";
import {EmojiEmotionsOutlined, PermMedia, Tag} from "@mui/icons-material";


interface IProps {
    handleChangeFile : (event: React.ChangeEvent<HTMLInputElement>) => void
}

const SharePostBottom: FC<IProps> = ({ handleChangeFile }) => {
    return (
        <div className={styles.bottom}>
            <div className={styles.bottom__button}>
                <label className={styles.option} htmlFor={"filer"}>
                    <PermMedia htmlColor={"tomato"} className={styles.shareIcon}/>
                    <span className={styles.options__text}>Фото или Видео</span>
                    <input type="file" id="filer" accept={".png,.jpeg,.jpg,.gif"} hidden
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

    );
}

export default SharePostBottom;