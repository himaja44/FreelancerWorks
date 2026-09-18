import {
    BrowserRouter,
    Routes,
    Route,
    Navigate
} from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/freelancer/Profile";
import ProtectedRoute
    from "./components/ProtectedRoute";




// ==========================================
// FREELANCER PAGES
// ==========================================

import FindJobs from "./pages/freelancer/FindJobs";
import JobDetails from "./pages/freelancer/JobDetails";
import Apply from "./pages/freelancer/Apply";
import Applications from "./pages/freelancer/applications";
import SavedJobs from "./pages/freelancer/SavedJobs";

import FreelancerDashboard
    from "./pages/freelancer/FreelancerDashboard";


// ==========================================
// CLIENT PAGES
// ==========================================

import ClientDashboard from "./pages/ClientDashboard";
import MyJobs from "./pages/client/MyJobs";
import PostJob from "./pages/client/PostJob";
import Applicants from "./pages/client/Applicants";


// ==========================================
// ROLE PROTECTION
// ==========================================

function ProtectedRoute({
    children,
    allowedRole
}) {

    const token =
        localStorage.getItem("token");


    const user =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );


    const role =
        (user.role || "")
            .toLowerCase()
            .trim();


    // ======================================
    // NOT LOGGED IN
    // ======================================

    if (!token || !user.role) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // ======================================
    // WRONG ROLE
    // ======================================

    if (role !== allowedRole) {

        // Client trying to access
        // freelancer page

        if (role === "client") {

            return (
                <Navigate
                    to="/client-dashboard"
                    replace
                />
            );

        }


        // Freelancer trying to access
        // client page

        if (role === "freelancer") {

            return (
                <Navigate
                    to="/freelancer-dashboard"
                    replace
                />
            );

        }


        // Unknown role

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return children;
}


// ==========================================
// APP
// ==========================================

function App() {

    return (

        <BrowserRouter>

            <Routes>


                {/* ==================================
                    PUBLIC PAGES
                ================================== */}

                <Route
                    path="/"
                    element={<Home />}
                />
                  <Route
                    path="/jobs/:id"
                    element={
                        <ProtectedRoute
                            allowedRole="freelancer"
                        >
                            <JobDetails />
                        </ProtectedRoute>
                    }
                />



                <Route
                    path="/login"
                    element={<Login />}
                />


                <Route
                    path="/register"
                    element={<Register />}
                />



                {/* ==================================
                    FREELANCER PAGES
                ================================== */}

                {/* Freelancer Dashboard */}

                <Route
                    path="/freelancer-dashboard"
                    element={

                        <ProtectedRoute
                            allowedRole="freelancer"
                        >

                            <FreelancerDashboard />

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


                {/* Find Jobs */}

                <Route
                    path="/jobs"
                    element={

                        <ProtectedRoute
                            allowedRole="freelancer"
                        >

                            <FindJobs />

                        </ProtectedRoute>

                    }
                />


                {/* Job Details */}

                <Route
                    path="/jobs/:id"
                    element={

                        <ProtectedRoute
                            allowedRole="freelancer"
                        >

                            <JobDetails />

                        </ProtectedRoute>

                    }
                />


                {/* Apply Job */}

                <Route
                    path="/apply/:id"
                    element={

                        <ProtectedRoute
                            allowedRole="freelancer"
                        >

                            <Apply />

                        </ProtectedRoute>

                    }
                />


                {/* My Applications */}

                <Route
                    path="/applications"
                    element={

                        <ProtectedRoute
                            allowedRole="freelancer"
                        >

                            <Applications />

                        </ProtectedRoute>

                    }
                />


                {/* Saved Jobs */}

                <Route
                    path="/saved-jobs"
                    element={

                        <ProtectedRoute
                            allowedRole="freelancer"
                        >

                            <SavedJobs />

                        </ProtectedRoute>
                        

                    }
                />



                {/* ==================================
                    CLIENT PAGES
                ================================== */}

                {/* Client Dashboard */}

                <Route
                    path="/client-dashboard"
                    element={

                        <ProtectedRoute
                            allowedRole="client"
                        >

                            <ClientDashboard />

                        </ProtectedRoute>

                    }
                />


                {/* My Jobs */}

                <Route
                    path="/my-jobs"
                    element={

                        <ProtectedRoute
                            allowedRole="client"
                        >

                            <MyJobs />

                        </ProtectedRoute>

                    }
                />


                {/* Post Job */}

                <Route
                    path="/post-job"
                    element={

                        <ProtectedRoute
                            allowedRole="client"
                        >

                            <PostJob />

                        </ProtectedRoute>

                    }
                />


                {/* Applicants */}

                <Route
                    path="/applicants/:jobId"
                    element={

                        <ProtectedRoute
                            allowedRole="client"
                        >

                            <Applicants />

                        </ProtectedRoute>

                    }
                />



                {/* ==================================
                    UNKNOWN URL
                ================================== */}

                <Route
                    path="*"
                    element={

                        <Navigate
                            to="/"
                            replace
                        />

                    }
                />


            </Routes>

        </BrowserRouter>

    );

}

// Railway frontend deployment
export default App;