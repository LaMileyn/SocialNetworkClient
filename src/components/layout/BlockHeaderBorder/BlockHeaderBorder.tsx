import React, {FC} from 'react';
import styles from './BlockHeaderBorder.module.scss'
import {IconButton} from "@mui/material";

interface IProps extends React.HTMLProps<HTMLDivElement> {
    icon?: JSX.Element,
    children: JSX.Element | string
}

const BlockHeaderBorder: FC<IProps> = ({children, icon, ...props}) => {
    return (
        <div className={styles.header} {...props}>
            {children}
            {icon}
        </div>
    );
}

export default BlockHeaderBorder;