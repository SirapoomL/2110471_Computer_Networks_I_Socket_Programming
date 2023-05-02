import { useEffect } from "react";
import { UserProvider } from "../components/UserProvider";
import { Login } from "../components/pages/Login";

export default function LoginPage() {
    useEffect(() => {
        sessionStorage.setItem('serverUrl', 'http://localhost:6789');
    })
    return (
        <>
            <UserProvider>
                <Login/>
            </UserProvider>
        </>
    )
}