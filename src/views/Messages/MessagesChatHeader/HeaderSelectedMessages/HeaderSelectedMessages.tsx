import React, {FC} from 'react';
import {Button} from "@mui/material";
import {useAppDispatch} from "../../../../utils/hooks";
import {clearSelectedMessages} from "../../../../store/chat/chat.slice";
import {CloseOutlined} from "@mui/icons-material";
import styles from './HeaderSelectedMessages.module.scss';


interface IProps {
    countSelected: number
}

const HeaderSelectedMessages: FC<IProps> = ({countSelected}) => {
    const dispatch = useAppDispatch();
    return (
        <div className={styles.content}>
            <div className={styles.left}>
                <Button
                    onClick={() => dispatch(clearSelectedMessages())}
                    variant={"outlined"}
                    endIcon={<CloseOutlined/>}>{countSelected} сообщений</Button>
            </div>
            <div className={styles.right}></div>

        </div>
    );
}

export default HeaderSelectedMessages;