// Import DisplayData class from ui.js module
import { DisplayData } from "./ui.js";
const displayData = new DisplayData();

// Define GamesFunctions class
export class GamesFunctions {
  constructor() {
    this.changeActive();
    this.closeDetails();
    this.arrowFun();
  }

  // Method to handle navigation link active state
  changeActive() {
    $(".arrow").addClass("d-none");
    $("nav li a").eq(0).addClass("active");
    $("nav li a").click(function () {
      $("nav li a").removeClass("active");
      $(this).addClass("active");
    });
  }

  // Method to handle closing game details section
  closeDetails() {
    $(".game-details i").click(function () {
      $(".bg-intro-img").removeClass("d-none");
      $(".navbar").removeClass("d-none");
      $(".display-games").removeClass("d-none");
      $(".game-details").addClass("d-none");
    });
  }

  // Arrow function to move to top
  arrowFun() {
    $(window).scroll(function () {
      if ($(this).scrollTop() > 800) {
        $(".arrow").removeClass("d-none");
      } else {
        $(".arrow").addClass("d-none");
      }
    });

    $(".arrow").click(function () {
      $("html, body").animate({ scrollTop: 0 }, 200);
    });
  }
}
