import $api from './index';
import {IConversation} from "../models";
import {CreateConversationModel} from "../models/conversation.model";

class ConversationsApi {
    async getConversations() {
        return $api.get<Array<IConversation>>("/conversations");
    }

    async createConversation(data : CreateConversationModel) {
        return $api.post(`/conversations`, data)
    }

    async getConversationWithUser(userId : string) {
        return $api.get<IConversation>(`/conversations/${userId}`)
    }

}

export default new ConversationsApi();