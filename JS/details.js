export class GetDetails {
  constructor(id) {
    this.id = id;
    this.callingAPI(id);
  }

  // Method to fetch game details from API
  async callingAPI(id) {
    const options = {
      method: "GET",
      headers: {
        "x-rapidapi-key": "c9cf679268mshdf6f61f1f6acdfdp18e036jsn5dd668304338",
        "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      },
    };

    try {
      // Fetch data from API based on the provided game ID
      const url = await fetch(
        `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`,
        options
      );
      const response = await url.json();
      this.displayCardDetails(response);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  // Method to display game details in HTML format
  displayCardDetails(response) {
    let screenshots = ``;
    let box = `<div class="col-md-4">
                      <img src="${response.thumbnail}" class="w-100" alt="game-details-img">
                  </div>
                  <div class="col-md-8">
                      <h3>Title: <span>${response.title}</span></h3>
                      <p>Category: <span class="badge bg-info p-2 text-dark">${response.genre}</span></p>
                      <p>Platform: <span class="badge bg-info p-2 text-dark">${response.platform}</span></p>
                      <p>Status: <span class="badge bg-info p-2 text-dark">${response.status}</span></p>
                      <p class="fs-6">${response.description}</p>
                      <a target="_blank" href="${response.game_url}"><button class="btn btn-outline-warning text-white">Show Game</button></a>
                  </div>
                  `;

    // Iterate through screenshots data and construct HTML for each screenshot
    for (let i = 0; i < response.screenshots.length; i++) {
      screenshots += `<div class="py-4 px-2"><img class="w-100 img-fluid object-fit-cover" src="${response.screenshots[i].image}" alt="screenshots-img"></div>`;
    }

    // Insert game details HTML into designated elements in the DOM
    $(".game-details .row").html(box);
    $(".game-details .screenshots").html(screenshots);
  }
}
