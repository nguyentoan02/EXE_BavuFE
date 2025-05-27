import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import { useAuth } from "./hooks/useAuth";

import GuestPage from "./pages/GuestPage";
import Login from "./pages/Login";
import AdminPage from "./pages/AdminPage";

// User Page
import BookingForm from "./pages/BookingForm";
import ServiceDetail from "./pages/ServiceDetail";
import StatusUpdateUser from "./pages/StatusUpdateUser";
import ServiceDetailDaily from "./pages/ServiceDetailDaily";
// Admin Page
import StatusUpdateAdmin from "./pages/StatusUpdateAdmin";

function App() {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        !user ? (
                            <AdminPage />
                        ) : (
                            <Navigate
                                to={
                                    user.role === "user"
                                        ? "/admin/dashboard"
                                        : "/user/dashboard"
                                }
                                replace
                            />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        !user ? (
                            <Login />
                        ) : (
                            <Navigate
                                to={
                                    user.role === "user"
                                        ? "/admin/dashboard"
                                        : "/user/dashboard"
                                }
                                replace
                            />
                        )
                    }
                />

                {/* Admin */}
                <Route element={<PrivateRoute role="user" />}>
                    <Route path="/admin/users" element={<AdminUsers />} />
                    <Route
                        path="/appointments/user"
                        element={<StatusUpdateUser />}
                    />

                    <Route path="/booking" element={<BookingForm />} />
                </Route>

                {/* User */}
                <Route element={<PrivateRoute role="admin" />}>
                    <Route
                        path="/user/dashboard"
                        element={<StatusUpdateAdmin />}
                    />
                </Route>

                <Route path="/admin/dashboard" element={<AdminPage />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/service-detail" element={<ServiceDetail />} />
                <Route
                    path="/service-detail-daily"
                    element={<ServiceDetailDaily />}
                />
                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
