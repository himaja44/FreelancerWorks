function getToken() {
    return localStorage.getItem("token");
}

function isLoggedIn() {
    return !!getToken();
}

function requireLogin() {

    if (isLoggedIn()) {
        return true;
    }

    localStorage.setItem(
        "returnUrl",
        window.location.href
    );

    window.location.href = "login.html";

    return false;
}

function logoutUser() {

    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("returnUrl");

    showToast("Logged out successfully.", "success");

setTimeout(function () {
    window.location.href = "login.html";
}, 1000);
}