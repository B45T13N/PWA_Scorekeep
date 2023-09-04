import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Home from "./pages/Home/Home";
import Connexion from './pages/Connexion/Connexion';
import {AuthProvider} from "./hooks/useAuth";
import Layout from "./components/templates/Layout/Layout";

function App() {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="/matchs" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="/connexion" element={<Layout />}>
                        <Route index element={<Connexion />} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
