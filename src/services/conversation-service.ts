import $api from './index';
import {IConversation} from "../models";

class ConversationsApi {
    async getConversations() {
        return $api.get<Array<IConversation>>("/conversations");
    }

    async createConversation(data : IConversation) {
        return $api.post(`/conversations`, data)
    }

    async getConversationWithUser(userId : string) {
        return $api.get(`/conversations/${userId}`)
    }

}

export default new ConversationsApi();