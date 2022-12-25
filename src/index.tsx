import React from 'react';
import App from '@layouts/App';
import ReactDOM from 'react-dom/client';

if (process.env.NODE_ENV === 'development') {
  console.log('dev');
}
console.log(process.env.NODE_ENV);

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
