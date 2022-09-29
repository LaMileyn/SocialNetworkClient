import React, {Dispatch, FC, SetStateAction} from 'react';
import cn from "classnames";
import styles from "../Tabs.module.scss";
import {ITab} from "../Tabs";


interface IProps{
    tab : ITab,
    setActiveTab : Dispatch<SetStateAction<string>>,
    activeTab : string
}

const Tab: FC<IProps> = ({ tab : { tabText, value, secondaryText }, setActiveTab, activeTab }) => {
    return (
        <li className={cn(styles.tab,{
            [styles.activeTab] : value == activeTab
        })} onClick={ () => {
            setActiveTab(value)
        }}>
            <span className={styles.tab__mainText}>{tabText}</span>
            <span className={styles.tab__secondaryText}>{secondaryText}</span>
        </li>
    );
}

export default Tab;