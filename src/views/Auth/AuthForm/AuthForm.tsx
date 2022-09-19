import React, {FC, useState} from 'react';
import styles from './AuthForm.module.scss';
import {Link, useLocation, useNavigate} from "react-router-dom";
import {SubmitHandler, useForm} from "react-hook-form";
import {useAppDispatch, useAppSelector} from "../../../utils/hooks";
import {loginMe, registerMe} from "../../../store/auth/auth.actions";
import {
    TextField,
    IconButton,
    InputAdornment, FormControlLabel, Checkbox, Button, Alert, Fade, CircularProgress,
} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";
import {ServerError} from "../../../models";


interface IProps {
    isLogin: boolean
}

interface LocationState {
    from: {
        pathname: string;
    };
}

interface Inputs {
    email: string,
    username: string,
    password: string,
    repeatPassword: string,
    rememberMe: boolean
}


const AuthForm: FC<IProps> = ({isLogin}) => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const location = useLocation()
    const {fetching} = useAppSelector(state => state.auth)
    const [showPassword, setShowPassword] = useState<boolean>(false)
    const {from: {pathname}} = location.state as LocationState || {from: {pathname: "/"}};
    const {register, setError, clearErrors, handleSubmit, formState: {errors}} = useForm<Inputs>({
        defaultValues: {
            email: "chel15@mail.ru",
            username: "Дмитрий",
            password: "12345678",
            repeatPassword: "12345678",
            rememberMe: false
        },
        mode: "onChange"
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {

        const res = isLogin
            ? await dispatch(loginMe(data))
            : await dispatch(registerMe(data))
        if (res.meta.requestStatus === "rejected") {
            let formError
            if (typeof res.payload === "string") {
                formError = {type: "server", message: "Ошибка сервера.. Попробуй позже"}
            } else {
                formError = {type: "server", message: (res.payload as ServerError).message}
            }
            setError("email", formError)
            setError("password", formError)
            if (!isLogin) {
                setError("username", formError)
                setError("repeatPassword", formError)
            }

        } else {
            navigate(pathname, {replace: true}) // navigate person to place he was redirected to auth
        }

    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            {
                errors.password?.type === "server" && <Fade in={Boolean(errors.password?.type)}>
                    <Alert variant="outlined" severity="error" className={styles.error}>
                        {errors.password?.message}
                    </Alert>
                </Fade>
            }
            <TextField className={styles.field}
                       required
                       {...register("email", {required: true})}
                       label={"Email"}
                       variant={"outlined"}
                       type={"email"}/>
            {
                !isLogin && <TextField
                    className={styles.field}
                    required
                    {...register("username", {required: true, minLength: 3})}
                    label={"Username"}
                    variant={"outlined"}
                    type={"text"}
                />
            }

            <TextField
                className={styles.field}
                {...register("password", {required: true})}
                id="outlined-adornment-password"
                type={showPassword ? 'text' : 'password'}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={() => setShowPassword(!showPassword)}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff/> : <Visibility/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }}

                label="Password"
            />
            {
                !isLogin &&
                <TextField
                    className={styles.field}
                    {...register("repeatPassword", {required: true})}
                    id="outlined-adornment-repeat-password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword(!showPassword)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                    label="Repeat Password"
                />
            }
            {
                isLogin && <div className={styles.form__under}>
                    <FormControlLabel
                        label="Remember me"
                        className={styles.remember}
                        control={
                            <Checkbox
                                style={{color: "var(--color-grey-middle)"}}
                                {...register("rememberMe", {required: false})}
                            />
                        }
                    />
                    <Link to={"/recovery"} className={styles.recovery}>Recovery Password</Link>
                </div>
            }
            <Button
                type={"submit"}
                variant={"contained"}
                className={styles.acceptButton}
                disabled={fetching}
            >
                {fetching ? "" : isLogin ? "Log In" : "Sign Up"}
                {fetching && <CircularProgress variant={"indeterminate"} size={25} color={"primary"}/>}
            </Button>
        </form>
    );
}

export default AuthForm;