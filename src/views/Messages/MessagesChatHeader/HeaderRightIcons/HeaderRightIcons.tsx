import React, {FC} from 'react';
import {IconButton} from "@mui/material";
import {MoreHoriz, Phone, SearchRounded} from "@mui/icons-material";


interface IProps {
}

const HeaderRightIcons: FC<IProps> = (props) => {
    return (
        <div>
            <IconButton>
                <Phone/>
            </IconButton>
            <IconButton>
                <SearchRounded/>
            </IconButton>
            <IconButton>
                <MoreHoriz/>
            </IconButton>
        </div>
    )
        ;
}

export default HeaderRightIcons;