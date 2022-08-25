import React, {FC} from 'react';
import styles from './Header.module.scss';
import {Link} from "react-router-dom";
import {
    Avatar,
    Box,
    Divider,
    Menu,
    Tooltip,
    MenuItem,
    ListItemIcon,
    FormControlLabel,
    styled,
    Switch
} from "@mui/material";
import {Logout, Notifications, SearchRounded, Settings} from "@mui/icons-material";
import {IconButton} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {logout} from "../../../store/auth/auth.actions";
import {setTheme} from "../../../store/theme/theme.slice";


const Header: FC = (props) => {
    const dispatch = useAppDispatch()
    const { user }  = useAppSelector( state => state.auth)
    const theme = useAppSelector( state => state.theme)
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div className={styles.header}>
            <div className={styles.container}>
                <div className={styles.extraLinks}>
                    <Link to={"/about"}>About</Link>
                    <Link to={"/help"}>Help</Link>
                </div>
                <div className={styles.search}>
                    <div className={styles.inputWrapper}>
                        <SearchRounded className={styles.iconSearch}/>
                        <input type="text" placeholder={"Search on social..."}/>
                    </div>
                </div>
                <div className={styles.userAndNotifications}>
                    <div className={styles.notifications}>
                        <IconButton className={styles.btnIcon}>
                            <Notifications className={styles.iconNotif}/>
                            <span className={styles.iconBadge}>4</span>
                        </IconButton>
                    </div>
                    <div className={styles.user}>
                        <span className={styles.user__name}>
                            Hey, <strong>{user?.userInfo?.username}</strong>
                        </span>
                        <span className={styles.user__avatar}>
                            <div>
                                <Box>
                                    <Tooltip title="Account settings">
                                        <IconButton
                                            onClick={handleClick}
                                            size="small"
                                            sx={{ml: 2}}
                                            aria-controls={open ? 'account-menu' : undefined}
                                            aria-haspopup="true"
                                            aria-expanded={open ? 'true' : undefined}
                                        >
                                            <Avatar sx={{width: 40, height: 40}}
                                                    src={"/images/"+user?.userInfo?.profilePicture ?? ""}/>
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                <Menu
                                    anchorEl={anchorEl}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleClose}
                                    onClick={handleClose}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: {
                                            overflow: 'visible',
                                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                                            backgroundColor: "var(--color-white)",
                                            mt: 1.5,
                                            '& .MuiAvatar-root': {
                                                width: 32,
                                                height: 32,
                                                ml: -0.5,
                                                mr: 1,
                                            },
                                            '&:before': {
                                                content: '""',
                                                display: 'block',
                                                position: 'absolute',
                                                top: 0,
                                                right: 14,
                                                width: 10,
                                                height: 10,
                                                bgcolor: 'var(--color-white)',
                                                transform: 'translateY(-50%) rotate(45deg)',
                                                zIndex: 0,
                                            },
                                        },
                                    }}
                                    transformOrigin={{horizontal: 'right', vertical: 'top'}}
                                    anchorOrigin={{horizontal: 'right', vertical: 'bottom'}}
                                >
                                    <MenuItem sx={{ color : "var(--color-text-main)"}}>
                                        <Avatar src={"/images/"+user?.userInfo?.profilePicture}/> {user?.userInfo?.username}
                                    </MenuItem>
                                    <Divider/>
                                    <MenuItem sx={{ color : "var(--color-text-main)"}}>
                                        <ListItemIcon sx={{ color : "var(--color-text-main)"}}>
                                            <Switch checked={theme === "dark"} onChange={ () => dispatch(setTheme( theme === "dark" ? "light" : "dark"))}/>
                                        </ListItemIcon>
                                        Dark mode
                                    </MenuItem>
                                    <MenuItem sx={{ color : "var(--color-text-main)"}}>
                                        <ListItemIcon sx={{ color : "var(--color-text-main)"}}>
                                            <Settings fontSize="small"/>
                                        </ListItemIcon>
                                        Settings
                                    </MenuItem>
                                    <MenuItem sx={{ color : "var(--color-text-main)"}} onClick ={ () => dispatch(logout())}>
                                        <ListItemIcon sx={{ color : "var(--color-text-main)"}}>
                                            <Logout fontSize="small"/>
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </div>
                    </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;