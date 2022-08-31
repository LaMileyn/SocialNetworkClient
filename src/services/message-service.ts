import $api from './index';
import {IMessage} from "../models";
import {CreateMessageModel} from "../models/message.model";

class MessagesApi{
    async getMessages(conversationId : string){
        return $api(`/messages/${conversationId}`);
    }
    async createMessage(data : CreateMessageModel){
        return $api.post("/messages", data)
    }
    async updateMessage(id : string,data : CreateMessageModel){
        return $api.put<IMessage>(`/messages/${id}`,data)
    }
    async deleteMessages(messages : Array<IMessage>){
        return $api.delete(`/messages`,{data : messages})
    }
}

export default new MessagesApi();