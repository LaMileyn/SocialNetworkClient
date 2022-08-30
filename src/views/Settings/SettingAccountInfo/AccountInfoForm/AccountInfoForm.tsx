import React, {Dispatch, FC, SetStateAction, useState} from 'react';
import styles from './AccountInfoForm.module.scss';
import {SubmitHandler, useForm} from "react-hook-form";
import {Alert, Button, Fade, TextField} from "@mui/material";
import {useAppDispatch, useAppSelector} from "../../../../utils/hooks";
import {updateUser} from "../../../../store/profile/profile.actions";
import {ServerError} from "../../../../models";



interface Inputs {
    email: string,
    username: string,
}
interface IProps {
    changeSavedAnimation : Dispatch<SetStateAction<boolean>>,
    savedAnimation : boolean
}

const AccountInfoForm: FC<IProps> = ({ changeSavedAnimation, savedAnimation }) => {

    const dispatch = useAppDispatch();
    const { user } = useAppSelector(state => state.auth)


    const {register, setError, handleSubmit, formState: {errors, isDirty}} = useForm<Inputs>({
        defaultValues: {
            email : user!.userInfo!.email,
            username : user!.userInfo!.username,
        },
        mode: "onChange"
    })
    const onSubmit: SubmitHandler<Inputs> = async (data) =>{
        let res = await dispatch(updateUser({
            ...data
        }))
        if (res.meta.requestStatus === "rejected"){
            let formError
            if (typeof res.payload  === "string") {
                formError = {type: "server", message: "Ошибка сервера.. Попробуй позже"}
            }else{
                formError = {type: "server", message: (res.payload as ServerError).message}
            }
            return setError("email", formError)
            // setError("username", formError)
        }
        changeSavedAnimation(true)
        setTimeout( () =>{
            changeSavedAnimation(false)
        },3000)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Fade in={Boolean(errors.email?.type === "server")} className={styles.wrondFade}>
                <Alert variant="filled" severity="error">
                    {errors.email?.message}
                </Alert>
            </Fade>
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
                <Button type={"submit"} variant={"contained"} disabled={!isDirty}>Save changes</Button>
            </div>
        </form>
    );
}

export default AccountInfoForm;