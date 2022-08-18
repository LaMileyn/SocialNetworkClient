import {useAppSelector} from "./useAppSelDis";

export function useAuth() {
    const auth = useAppSelector(state => state.auth)
    return Boolean(auth.user)
}
