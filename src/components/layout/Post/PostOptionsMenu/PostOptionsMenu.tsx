import React, {Dispatch, FC, SetStateAction} from 'react';
import {Avatar, Divider, IconButton, ListItemIcon, MenuItem, Switch} from "@mui/material";
import {DeleteOutline, Logout, MoreVert, Settings, UpdateOutlined} from "@mui/icons-material";
import AppMenu from "../../Menu/AppMenu";
import {useAppDispatch} from "../../../../utils/hooks";
import {IPost} from "../../../../models";

interface IProps {
    post : IPost,
    openDeleteMenu : Dispatch<SetStateAction<boolean>>
    openUpdateMenu : Dispatch<SetStateAction<boolean>>
}
const PostOptionsMenu : FC<IProps> = ({ post, openDeleteMenu, openUpdateMenu }) => {

    const dispatch = useAppDispatch();

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
                        Update
                    </MenuItem>
                    <Divider/>
                    <MenuItem sx={{color: "var(--color-text-main)"}} onClick ={() => openDeleteMenu(true)}>
                        <ListItemIcon sx={{color: "var(--color-red-low)"}} >
                            <DeleteOutline fontSize="small"/>
                        </ListItemIcon>
                        Delete
                    </MenuItem>
                </div>
            </AppMenu>
        </div>
    );
}

export default PostOptionsMenu;