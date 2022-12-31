import Workspace from '@layouts/Workspace';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
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
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workspace/:workspace" element={<Workspace />}>
          <Route path="/workspace/:workspace/channel/:channel" element={<Channel />} />
          <Route path="/workspace/:workspace/dm/:id" element={<DirectMessage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </Suspense>
  );
};

export default App;
