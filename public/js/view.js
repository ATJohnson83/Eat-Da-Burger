$(document).ready(function() {
  // Getting a reference to the input field where user adds a new daburger
  var newBurgerInput = $("input.new-burger");
  // Our new daburgers will go inside the daburgerContainer
  var burgerContainer = $(".burger-container");
  // Adding event listeners for deleting, editing, and adding daburgers
  $(document).on("click", "button.delete", deleteDaburger);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("submit", "#burger-form", insertDaburger);

  // Our initial daburgers array
  var daburgers = [];

  // Getting daburgers from database when page loads
  getDaburgers();

  // This function resets the daburgers displayed with new daburgers from the database
  function initializeRows() {
    burgerContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < daburgers.length; i++) {
      rowsToAdd.push(createNewRow(daburgers[i]));
    }
    burgerContainer.prepend(rowsToAdd);
  }

  // This function grabs daburgers from the database and updates the view
  function getDaburgers() {
    $.get("/api/daburgers", function(data) {
      daburgers = data;
      initializeRows();
    });
  }

  // This function deletes a daburger when the user clicks the delete button
  function deleteDaburger(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/daburgers/" + id
    }).done(getDaburgers);
  }

  
  
  // Toggles complete status
  function toggleComplete(event) {
    event.stopPropagation();
    var daburger = $(this).parent().data("daburger");
    daburger.devour = !daburger.devour;
    updateDaburger(daburger);
  }


  // This function updates a daburger in our database
  function updateDaburger(daburger) {
    $.ajax({
      method: "PUT",
      url: "/api/daburgers",
      data: daburger
    }).done(getDaburgers);
  }


  // This function constructs a daburger-item row
  function createNewRow(daburger) {
    var $newInputRow = $(
      [
        "<li class='list-group-item daburger-item'>",
        "<span class='newburg'><h3>",
        daburger.name,
        "</h3></span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-default'>Delete</button>",
        "<button class='complete btn btn-default'>Devour</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", daburger.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("daburger", daburger);
    if (daburger.devour) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  // This function inserts a new burger into our database and then updates the view
  function insertDaburger(event) {
    event.preventDefault();
    var daburger = {
      name: newBurgerInput.val().trim(),
      devour: false
    };

    $.post("/api/daburgers", daburger, getDaburgers);
    newBurgerInput.val("");
  }
});
