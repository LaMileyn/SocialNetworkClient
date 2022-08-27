import React, {FC} from 'react';
import {Avatar, Box, Divider, IconButton, ListItemIcon, Menu, MenuItem, Switch, Tooltip} from "@mui/material";
import {setTheme} from "../../../../store/theme/theme.slice";
import {Logout, Settings} from "@mui/icons-material";
import {logout} from "../../../../store/auth/auth.actions";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import AppMenu from "../../Menu/AppMenu";

const HeaderProfileMenu: FC = (props) => {

    const {user} = useAppSelector(state => state.auth)
    const dispatch = useAppDispatch()
    const theme = useAppSelector(state => state.theme)


    return (
        <div>
            <AppMenu
                image={<Avatar sx={{width: 40, height: 40}} src={"/images/" + user?.userInfo?.profilePicture ?? ""}/>}
                title={"Account settings"}>
                <div>
                    <MenuItem sx={{color: "var(--color-text-main)"}}>
                        <Avatar src={"/images/" + user?.userInfo?.profilePicture}/> {user?.userInfo?.username}
                    </MenuItem>
                    <Divider/>
                    <MenuItem sx={{color: "var(--color-text-main)"}}>
                        <ListItemIcon sx={{color: "var(--color-text-main)"}}>
                            <Switch checked={theme === "dark"}
                                    onChange={() => dispatch(setTheme(theme === "dark" ? "light" : "dark"))}/>
                        </ListItemIcon>
                        Dark mode
                    </MenuItem>
                    <MenuItem sx={{color: "var(--color-text-main)"}}>
                        <ListItemIcon sx={{color: "var(--color-text-main)"}}>
                            <Settings fontSize="small"/>
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem sx={{color: "var(--color-text-main)"}} onClick={() => dispatch(logout())}>
                        <ListItemIcon sx={{color: "var(--color-text-main)"}}>
                            <Logout fontSize="small"/>
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </div>
            </AppMenu>
        </div>
    );
}


export default HeaderProfileMenu;