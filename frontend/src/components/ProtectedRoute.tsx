import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import api from "../api"
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../constants";
import { useEffect, useState } from "react";

import { ReactNode } from "react";

function ProtectedRoute({ children }: { children: ReactNode }) {

    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
    useEffect(() => {
        auth().catch(()=>setIsAuthorized(false))
    }, []);
    const refreshToken = async () => {
            const refreshToken = localStorage.getItem(REFRESH_TOKEN)

            try {
                const res = await api.post("/api/token/refresh-token/",{refresh:refreshToken})
                if (res.status === 200) {
                    localStorage.setItem(ACCESS_TOKEN, res.data.access)
                    setIsAuthorized(true)
                }
                else{
                    setIsAuthorized(false)
                }
            } catch (error) {
               setIsAuthorized(false)
            console.log(error);
            
            }
    }

    const auth = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN)
        if (!token) {
            setIsAuthorized(false)
            return
        }
        const decoded = jwtDecode(token)
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration && tokenExpiration < now) {
            await refreshToken()
        }
        else {
            setIsAuthorized(true)
        }
    }

    if (isAuthorized === null) {
        return (<div>...Loading</div>)
    }

    return isAuthorized ? children : <Navigate to="/login" />
}

export default ProtectedRoute