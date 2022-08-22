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
                <Route path="profile/:id/" element={<ProfilePage/>}/>
                <Route path="profile/">
                    <Route index element={<ProfilePage/>} />
                    <Route path=":id" element={<ProfilePage/>} />
                </Route>
                <Route path="friends/:id/*" element={<FriendsPage/>}/>
            </Route>
            <Route path="*" element={<NotFoundPage/>}/>
        </Routes>
    );
}

export default AppRouter;