import api from './index';
import {IPost} from "../models";

class PostsApi {
    getTimeLine(){
        return api.get(`posts/feed`)
    }
    getPost(postId : string){
        return api.get(`posts/${postId}`)
    }
    deletePost(postId : string){
        return api.delete(`posts/${postId}`)
    }
    likePost(postId : string ,userId : string){
        return api.put(`posts/${postId}/like`,{ userId })
    }
    createPost(post : IPost){
        return api.post(`posts/`, post)
    }
    updatePost(post : IPost,postId : string){
        return api.post(`posts/${postId}`,post)
    }
    getUserPosts(userId : string){
        return api.get(`posts/profile/${userId}`)
    }
}

export default new PostsApi();