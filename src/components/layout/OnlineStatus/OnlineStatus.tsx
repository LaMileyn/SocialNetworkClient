import React, {FC} from 'react';
import cn from "classnames";
import styles from './OnlineStatus.module.scss'


interface IProps extends React.HTMLProps<HTMLSpanElement>{
    isPersonOnline : boolean
}

const OnlineStatus: FC<IProps> = ({ isPersonOnline }) => {
    return (
        <span className={cn(styles.circleStatus, {
            [styles.online] : isPersonOnline,
            [styles.offline] : !isPersonOnline,
        })}></span>
    );
}

export default OnlineStatus;