import React, {FC, useState} from 'react';
import styles from './ProfileLeft.module.scss';
import {Avatar} from "@mui/material";
import {
    CameraAltOutlined,
    CheckCircleRounded,
    GroupOutlined,
    LocationOnOutlined,
    MusicNoteOutlined, PhotoCamera,
    SettingsOutlined
} from "@mui/icons-material";
import {IUser} from "../../../models";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import PhotoChangeModal from "../../../components/layout/Modal/PhotoChangeModal/PhotoChangeModal";
import {UpdateUserModel} from "../../../models/user.model";
import {updateUser} from "../../../store/profile/profile.actions";
import ChangePhotoHover from "../../../components/layout/ChangePhotoHover/ChangePhotoHover";


interface IProps {
    profile: IUser
}

const ProfileLeft: FC<IProps> = ({profile}) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector( state => state.auth)
    const [openedModel, setOpenedModel] = useState<boolean>(false)

    const handleChangeAvatar = async (file :string) => {
        const newOne: UpdateUserModel = {
            profilePicture: file
        }
        dispatch(updateUser(newOne))
        setOpenedModel(false)
    }


    return (
        <div className={styles.profileLeft}>
            <div className={styles.profileLeft__top}>
                <div className={styles.profileArrow}>
                    <CheckCircleRounded/>
                </div>
                <div className={styles.user}>
                    <div className={styles.user__avatar}>
                        <PhotoChangeModal  headerText={"Profile photo change"}
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
                        {   profile._id === user?.userInfo?.id &&
                            <ChangePhotoHover onClick={ () => setOpenedModel(true)}/>
                        }
                    </div>
                    <span className={styles.user__fullName}>{profile.username}</span>
                    <span className={styles.user__url}>@{profile._id}</span>
                    <span className={styles.user__location}>
                    <LocationOnOutlined/>
                    New York, USA
                </span>
                    <span className={styles.user__status}>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae culpa ea earum,
                    enim facilis fuga ratione voluptatibus? Autem impedit porro quae voluptatem voluptatum.
                </span>
                </div>
                <div className={styles.meta}>
                    <div className={styles.meta__item}>
                        <span className={styles.meta__title}>Posts</span>
                        <span className={styles.meta__value}>{profile.posts.length}</span>
                    </div>
                    <div className={styles.meta__item}>
                        <span className={styles.meta__title}>Friends</span>
                        <span className={styles.meta__value}>{profile?.followers.length}</span>
                    </div>
                    <div className={styles.meta__item}>
                        <span className={styles.meta__title}>Music</span>
                        <span className={styles.meta__value}>3456</span>
                    </div>
                </div>
            </div>
            <div className={styles.profileLeft__bottom}>
                <div className={styles.bottomSquares}>
                    <div className={styles.square}>
                        <GroupOutlined/>
                        Friends
                    </div>
                    <div className={styles.square}>
                        <MusicNoteOutlined/>
                        Music
                    </div>
                    <div className={styles.square}>
                        <CameraAltOutlined/>
                        Photos
                    </div>
                    {
                        profile._id === user?.userInfo?.id &&
                        <div className={styles.square}>
                            <SettingsOutlined/>
                            Settings
                        </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default ProfileLeft;