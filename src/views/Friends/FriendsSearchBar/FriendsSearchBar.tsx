import React, {FC} from 'react';
import styles from './FriendsSearchBar.module.scss'
import {SearchRounded} from "@mui/icons-material";

interface IProps {
    value : string,
    onChangeInput : ( value : string) => void
}

const FriendsSearchBar: FC<IProps> = ({value,onChangeInput }) => {
    return (
        <div className={styles.inputWrapper}>
            <input type="text"
                   placeholder={"Search for friends"}
                   value={value}
                   onChange={ (e) => onChangeInput(e.currentTarget.value)}/>
            <SearchRounded/>
        </div>
    );
}

export default FriendsSearchBar;