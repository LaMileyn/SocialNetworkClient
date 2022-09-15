import React, {FC} from 'react';
import {ISquare} from "../Squares/Squares";
import styles from "./SquaresItem.module.scss"

type IProps = ISquare

const SquaresItem: FC<IProps> = ({ icon, text, onClick}) => {
    return (
        <div className={styles.square} onClick={onClick}>
            { icon }
            { text }
        </div>
    );
}

export default SquaresItem;