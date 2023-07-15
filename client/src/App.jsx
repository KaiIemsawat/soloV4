import IndexPage from "./components/pages/IndexPage";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./components/pages/RegisterPage";
import axios from "axios";
import { UserContextProvider } from "./components/UserContext";

import ProfilePage from "./components/pages/ProfilePage";
import MyTrails from "./components/pages/MyTrails";
import TrailFormPage from "./components/pages/TrailFormPage";
import TrailPage from "./components/pages/TrailPage";
import AllTrails from "./components/pages/AllTrails";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.withCredentials = true;
function App() {
    return (
        <UserContextProvider>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route index element={<IndexPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/account" element={<ProfilePage />} />
                    <Route path="/account/myTrails" element={<MyTrails />} />
                    <Route path="/account/allTrails" element={<AllTrails />} />
                    <Route
                        path="/account/myTrails/new"
                        element={<TrailFormPage />}
                    />
                    <Route
                        path="/account/myTrails/:id"
                        element={<TrailFormPage />}
                    />
                    <Route path="/trail/:id" element={<TrailPage />} />
                </Route>
            </Routes>
        </UserContextProvider>
    );
}

/* 
use ':' as in /account/:subpage? to declare that there are sub-page after /account
use '?' to indicate that the subpage is optional. The route may end at /account
*/

export default App;
