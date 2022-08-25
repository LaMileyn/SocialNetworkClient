import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from './Tabs.module.scss';
import cn from "classnames"

export interface ITab {
    tabText : string,
    secondaryText? : string,
    value : "all" | "fixed"

}
interface IProps {
    tabList : ITab[],
    activeTab : "all" | "fixed",
    setActiveTab : Dispatch<SetStateAction<"all" | "fixed">>

}
const Tabs : FC<IProps> = ({tabList,activeTab,setActiveTab}) => {
    return (
        <ul className={styles.tabs}>
            {tabList.map( tab =>{
                return (
                    <li className={cn(styles.tab,{
                        [styles.activeTab] : tab.value == activeTab
                    })} onClick={ () => {
                        setActiveTab(tab.value)
                    }}>
                        <span className={styles.tab__mainText}>{tab.tabText}</span>
                        <span className={styles.tab__secondaryText}>{tab.secondaryText}</span>
                    </li>
                )
            })}
        </ul>
    );
}

export default Tabs;