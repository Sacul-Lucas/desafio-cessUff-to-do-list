import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { Login } from "./login/Login";
import { Register } from "./register/Register";
// import { ProtectedRoute } from "./utils/ProtectedRoute";

export const AppRoutes = () => {
    return (
        <Router basename="/TaskFlow">
            <Routes>
                <Route 
                    path="/Dashboard" 
                    element={
                        // <ProtectedRoute>
                        <Dashboard/> 
                        // </ProtectedRoute>
                    } 
                />

                <Route path="/Login" element={<Login/>} />
                <Route path="/Register" element={<Register/>} />
            </Routes>
        </Router>
    )
}