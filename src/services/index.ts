import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {UserDto} from "../models/user.model";


const $api = axios.create({
    withCredentials : true,
    baseURL : "/"          // due to we have proxy in package.json
})

// interceptor for request
$api.interceptors.request.use((config : AxiosRequestConfig) => {
    config.headers!.Authorization = `Bearer ${localStorage.getItem("token")}`
    return config
})
// interceptor for response
$api.interceptors.response.use((config : AxiosResponse) => {
    return config
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && error.config && !error.config._isRetry) {
        originalRequest._isRetry = true;
        try {
            const { data } = await axios.get<UserDto>("/users/refresh", {withCredentials: true})
            localStorage.setItem("token", data.accessToken)
            return $api.request(originalRequest);
        } catch (err) {
            console.log(err)
        }
    }
    throw error;
})


export { default as conversationService } from './conversation-service'
export { default as messageService } from './message-service'
export { default as postService } from './post-service'
export { default as uploadServce } from './upload.service'
export { default as userService } from './user-service'
export default $api;