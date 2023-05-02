import { useEffect } from "react";
import { UserProvider } from "../components/UserProvider";
import { Login } from "../components/pages/Login";

export default function LoginPage() {
    useEffect(() => {
        let serverUrl = sessionStorage.getItem('serverUrl');
        if(serverUrl) return;
        serverUrl =  prompt('enter websocket service server (default: localhost:2001)', '');
        while(!serverUrl || serverUrl === ''){
            serverUrl = 'http://localhost:2001'
            // serverUrl =  prompt('enter websocket server', '');
        }
        sessionStorage.setItem('serverUrl', serverUrl);
    })
    return (
        <>
            <UserProvider>
                <Login/>
            </UserProvider>
        </>
    )
}