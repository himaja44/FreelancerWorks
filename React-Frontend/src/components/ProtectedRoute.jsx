import { Navigate } from "react-router-dom";


function ProtectedRoute({
    children,
    allowedRole
}) {

    const token =
        localStorage.getItem("token");


    const storedUser =
        JSON.parse(
            localStorage.getItem("user") || "{}"
        );


    // ==========================================
    // NOT LOGGED IN
    // ==========================================

    if (!token) {

        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    // ==========================================
    // ROLE CHECK
    // ==========================================

    if (
        allowedRole &&
        storedUser.role &&
        storedUser.role.toLowerCase() !==
            allowedRole.toLowerCase()
    ) {

        if (
            storedUser.role.toLowerCase() ===
            "client"
        ) {

            return (
                <Navigate
                    to="/client-dashboard"
                    replace
                />
            );

        }


        if (
            storedUser.role.toLowerCase() ===
            "freelancer"
        ) {

            return (
                <Navigate
                    to="/freelancer-dashboard"
                    replace
                />
            );

        }


        return (
            <Navigate
                to="/login"
                replace
            />
        );

    }


    return children;

}


export default ProtectedRoute;