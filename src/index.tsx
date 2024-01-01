import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ScanProcessingJS from "./ScanProcessingJS";
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <ScanProcessingJS />
  </React.StrictMode>
);

// const rootElement = document.getElementById("root");
// render(<ScanProcessingJS />, rootElement);
