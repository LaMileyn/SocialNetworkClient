import React, {FC, useState} from 'react';
import styles from "../ProfilePage/ProfilePage.module.scss";
import {IUser} from "../../../models";
import PhotoChangeModal from "../../../components/layout/Modal/PhotoChangeModal/PhotoChangeModal";
import {useAppDispatch} from "../../../utils/hooks";
import {UpdateUserModel} from "../../../models/user.model";
import {updateUser} from "../../../store/profile/profile.actions";


interface IProps {
    profile : IUser
}


const ProfileBackground: FC<IProps> = ({ profile }) => {

    const [openedModal,setOpenedModal] = useState<boolean>(false)

    const dispatch = useAppDispatch();

    const handleChangeAvatar = async (file :string) => {
        const newOne: UpdateUserModel = {
             coverPicture : file
        }
        dispatch(updateUser(newOne))
        setOpenedModal(false)
    }

    return (
        <div className={styles.top} onClick={ () => setOpenedModal(true)} >
            { profile
                ? <img className={styles.top__background}  src={`/images/${profile.coverPicture}` || "https://i.ytimg.com/vi/Jzw9f774wag/maxresdefault.jpg"} alt=""/>
                : <img src="https://i.ytimg.com/vi/Jzw9f774wag/maxresdefault.jpg" alt=""/>
            }
            <div onClick={ (e) => e.stopPropagation()}>
                <PhotoChangeModal headerText={"Profile background change"}
                                  bodyTextConfirm={"The selected area will be displayed on your page. " +
                                      "If the image is oriented incorrectly, the photo can be rotated."}
                                  bodyTextWelcome={"It will be easier for friends to get to know you if you upload your real photo. " +
                                      "You can upload an image in JPG, GIF or PNG format."}
                                  open={openedModal} setOpen={setOpenedModal}
                                  onPhotoConfirm={handleChangeAvatar} isLargePhoto/>
            </div>

            <p className={styles.top__opacityText}>
              Change background
            </p>
        </div>
    );
}

export default ProfileBackground;