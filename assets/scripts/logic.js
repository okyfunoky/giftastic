var initialAnimalArray = ["dog","cat","pengiun","macaque"];
$(document).on("click", ".gif", updateGifState);

function createButtons(){
    initialAnimalArray.forEach(animal =>{
        createButton(animal);
    });
};

function updateGifState(){
    var state = $(this).attr("data-state");
    
    if(state === "still"){
      $(this).attr("src",$(this).attr("data-animate"));
      $(this).attr("data-state","animate")
    }

    if(state === "animate"){
      $(this).attr("src",$(this).attr("data-still"));
      $(this).attr("data-state","still")
    }
}

function createButton(animal){
    //create button
    var newButton = $('<button>')
    //add animal name as value
    newButton.attr("data-animal",animal);
    newButton.text(animal);
    //add animalbutton class
    newButton.addClass("animalButton");
    newButton.addClass("btn btn-primary");
    //attach button
    $('#buttonsrow').append(newButton);

};

function populateGifs(animal){
    //hit api
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
    animal + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=5";
    
    $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(queryURL);
        
        response.data.forEach(data =>{
            populateGif(animal, data);
        });
      });
};

function clearGifs(){
    $('gifs-column').clear();
};

function populateGif(animal, data){
    var gifDiv = $('<div>');
    var label = $('<h3>');
    label.text("Rating: " + data.rating);
    gifDiv.append(label);
    var newGif = $('<img>');
    newGif.addClass("gif");
    newGif.attr("alt", animal + " gif")
    newGif.attr("data-animate",data.images.fixed_height.url);
    newGif.attr("src",data.images.fixed_height_still.url);
    newGif.attr("data-still",data.images.fixed_height_still.url);
    newGif.attr("data-state","still");
    //update html
    $(gifDiv).append(newGif);
    $('#gifs-column').append(gifDiv);
};

createButtons();
populateGifs("bear");