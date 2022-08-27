import {FC, useState} from "react";


export const useFetching  = (cb : () => void) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<any>(null);

    const fetching = async () => {
        try {
            setIsLoading(true)
            await cb()
        } catch (err : any) {
            setError(err)
        } finally {
            setIsLoading(false)
        }
    }
    return [fetching,isLoading,error]
}

