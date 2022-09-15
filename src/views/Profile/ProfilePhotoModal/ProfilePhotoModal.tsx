import React, {Dispatch, FC, SetStateAction, useRef, useState} from 'react';
import {Button, IconButton} from "@mui/material";
import BlockHeaderBorder from "../../../components/layout/BlockHeaderBorder/BlockHeaderBorder";
import {Close} from "@mui/icons-material";
import styles from './ProfilePhotoModal.module.scss'
import {useAppDispatch, useFile} from "../../../utils/hooks";
import {UpdateUserModel} from "../../../models/user.model";
import {updateUser} from "../../../store/profile/profile.actions";
import AppModal from "../../../components/layout/Modal/AppModal/AppModal";

interface IProps {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>
}

const ProfilePhotoModal: FC<IProps> = ({open, setOpen}) => {

    const dispatch = useAppDispatch();

    const [file, setFile] = useState<string>("")

    const [handleChangeFile, fileLoading, fileError] = useFile((data) => setFile(data))


    const handleChangeAvatar = async () => {
        const newOne: UpdateUserModel = {
            profilePicture: file
        }
        dispatch(updateUser(newOne))
        setFile("")
        setOpen(false)
    }


    return (
        <AppModal open={open} setOpen={setOpen}>
            <div className={styles.content}>
                <BlockHeaderBorder icon={
                    <IconButton>
                        <Close style={{color: "var(--color-text-main)"}} onClick={() => setOpen(false)}/>
                    </IconButton>
                }>
                    {
                        file
                            ? <span>Photo on your page</span>
                            : <span>New photo loading</span>
                    }

                </BlockHeaderBorder>
                <div className={styles.text}>
                    {
                        file
                            ? <p>The selected area will be displayed on your page.
                                If the image is oriented incorrectly, the photo can be rotated.</p>
                            : <p>It will be easier for friends to get to know you if you upload your real photo.
                                You can upload an image in JPG, GIF or PNG format.</p>
                    }
                    {
                        file &&
                        <div className={styles.selectedPhoto}>
                            <img src={`/images/${file}`} alt=""/>
                        </div>
                    }
                    {
                        file
                            ? <div className={styles.activeButtons}>
                                <Button variant={"contained"} onClick={handleChangeAvatar}>Save and continue</Button>
                                <Button variant={"contained"} onClick={() => setFile("")}>Back</Button>
                            </div>
                            :
                            <Button variant={"contained"}>
                                <label htmlFor={"filePickAvatar"} style={{cursor: "pointer"}}>
                                    Choose file
                                    <input type="file" hidden id={"filePickAvatar"} onChange={handleChangeFile}/>
                                </label>
                            </Button>
                    }
                </div>
            </div>
        </AppModal>
    );
}

export default ProfilePhotoModal;