import React, {FC} from 'react';
import styles from './MessagesChatNoMessages.module.scss'

interface IProps {
}

const MessagesChatNoMessages: FC<IProps> = (props) => {
    return (
        <div className={styles.noMessages}>
        </div>
    );
}

export default MessagesChatNoMessages;