import React, { FC } from 'react';
import styles from './ChangePhotoHover.module.scss';
import {PhotoCamera} from "@mui/icons-material";

interface IProps{
    onClick : () => void
}
const ChangePhotoHover : FC<IProps> = ({ onClick : click}) => {
    return (
        <div className={styles.changeAvatar} onClick={click}>
            <PhotoCamera/>
        </div>
    );
}

export default ChangePhotoHover;