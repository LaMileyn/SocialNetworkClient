import React, {FC, useEffect} from 'react';
import styles from './SettingsPage.module.scss';
import {Route,Routes,Outlet} from "react-router-dom";
import SettingsWelcome from "../SettingsWelcome/SettingsWelcome";
import SettingAccountInfo from "../SettingAccountInfo/SettingAccountInfo";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {getCurrentUser} from "../../../store/settings/settings.actions";
import FullSectionLoader from "../../../components/layout/FullSectionLoader/FullSectionLoader";


const SettingsPage : FC = (props) => {
    const dispatch = useAppDispatch()
    const { fetching } = useAppSelector( state => state.settings)
    const { currentUser } = useAppSelector( state => state.settings)
    const { user } = useAppSelector( state => state.auth )
    useEffect( () =>{
        if (user?.userInfo.id === currentUser?._id) return;
        dispatch(getCurrentUser(user!.userInfo!.id))
    },[user,currentUser])

    if (fetching) return <FullSectionLoader size={"large"}/>
    return (
        <section className={styles.settings}>
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
        </section>
    );
}

export default SettingsPage;