import { createBrowserRouter } from 'react-router-dom'
import ChatRoomPage from './pages/ChatRoom.tsx'
import LoginPage from './pages/Login.tsx'

const router = createBrowserRouter([
    {
        path: '',
        errorElement: <div>Not Found</div>,
        children: [
            { path: '/', element: <LoginPage/>, index: true },
            { path: '/chat', element: <ChatRoomPage/> }
        ]
    },
    { path: '*', element: <div>Not Found</div> }
])

export default router
