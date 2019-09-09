var initialAnimalArray = ["dog","cat","pengiun","macaque"];

function createButtons(){
    initialAnimalArray.forEach(animal =>{
        createButton(animal);
    });
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

}

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
}

function clearGifs(){
    $('gifs-column').clear();
}

function populateGif(animal, data){
    var gifDiv = $('<div>');
    var label = $('<h3>');
    label.text("Rating: " + data.rating);
    gifDiv.append(label);
    var newGif = $('<img>');
    newGif.attr("alt", animal + " gif")
    newGif.attr("src",data.images.fixed_height.url)
    //update html
    $(gifDiv).append(newGif);
    $('#gifs-column').append(gifDiv);
}

createButtons();
populateGifs("bear");