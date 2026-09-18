// ==========================================
// TOAST NOTIFICATION SYSTEM
// ==========================================

function showToast(message, type = "info") {

    let container =
        document.getElementById("toastContainer");


    // Create container if it doesn't exist
    if (!container) {

        container =
            document.createElement("div");

        container.id =
            "toastContainer";

        document.body.appendChild(
            container
        );

    }


    const toast =
        document.createElement("div");


    toast.className =
        `toast toast-${type}`;


    let icon = "ℹ";


    if (type === "success") {

        icon = "✓";

    }
    else if (type === "error") {

        icon = "✕";

    }
    else if (type === "warning") {

        icon = "⚠";

    }


    toast.innerHTML = `

        <span class="toast-icon">
            ${icon}
        </span>

        <span class="toast-message">
            ${message}
        </span>

        <button
            class="toast-close"
            type="button"
        >
            ×
        </button>

    `;


    container.appendChild(
        toast
    );


    // Close button

    const closeButton =
        toast.querySelector(
            ".toast-close"
        );


    closeButton.addEventListener(
        "click",
        function () {

            removeToast(toast);

        }
    );


    // Automatically remove

    setTimeout(
        function () {

            removeToast(toast);

        },
        4000
    );

}


// ==========================================
// REMOVE TOAST
// ==========================================

function removeToast(toast) {

    if (!toast) {
        return;
    }


    toast.classList.add(
        "toast-hide"
    );


    setTimeout(
        function () {

            if (toast.parentNode) {

                toast.parentNode.removeChild(
                    toast
                );

            }

        },
        300
    );

}