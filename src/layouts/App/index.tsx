import Workspace from '@layouts/Workspace';
import EmptyChat from '@pages/EmptyChat';
import EmptyWorkspace from '@pages/EmptyWorkspace';
import { lazy, Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));
const Channel = lazy(() => import('@pages/Channel'));
const DirectMessage = lazy(() => import('@pages/DirectMessage'));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/" element={<Workspace />}>
          <Route index element={<EmptyWorkspace />} />
          <Route path="workspace/:workspace" element={<Outlet />}>
            <Route index element={<EmptyChat />} />
            <Route path="channel/:channel" element={<Channel />} />
            <Route path="dm/:id" element={<DirectMessage />} />
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};

export default App;
