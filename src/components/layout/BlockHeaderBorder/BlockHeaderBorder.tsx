import React, {FC} from 'react';
import styles from './BlockHeaderBorder.module.scss'
import {IconButton} from "@mui/material";

interface IProps {
    icon?: JSX.Element,
    children: JSX.Element | string
}

const BlockHeaderBorder: FC<IProps> = ({children, icon}) => {
    return (
        <div className={styles.header}>
            {children}
            <IconButton>
                {icon}
            </IconButton>
        </div>
    );
}

export default BlockHeaderBorder;