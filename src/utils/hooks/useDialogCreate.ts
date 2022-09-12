import {useNavigate} from "react-router-dom";
import {useState} from "react";
import conversationService from "../../services/conversation-service";
import {changeConversation} from "../../store/chat/chat.slice";
import {createConversation} from "../../store/chat/chat.actions";
import {CreateConversationModel} from "../../models/conversation.model";
import {IUser, UserDto} from "../../models";
import {useAppDispatch} from "./useAppSelDis";

export const useDialogCreate = () =>{

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<any>();

    async function getData(user : IUser,currentUser : UserDto,shouldNavigate = true){
        try {
            setIsLoading(true)
            const { data } = await conversationService.getConversationWithUser(user._id);
            console.log(data)
            if (data){
                await dispatch(changeConversation(data))
                shouldNavigate && navigate("/messages")
            }else{
                const newConversation : CreateConversationModel = {
                    members : [user._id,currentUser.userInfo._id], // currentUser is me
                    isGroupChat : false,
                    admins : [],
                    creator : currentUser.userInfo._id,
                    image : "",
                    title : "",
                }
                await dispatch(createConversation(newConversation));
                shouldNavigate && navigate("/messages")
            }
        }catch (err : any){
            setError(err)
        }finally {
            setIsLoading(false)
        }

    }

    return [getData,isLoading,error]

}