import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import FreelancerDashboard from "./pages/freelancer/FreelancerDashboard";
import Jobs from "./pages/freelancer/jobs";
import JobDetails from "./pages/freelancer/JobDetails";
import Apply from "./pages/freelancer/Apply";
import Applications from "./pages/freelancer/applications";
import SavedJobs from "./pages/freelancer/SavedJobs";
import Profile from "./pages/freelancer/Profile";

import ClientDashboard from "./pages/ClientDashboard";
import PostJob from "./pages/client/PostJob";
import MyJobs from "./pages/client/MyJobs";
import Applicants from "./pages/client/Applicants";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <BrowserRouter>

            <Routes>

                {/* ================= PUBLIC ROUTES ================= */}

                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/register"
                    element={<Register />}
                />


                {/* ================= FREELANCER ROUTES ================= */}

                <Route
                    path="/freelancer-dashboard"
                    element={
                        <ProtectedRoute allowedRole="freelancer">
                            <FreelancerDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs"
                    element={
                        <ProtectedRoute allowedRole="freelancer">
                            <Jobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/jobs/:id"
                    element={
                        <ProtectedRoute allowedRole="freelancer">
                            <JobDetails />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/apply/:id"
                    element={
                        <ProtectedRoute allowedRole="freelancer">
                            <Apply />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/applications"
                    element={
                        <ProtectedRoute allowedRole="freelancer">
                            <Applications />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/saved-jobs"
                    element={
                        <ProtectedRoute allowedRole="freelancer">
                            <SavedJobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute allowedRole="freelancer">
                            <Profile />
                        </ProtectedRoute>
                    }
                />


                {/* ================= CLIENT ROUTES ================= */}

                <Route
                    path="/client-dashboard"
                    element={
                        <ProtectedRoute allowedRole="client">
                            <ClientDashboard />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/post-job"
                    element={
                        <ProtectedRoute allowedRole="client">
                            <PostJob />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/my-jobs"
                    element={
                        <ProtectedRoute allowedRole="client">
                            <MyJobs />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/applicants/:jobId"
                    element={
                        <ProtectedRoute allowedRole="client">
                            <Applicants />
                        </ProtectedRoute>
                    }
                />


                {/* ================= FALLBACK ================= */}

                <Route
                    path="*"
                    element={<Home />}
                />

            </Routes>

        </BrowserRouter>
    );
}

export default App;