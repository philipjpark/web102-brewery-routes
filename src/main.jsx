import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Layout from './routes/Layout';
import DetailView from './routes/DetailView';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <App /> */}

    <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />}>
          <Route index={true} element={<App />} />
          <Route index={false} path="/brewDetails/:id" element={<DetailView />} />
        </Route>

    </Routes>
  </BrowserRouter>

  </React.StrictMode>,
)
