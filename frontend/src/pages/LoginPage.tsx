import { useEffect} from "react";
import LoginPage from "./Login";
import { UserProvider } from "../components/UserProvider";

export default function LoginPagePage() {
    useEffect(() => {
        sessionStorage.setItem('serverUrl', 'http://localhost:6788');
    })
    return (
        <>
            <UserProvider>
                <LoginPage/>
            </UserProvider>
        </>
    )
}