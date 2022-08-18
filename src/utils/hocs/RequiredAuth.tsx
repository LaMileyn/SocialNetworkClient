import { useLocation,Navigate } from 'react-router-dom'
import {useAuth} from "../hooks";



interface IProps {
    children : JSX.Element
}
export function RequireAuth({ children } : IProps) {
    let auth = useAuth();
    let location = useLocation();
    if (!auth) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}