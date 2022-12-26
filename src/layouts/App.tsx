import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

const Login = lazy(() => import('@pages/Login'));
const Signup = lazy(() => import('@pages/Signup'));

const App = () => {
  return (
    <Suspense>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Suspense>
  );
};

export default App;
