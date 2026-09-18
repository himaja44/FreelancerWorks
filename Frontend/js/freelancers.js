const searchInput =
    document.getElementById("freelancerSearch");

const searchButton =
    document.getElementById("freelancerSearchButton");

const categoryFilter =
    document.getElementById("freelancerCategory");

const freelancerCards =
    document.querySelectorAll(".freelancer-card");

const freelancerCount =
    document.getElementById("freelancerCount");

const noFreelancers =
    document.getElementById("noFreelancers");


function filterFreelancers() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const category =
        categoryFilter.value;

    let visibleCount = 0;


    freelancerCards.forEach(function (card) {

        const cardText =
            card.textContent.toLowerCase();

        const cardCategory =
            card.dataset.category;


        const matchesSearch =
            searchText === "" ||
            cardText.includes(searchText);


        const matchesCategory =
            category === "all" ||
            cardCategory === category;


        if (
            matchesSearch &&
            matchesCategory
        ) {

            card.style.display = "block";

            visibleCount++;

        }
        else {

            card.style.display = "none";

        }

    });


    freelancerCount.textContent =
        visibleCount +
        " freelancers available";


    if (visibleCount === 0) {

        noFreelancers.style.display =
            "block";

    }
    else {

        noFreelancers.style.display =
            "none";

    }

}


searchInput.addEventListener(
    "input",
    filterFreelancers
);


searchButton.addEventListener(
    "click",
    filterFreelancers
);


categoryFilter.addEventListener(
    "change",
    filterFreelancers
);