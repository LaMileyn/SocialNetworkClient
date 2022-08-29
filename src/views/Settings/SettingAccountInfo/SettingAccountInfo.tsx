import React, {FC, useState} from 'react';
import styles from './SettingAccountInfo.module.scss';
import SettingsHeader from "../SettingsHeader/SettingsHeader";
import AccountInfoForm from "./AccountInfoForm/AccountInfoForm";
import {Alert, Avatar, Fade} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import PhotoChangeModal from "../../../components/layout/Modal/PhotoChangeModal/PhotoChangeModal";
import {UpdateUserModel} from "../../../models/user.model";
import {updateUser} from "../../../store/profile/profile.actions";
import ChangePhotoHover from "../../../components/layout/ChangePhotoHover/ChangePhotoHover";

const SettingAccountInfo: FC = (props) => {

    const dispatch = useAppDispatch()
    const [savedAnimation,setSavedAnimation] = useState<boolean>(false)
    const { user } = useAppSelector( state => state.auth)
    const [openChangeAvatar,setOpenChangeAvatar] = useState<boolean>(false)

    const handleChangeAvatar = async (file :string) => {
        const newOne: UpdateUserModel = {
            profilePicture: file
        }
        dispatch(updateUser(newOne))
        setOpenChangeAvatar(false)
    }

    return (
        <section className={styles.accountInfo}>
            <SettingsHeader headerTitle={"Account info"}/>
            <Fade in={savedAnimation} className={styles.changesSaving}>
                <Alert variant="filled" severity="success">
                    Changes saved!
                </Alert>
            </Fade>
            <div className={styles.content}>
                <div className={styles.user}>
                    <PhotoChangeModal headerText={"Profile photo change"}
                                      bodyTextConfirm={"The selected area will be displayed on your page. " +
                                          "If the image is oriented incorrectly, the photo can be rotated."}
                                      bodyTextWelcome={"It will be easier for friends to get to know you if you upload your real photo. " +
                                          "You can upload an image in JPG, GIF or PNG format."}
                                      open={openChangeAvatar} setOpen={setOpenChangeAvatar}
                                      onPhotoConfirm={handleChangeAvatar}/>
                    <div className={styles.user__avatar}>
                        <Avatar
                            sx={{ width : 150, height : 150}}
                            src={'/images/' + user?.userInfo?.profilePicture}/>
                        <ChangePhotoHover onClick={ () => setOpenChangeAvatar(true)}/>
                    </div>
                    <p onClick={ () => setOpenChangeAvatar(true)}>Change profile photo</p>
                </div>
                <div className={styles.form}>
                    <AccountInfoForm changeSavedAnimation={setSavedAnimation} savedAnimation={savedAnimation}/>
                </div>
            </div>
        </section>
    );
}

export default SettingAccountInfo;