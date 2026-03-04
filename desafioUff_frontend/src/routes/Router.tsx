import {
    BrowserRouter as Router,
    Routes,
    Route
} from "react-router-dom";
import { Dashboard } from "./dashboard/Dashboard";
import { ProtectedRoute } from "./utils/ProtectedRoute";

export const AppRoutes = () => {
    return (
        <Router basename="/TaskFlow">
            <Routes>
                <Route 
                    path="/Dashboard" 
                    element={
                        <ProtectedRoute>
                            <Dashboard/> 
                        </ProtectedRoute>
                    } 
                />
            </Routes>
        </Router>
    )
}