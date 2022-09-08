import React, {FC, useCallback, useState} from 'react';
import styles from './ProfileChangeAvatar.module.scss'
import PhotoChangeModal from "../../../components/layout/Modal/PhotoChangeModal/PhotoChangeModal";
import {Avatar} from "@mui/material";
import ChangePhotoHover from "../../../components/layout/ChangePhotoHover/ChangePhotoHover";
import {IUser, UpdateUserModel, UserDto} from "../../../models/user.model";
import {updateUser} from "../../../store/profile/profile.actions";
import {useAppDispatch} from "../../../utils/hooks";


interface IProps {
    profile: IUser,
    user : UserDto | null
}

const ProfileChangeAvatar: FC<IProps> = ({ profile, user }) => {

    const dispatch = useAppDispatch();
    const [openedModel, setOpenedModel] = useState<boolean>(false)

    const handleChangeAvatar = useCallback(async (file: string) => {
        const newOne: UpdateUserModel = {
            profilePicture: file
        }
        dispatch(updateUser(newOne))
        setOpenedModel(false)
    }, [])

    return (
        <div className={styles.avatar}>
            <PhotoChangeModal headerText={"Profile photo change"}
                              bodyTextConfirm={"The selected area will be displayed on your page. " +
                                  "If the image is oriented incorrectly, the photo can be rotated."}
                              bodyTextWelcome={"It will be easier for friends to get to know you if you upload your real photo. " +
                                  "You can upload an image in JPG, GIF or PNG format."}
                              open={openedModel} setOpen={setOpenedModel}
                              onPhotoConfirm={handleChangeAvatar}/>
            <Avatar
                src={"/images/" + profile.profilePicture}
                sx={{
                    width: 85,
                    height: 85
                }}/>
            {profile._id === user?.userInfo?._id &&
                <ChangePhotoHover onClick={() => setOpenedModel(true)}/>
            }
        </div>
    );
}

export default ProfileChangeAvatar;