// Import the GetDetails class from the details.js module
import { GetDetails } from "./details.js";

// Define the DisplayData class
export class DisplayData {
  constructor() {
    this.displayData("mmorpg");
  }

  async displayData(category = "mmorpg") {
    // Function to fetch data from the API based on the category
    const fetchCategoryData = async (category) => {
      let API = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
      await this.callingAPI(API);
    };

    await fetchCategoryData(category);

    // Event listener for navigation links to dynamically fetch data for different categories
    $("nav li a").click(async function () {
      let category = $(this).html();
      await fetchCategoryData(category);
    });
  }

  // Method to make API call using fetch
  async callingAPI(API) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c9cf679268mshdf6f61f1f6acdfdp18e036jsn5dd668304338",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      // Fetch data from the API using specified options
      const url = await fetch(API, options);
      const response = await url.json();
      this.displayCardGame(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Method to display fetched game data in HTML format
  displayCardGame(response) {
    let box = "";
    for (let i = 0; i < response.length; i++) {
      box += `<div class="col-sm-6 col-md-4 col-lg-3">
                  <div class="card text-white game-card h-100"  data-id="${response[i].id}">
                      <img src="${response[i].thumbnail}" class="card-img-top p-2 rounded-top-4" alt="img-game">
                      <div class="card-body">
                          <div class="title d-flex justify-content-between align-items-center">
                              <h5 class="card-title">${response[i].title}</h5>
                              <h5 class="badge py-2 ">free</h5>
                          </div>
                          <p class="card-text text-secondary fs-6">${response[i].short_description}</p>
                      </div>
                      <div class="card-footer d-flex justify-content-between align-items-center">
                          <span class="badge text-bg-dark">${response[i].genre}</span>
                          <span class="badge text-bg-dark">${response[i].platform}</span>
                      </div>
                  </div>
              </div>`;
    }

    // Display the constructed game cards in the designated HTML element
    $(".display-games .row").html(box);

    // Event listener for clicking on a game card to show its details
    $(".game-card").click(function () {
      const id = $(this).data("id");
      $(".bg-intro-img").addClass("d-none");
      $(".navbar").addClass("d-none");
      $(".display-games").addClass("d-none");
      $(".game-details").removeClass("d-none");
      let getDetails = new GetDetails(id);
    });
  }
}
