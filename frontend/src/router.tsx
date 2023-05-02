import { createBrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import ChatRoomPage from './Page/ChatRoomPage.tsx'
import LoginPage from './Page/LoginPage.tsx'

const router = createBrowserRouter([
    {
        path: '',
        errorElement: <div>Not Found</div>,
        children: [
            { path: '/', element: <LoginPage/>, index: true },
            { path: '/chat', element: <ChatRoomPage/> },
            { path: '/testo', element: <App/> }
        ]
    },
    { path: '*', element: <div>Not Found</div> }
])

export default router
