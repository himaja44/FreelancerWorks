// ==========================================
// NAVBAR DROPDOWNS
// ==========================================

const hireTalentBtn =
    document.getElementById("hireTalentBtn");

const hireTalentMenu =
    document.getElementById("hireTalentMenu");


const findWorkBtn =
    document.getElementById("findWorkBtn");

const findWorkMenu =
    document.getElementById("findWorkMenu");


const howItWorksBtn =
    document.getElementById("howItWorksBtn");

const howItWorksMenu =
    document.getElementById("howItWorksMenu");


// ==========================================
// HIRE TALENT
// ==========================================

if (
    hireTalentBtn &&
    hireTalentMenu
) {

    hireTalentBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            hireTalentMenu.classList.toggle(
                "show"
            );

            findWorkMenu?.classList.remove(
                "show"
            );

            howItWorksMenu?.classList.remove(
                "show"
            );

        }
    );

}


// ==========================================
// FIND WORK
// ==========================================

if (
    findWorkBtn &&
    findWorkMenu
) {

    findWorkBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            findWorkMenu.classList.toggle(
                "show"
            );

            hireTalentMenu?.classList.remove(
                "show"
            );

            howItWorksMenu?.classList.remove(
                "show"
            );

        }
    );

}


// ==========================================
// HOW IT WORKS
// ==========================================

if (
    howItWorksBtn &&
    howItWorksMenu
) {

    howItWorksBtn.addEventListener(
        "click",
        function (event) {

            event.preventDefault();

            howItWorksMenu.classList.toggle(
                "show"
            );

            hireTalentMenu?.classList.remove(
                "show"
            );

            findWorkMenu?.classList.remove(
                "show"
            );

        }
    );

}


// ==========================================
// CLOSE WHEN CLICKING OUTSIDE
// ==========================================

document.addEventListener(
    "click",
    function (event) {

        if (
            !event.target.closest(
                ".nav-dropdown"
            )
        ) {

            hireTalentMenu?.classList.remove(
                "show"
            );

            findWorkMenu?.classList.remove(
                "show"
            );

            howItWorksMenu?.classList.remove(
                "show"
            );

        }

    }
);