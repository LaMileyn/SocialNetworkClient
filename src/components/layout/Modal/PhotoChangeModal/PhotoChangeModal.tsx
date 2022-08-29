import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import styles from './PhotoChangeModal.module.scss';
import BlockHeaderBorder from "../../BlockHeaderBorder/BlockHeaderBorder";
import {Button, IconButton} from "@mui/material";
import {Close} from "@mui/icons-material";
import AppModal from "../AppModal/AppModal";
import {useFile} from "../../../../utils/hooks";
import FullSectionLoader from "../../FullSectionLoader/FullSectionLoader";

interface IProps {
    headerText : string,
    bodyTextConfirm : string,
    bodyTextWelcome : string,
    open : boolean,
    setOpen : Dispatch<SetStateAction<boolean>>,
    onPhotoConfirm : (file : string) => Promise<void>
}
const PhotoChangeModal : FC<IProps> = ({ headerText, setOpen, open, onPhotoConfirm, bodyTextConfirm, bodyTextWelcome }) => {


    const [file, setFile] = useState<string>("")

    const [handleChangeFile, fileLoading, fileError] = useFile((data) => setFile(data))

    const handleConfirm = async () =>{
         await onPhotoConfirm(file)
         setFile("")
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
                            ? <span>{headerText}</span>
                            : <span>New photo loading</span>
                    }

                </BlockHeaderBorder>
                {
                    fileLoading
                        ? <FullSectionLoader size={"standart"}/>
                        : <div className={styles.text}>
                            {
                                file
                                    ? <p>{bodyTextConfirm}</p>
                                    : <p>{bodyTextWelcome}</p>
                            }
                            {file &&
                                <div className={styles.selectedPhoto}>
                                    <img src={`/images/${file}`} alt=""/>
                                </div>
                            }
                            {file
                                ? <div className={styles.activeButtons}>
                                    <Button variant={"contained"} onClick={handleConfirm}>Save and continue</Button>
                                    <Button variant={"contained"} onClick={ () => setFile("")}>Back</Button>
                                </div>
                                :
                                <Button variant={"contained"}>
                                    <label htmlFor={"filePickAvatar"} style ={{cursor : "pointer"}}>
                                        Choose file
                                        <input type="file" hidden id={"filePickAvatar"} onChange={handleChangeFile}/>
                                    </label>
                                </Button>


                            }
                        </div>
                }

            </div>
        </AppModal>
    );
}

export default PhotoChangeModal;