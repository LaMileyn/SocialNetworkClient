import React, {useState} from "react";
import uploadService from "../../services/upload.service";

export const useFile = (cb: (data: string) => void) => {

    const [fileLoading, setFileLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)

    const handleChangeFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        try {
            setFileLoading(true)
            const formData = new FormData();
            if (!event.target.files) return;
            const file = event.target.files[0];
            formData.append("file", file);
            const {data} = await uploadService.sendToServer(formData)
            cb(data)
        } catch (err) {
            setError(err)
            setFileLoading(false)
        } finally {
            setFileLoading(false)
        }
    }
    return [handleChangeFile, fileLoading, error]
}