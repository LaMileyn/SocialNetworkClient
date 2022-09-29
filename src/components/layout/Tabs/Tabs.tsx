import React, {Dispatch, FC, SetStateAction} from 'react';
import styles from './Tabs.module.scss';
import Tab from "./Tab/Tab";

export interface ITab {
    tabText : string,
    secondaryText? : string,
    value : string

}
interface IProps {
    tabList : ITab[],
    activeTab : string,
    setActiveTab : Dispatch<SetStateAction<string>>

}
const Tabs : FC<IProps> = ({tabList,activeTab,setActiveTab}) => {
    return (
        <ul className={styles.tabs}>
            {tabList.map( tab =>{
                return <Tab key={tab.tabText} tab={tab} setActiveTab={setActiveTab} activeTab={activeTab} />
            })}
        </ul>
    );
}

export default Tabs;