import React, {Dispatch, FC, SetStateAction} from 'react';
import {Avatar, Divider, IconButton, ListItemIcon, MenuItem, Switch} from "@mui/material";
import {DeleteOutline, Logout, MoreVert, Settings, UpdateOutlined} from "@mui/icons-material";
import AppMenu from "../../../../../components/layout/Menu/AppMenu";
import {useAppDispatch} from "../../../../../utils/hooks";


interface IProps {
    openDeleteMenu : Dispatch<SetStateAction<boolean>>
    openUpdateMenu : Dispatch<SetStateAction<boolean>>
}
const FriendRowActionMenu : FC<IProps> = ({ openDeleteMenu, openUpdateMenu }) => {

    const dispatch = useAppDispatch()

    return (
        <div>
            <AppMenu
                image={
                    <MoreVert style={{color : "var(--color-primary)"}}/>
                }
                title={"Post settings"}>
                <div>
                    <MenuItem sx={{color: "var(--color-text-main)", width: 190}}>
                        <ListItemIcon sx={{color: "var(--color-text-main)"}}>
                            <UpdateOutlined fontSize="small"/>
                        </ListItemIcon>
                        Check friends
                    </MenuItem>
                    <Divider/>
                    <MenuItem sx={{color: "var(--color-text-main)"}} onClick ={() => openDeleteMenu(true)}>
                        <ListItemIcon sx={{color: "var(--color-red-low)"}} >
                            <DeleteOutline fontSize="small"/>
                        </ListItemIcon>
                        Delete from friends
                    </MenuItem>
                </div>
            </AppMenu>
        </div>
    );
}

export default FriendRowActionMenu