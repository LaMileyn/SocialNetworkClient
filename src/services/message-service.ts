import $api from './index';
import {IMessage} from "../models";

class MessagesApi{
    async getMessages(conversationId : string){
        return $api(`/messages/${conversationId}`);
    }
    async createMessage(data : IMessage){
        return $api.post("/messages", data)
    }
    async updateMessage(id : string,data : IMessage){
        return $api.put(`/messages/${id}`,data)
    }
    async deleteMessages(messages : Array<IMessage>){
        return $api.delete(`/messages`,{data : messages})
    }
}

export default new MessagesApi();