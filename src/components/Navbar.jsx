import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {

    const navigate = useNavigate();

    // Get logged-in user
    const user = JSON.parse(
        localStorage.getItem("user") || "{}"
    );

    const role = (user.role || "")
        .toLowerCase()
        .trim();


    // ==========================================
    // LOGOUT
    // ==========================================

    function handleLogout() {

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        navigate("/login");
    }


    // ==========================================
    // FREELANCER NAVBAR
    // ==========================================

    if (role === "freelancer") {

        return (

            <header className="navbar">

                <div
                    className="logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    Freelancer<span>Works</span>
                </div>


                <nav>

                    <Link to="/freelancer-dashboard">
                        Dashboard
                    </Link>

                    <Link to="/jobs">
                        Find Jobs
                    </Link>

                    <Link to="/applications">
                        My Applications
                    </Link>

                </nav>


                <div className="navbar-user">

                    <span>
                        {user.email}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Logout
                    </button>

                </div>

            </header>

        );
    }


    // ==========================================
    // CLIENT NAVBAR
    // ==========================================

    if (role === "client") {

        return (

            <header className="navbar">

                <div
                    className="logo"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    Freelancer<span>Works</span>
                </div>


                <nav>

                    <Link to="/client-dashboard">
                        Dashboard
                    </Link>

                    <Link to="/post-job">
                        Post a Job
                    </Link>

                    <Link to="/my-jobs">
                        My Jobs
                    </Link>

                </nav>


                <div className="navbar-user">

                    <span>
                        {user.email}
                    </span>

                    <button
                        onClick={handleLogout}
                        className="logout-button"
                    >
                        Logout
                    </button>

                </div>

            </header>

        );
    }


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    return (

        <header className="navbar">

            <Link
                to="/"
                className="logo"
            >
                Freelancer<span>Works</span>
            </Link>


            <nav>

                <Link to="/">
                    Home
                </Link>

                <Link to="/jobs">
                    Find Jobs
                </Link>

                <Link to="/login">
                    Login
                </Link>

                <Link to="/register">
                    Register
                </Link>

            </nav>

        </header>

    );
}


export default Navbar;