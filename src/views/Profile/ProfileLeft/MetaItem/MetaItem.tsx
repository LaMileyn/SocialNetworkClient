import React, {FC} from 'react';
import styles from './MetaItem.module.scss'
import {MetaProfileLeft} from "../Meta/Meta";


type IProps = MetaProfileLeft

const MetaItem: FC<IProps> = ({title, value}) => {
    return (
        <div className={styles.metaItem}>
            <span className={styles.metaTitle}>{title}</span>
            <span className={styles.metaValue}>{value}</span>
        </div>
    );
}

export default React.memo(MetaItem);