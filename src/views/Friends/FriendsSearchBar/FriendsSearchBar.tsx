import React, {FC} from 'react';
import styles from './FriendsSearchBar.module.scss'
import {CloseSharp, SearchRounded} from "@mui/icons-material";
import {IconButton} from "@mui/material";

interface IProps {
    value: string,
    onChangeInput: (value: string) => void,
    handleEnterClick? : (e : React.KeyboardEvent) => void;
}

const FriendsSearchBar: FC<IProps> = ({value, onChangeInput, handleEnterClick}) => {
    return (
        <div className={styles.inputWrapper}>
            <input type="text"
                   onKeyPress={ handleEnterClick ? handleEnterClick : undefined}
                   placeholder={"Search for friends"}
                   value={value}
                   onChange={(e) => onChangeInput(e.currentTarget.value)}/>

            {
                value.length === 0
                    ? <SearchRounded/>
                    : <IconButton onClick={ () => onChangeInput("")}>
                        <CloseSharp/>
                    </IconButton>
            }
        </div>
    );
}

export default FriendsSearchBar;