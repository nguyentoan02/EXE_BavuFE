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
import Register from "./pages/Register";

// User Page
import BookingForm from "./pages/BookingForm";
import ServiceDetail from "./pages/ServiceDetail";
import StatusUpdateUser from "./pages/StatusUpdateUser";
import ServiceDetailDaily from "./pages/ServiceDetailDaily";
// Admin Page
import StatusUpdateAdmin from "./pages/StatusUpdateAdmin";

import BabysitterListUser from "@/pages/BabysitterListUser";
import BabysitterListAdmin from "@/pages/BabysitterListAdmin";
import BabysitterCreate from "./pages/BabysitterCreate";
import AboutUsPage from "./pages/Aboutus";
import Blog from "./pages/Blog";
import BabysitterDetail from "./pages/BabysitterDetail"; // Import trang chi tiết bà vú
import BabysitterUpdate from "./pages/BabysitterUpdate"; // Import trang cập nhật bà vú
function App() {
    const { user } = useAuth();

    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        !user ? (
                            <GuestPage />
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
                <Route
                    path="/register"
                    element={
                        !user ? (
                            <Register />
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
                    <Route
                        path="/babysitters/admin"
                        element={<BabysitterListAdmin />}
                    />
                    <Route
                        path="/babysitters/create"
                        element={<BabysitterCreate />}
                    />
                </Route>

                <Route path="/admin/dashboard" element={<AdminPage />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="/service-detail" element={<ServiceDetail />} />
                <Route
                    path="/service-detail-daily"
                    element={<ServiceDetailDaily />}
                />
                <Route path="/about" element={<AboutUsPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/babysitters" element={<BabysitterListUser />} />
                <Route path="/babysitters/:id" element={<BabysitterDetail />} />
                <Route
                    path="/babysitters/update/:id"
                    element={<BabysitterUpdate />}
                />

                <Route path="/register" element={<Register />} />

                {/* <Route path="*" element={<NotFound />} /> */}
            </Routes>
        </Router>
    );
}

export default App;
