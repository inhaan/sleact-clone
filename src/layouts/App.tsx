import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));
const Channel = lazy(() => import('@pages/Channel'));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/workspace/channel" element={<Channel />} />
      </Routes>
    </Suspense>
  );
};

export default App;
