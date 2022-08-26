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
import uploadService from "../../../services/upload.service";


interface IProps {
    profile: IUser
}

const ProfileLeft: FC<IProps> = ({profile}) => {

    const [file, setFile] = useState<string>("")

    const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            if (!event.target.files) return;
            const formData = new FormData();
            const file = event.target.files[0];
            formData.append("file", file);
            const {data} = await uploadService.sendToServer(formData)
            setFile(data)
        } catch (err) {
            console.warn(err)
        }
    }
    return (
        <div className={styles.profileLeft}>
            <div className={styles.profileLeft__top}>
                <div className={styles.profileArrow}>
                    <CheckCircleRounded/>
                </div>
                <div className={styles.user}>
                    <div className={styles.user__avatar}>
                        <Avatar
                            src={file
                                ? "/images/" + file
                                : "/images/" + profile.profilePicture ?? "https://kartinkin.net/uploads/posts/2021-07/1625762622_31-kartinkin-com-p-brutalnii-paren-art-art-krasivo-35.jpg"}
                            sx={{
                                width: 85,
                                height: 85
                            }}/>
                        <label htmlFor={"filer"} className={styles.changeAvatar}>
                            <PhotoCamera/>
                            <input type="file" id="filer" accept={".png,.jpeg,.jpg"} hidden
                                   onChange={handleChangeFile}/>
                        </label>
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
                        <span className={styles.meta__value}>124</span>
                    </div>
                    <div className={styles.meta__item}>
                        <span className={styles.meta__title}>Friends</span>
                        <span className={styles.meta__value}>{profile.followers.length}</span>
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
                    <div className={styles.square}>
                        <SettingsOutlined/>
                        Settings
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfileLeft;