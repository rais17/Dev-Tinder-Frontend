import { Route, Routes } from 'react-router-dom'
import './App.css'
import Body from './pages/Body';
import SignUp from './pages/SignUp';
import Login from "./pages/Login";
import Feed from "./pages/Feed";
import Profile from './pages/Profile'
import GlobalAlert from './components/GlobalAlert';
import Request from './pages/Request';
import Friends from './pages/Friends';
import Chat from './pages/Chat';

function App() {
  return (
    <>
      <GlobalAlert />
      <Routes>
        <Route path='/signup' element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Body />}>
          <Route index element={<Feed/>} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/requests" element={<Request />} />
          <Route path="/friends" element={<Friends />} />
          <Route path="/chat/:toUserId" element={<Chat />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
