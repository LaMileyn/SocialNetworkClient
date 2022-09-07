import {useNavigate} from "react-router-dom";
import {useState} from "react";
import conversationService from "../../services/conversation-service";
import {changeConversation} from "../../store/chat/chat.slice";
import {createConversation} from "../../store/chat/chat.actions";
import {CreateConversationModel} from "../../models/conversation.model";
import {IUser} from "../../models";
import {useAppDispatch} from "./useAppSelDis";

export const useDialogCreate = () =>{

    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [isLoading,setIsLoading] = useState<boolean>(false);
    const [error,setError] = useState<any>();

    async function getData(user : IUser,currentUser : IUser,shouldNavigate = true){
        try {
            setIsLoading(true)
            const { data } = await conversationService.getConversationWithUser(user._id);
            if (data.length > 0){
                await dispatch(changeConversation(data[0]))
                shouldNavigate && navigate("/messages")
            }else{
                const newConversation : CreateConversationModel = {
                    members : [user._id,currentUser._id], // currentUser is me
                    isGroupChat : false,
                    admins : [],
                    creator : currentUser._id,
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