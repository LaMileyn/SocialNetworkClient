import React, {FC} from 'react';
import styles from './SettingsPage.module.scss';
import {Route,Routes,Outlet} from "react-router-dom";
import SettingsWelcome from "../SettingsWelcome/SettingsWelcome";
import SettingAccountInfo from "../SettingAccountInfo/SettingAccountInfo";


const SettingsPage : FC = (props) => {

    return (
        <section className={styles.settings}>
            <div className={styles.container}>
                <div className={styles.content}>
                    <Outlet/>
                    <Routes>
                        <Route index element={<SettingsWelcome/>}/>
                        <Route path={"general/account-info"} element={<SettingAccountInfo/>}/>
                        <Route path={"general/social-account"} element={<SettingAccountInfo/>}/>
                        <Route path={"account/cards"} element={<SettingAccountInfo/>}/>
                        <Route path={"account/password"} element={<SettingAccountInfo/>}/>
                        <Route path={"other/notification"} element={<SettingAccountInfo/>}/>
                        <Route path={"other/help"} element={<SettingAccountInfo/>}/>
                        <Route path={"other/logout"} element={<SettingAccountInfo/>}/>
                    </Routes>
                </div>
            </div>
        </section>
    );
}

export default SettingsPage;