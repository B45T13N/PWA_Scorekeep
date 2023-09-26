import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ReactDOM from 'react-dom/client';
import './index.scss';
import reportWebVitals from './reportWebVitals';
import Home from "./pages/Home/Home";
import Connexion from './pages/Connexion/Connexion';
import {AuthProvider} from "./hooks/useAuth/useAuth";
import Layout from "./components/templates/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardMatchs from "./pages/Dashboard/Matchs/DashboardMatchs";
import UpdateMatch from "./pages/Dashboard/UpdateMatch/UpdateMatch";
import AddMatch from "./pages/Dashboard/AddMatch/AddMatch";
import Volunteers from "./pages/Dashboard/Volunteers/Volunteers";
import Teams from "./pages/Teams/Teams";
import Matchs from "./pages/Matchs/Matchs";

function App() {

    let isAuthenticated = sessionStorage.getItem("loggedIn") === 'true';

    return (
            <Router>
                <Routes>
                    <Route path="/" element={<Layout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route path="/teams" element={<Layout />}>
                        <Route index element={<Teams />} />
                    </Route>
                    <Route path="/matchs/:localTeamId" element={<Layout />}>
                        <Route index element={<Matchs />} />
                    </Route>
                    <Route path="/connexion" element={<Layout />}>
                        <Route index element={<Connexion />} />
                    </Route>
                    <Route path="/dashboard" element={<Layout isAuthenticated={isAuthenticated} />}>
                        <Route index element={<Dashboard /> }/>
                    </Route>
                    <Route path="/dashboard/matchs" element={<Layout isAuthenticated={isAuthenticated} />}>
                        <Route index element={<DashboardMatchs /> }/>
                    </Route>
                    <Route path="/dashboard/matchs/edit/:matchId" element={<Layout isAuthenticated={isAuthenticated} />}>
                        <Route index element={<UpdateMatch /> }/>
                    </Route>
                    <Route path="/dashboard/matchs/add" element={<Layout isAuthenticated={isAuthenticated} />}>
                        <Route index element={<AddMatch /> }/>
                    </Route>
                    <Route path="/dashboard/volunteers" element={<Layout isAuthenticated={isAuthenticated}/>}>
                        <Route index element={<Volunteers /> }/>
                    </Route>
                </Routes>
            </Router>
    );
}

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
      <AuthProvider>
          <App />
      </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
