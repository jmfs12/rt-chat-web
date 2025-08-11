import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import PrivateRoute from "./PrivateRoute";
import Chat from "../pages/Chat";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/*" element={
                        <PrivateRoute>
                            <Chat/>        
                        </PrivateRoute>
                }
                />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes;