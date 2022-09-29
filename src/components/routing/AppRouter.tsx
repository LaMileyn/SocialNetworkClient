import React, {FC} from 'react';
import {Route, Routes, Navigate} from "react-router-dom";
import HomePage from "../../views/Home/HomePage/HomePage";
import MessagesPage from "../../views/Messages/MessagesPage/MessagesPage";
import ProfilePage from "../../views/Profile/ProfilePage/ProfilePage";
import FriendsPage from "../../views/Friends/FriendsPage/FriendsPage";
import AuthPage from "../../views/Auth/AuthPage/AuthPage";
import MainLayout from "../layout/MainLayout/MainLayout";
import {RequireAuth} from "../../utils/hocs/RequiredAuth";
import NotFoundPage from "../../views/NotFound/NotFoundPage/NotFoundPage";
import SettingsPage from "../../views/Settings/SettingsPage/SettingsPage";
import FriendsMain from "../../views/Friends/FriendsMain/FriendsMain";
import FriendsRequests from "../../views/Friends/FriendsRequests/FriendsRequests";


const AppRouter: FC = (props) => {
    return (
        <Routes>
            <Route path="/login" element={<AuthPage/>}/>
            <Route path="/register" element={<AuthPage/>}/>
            <Route path="/" element={
                <RequireAuth>
                    <MainLayout/>
                </RequireAuth>
            }>
                <Route index element={<Navigate to={"/feed"}/>}/>
                <Route path="feed" element={<HomePage/>}/>
                <Route path="messages" element={<MessagesPage/>}/>
                <Route path="profile/">
                    <Route index element={<ProfilePage/>} />
                    <Route path=":id" element={<ProfilePage/>} />
                </Route>
                <Route path="friends/:id/" element={<FriendsPage/>}>
                   <Route index element={<FriendsMain/>}/>
                   <Route path="requests" element={<FriendsRequests/>}/>
                   <Route path="find" element={<div>Find friends</div>}/>
                </Route>
                <Route path="friends/" element={<FriendsPage/>}>
                    <Route index element={<FriendsMain/>}/>
                    <Route path="requests" element={<FriendsRequests/>}/>
                    <Route path="find" element={<div>Find friends</div>}/>
                </Route>
                <Route path="settings/*" element={<SettingsPage/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default AppRouter;