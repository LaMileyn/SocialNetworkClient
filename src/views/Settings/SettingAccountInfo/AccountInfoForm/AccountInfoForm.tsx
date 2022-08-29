import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import styles from './AccountInfoForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {Button, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {updateUser} from "../../../../store/profile/profile.actions";
import {useNavigate} from "react-router-dom";


interface Inputs {
    email: string,
    username: string,
}
interface IProps {
    changeSavedAnimation : Dispatch<SetStateAction<boolean>>,
    savedAnimation : boolean
}

const AccountInfoForm: FC<IProps> = ({ changeSavedAnimation, savedAnimation }) => {

    const navigate = useNavigate()
    const dispatch = useAppDispatch();
    const {currentUser} = useAppSelector(state => state.settings)


    const {register, setError, handleSubmit, formState: {errors}} = useForm<Inputs>({
        defaultValues: {
            ...currentUser
        },
        mode: "onChange"
    })
    const onSubmit: SubmitHandler<Inputs> = async (data) =>{
        dispatch(updateUser(data))
        changeSavedAnimation(true)
        setTimeout( () =>{
            changeSavedAnimation(false)
        },3000)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.fieldWrapper}>
                <span className={styles.fieldName}>Username:</span>
                <TextField
                    id="standard-basic1"
                    {...register("username", {required: true, minLength : 2})}
                    error={Boolean(errors.username)}
                    helperText={errors.username?.type === "minLength" ? "Min length is 2 symbols"
                        : errors.username?.type === "required" && "Required"}
                    label="Username"
                    variant="standard"/>
            </div>
            <div className={styles.fieldWrapper}>
                <span className={styles.fieldName}>Email:</span>
                <TextField
                    id="standard-basic2"
                    {...register("email", {required: "Required" })}
                    label="Email" variant="standard"
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    type={"email"}/>
            </div>
            <div className={styles.buttonSubmit}>
                <Button type={"submit"} variant={"contained"}>Save changes</Button>
            </div>
        </form>
    );
}

export default AccountInfoForm;