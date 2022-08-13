import api from './index';

class UploadApi{
    sendToServer(data : any){
        return api.post(`upload`,data)
    }
}
export default new UploadApi();