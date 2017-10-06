$( document ).ready(function(){


// array of actors

var apiKey = "PK7TLz7rD84NTgZBCgWhmLAiMU2FHjLk";
var actors = [];
actors[0] = 'John Wayne';
actors[1] = 'Bill Pullman';
actors[2] = 'John Candy';
actors[3] = 'John Astin';
actors[4] = 'Patty Duke';
actors[5] = 'Christopher George';
actors[6] = 'Yul Brenner';
actors[7] = 'Steve McQueen';
actors[8] = 'Christoper Reeves';
actors[9] = 'John Wayne';
actors[10] = 'Bill Pullman';
actors[11] = 'John Wayne';
actors[12] = 'Bill Pullman';
actors[13] = 'John Wayne';
actors[14] = 'Bill Pullman';

	console.log("hello" + actors.length);

//--------------------------------------------
// populates the button-row element with buttons based upon
// the list of in actors.
//--------------------------------------------

for (var i = 0; i < actors.length; i++){
	// creates a button with the common btton
	var b = addButton(actors[i]);
	// adds the button to the row w
	$("#button-row").append(b);

}

function addNewButton(){
// adds new button to the list
	var b = addButton($("#newActor").val());
	$("#button-row").append(b);
	// this sets the click event on the actors class, calls getActorGiphy
	$(document).on("click", ".actors", getActorGiphy);

}//


function addButton(passActor){

	if (passActor.length === 0){
		alert("Please enter an actor");
		return;
	}
	var b = $("<button>");
	b.addClass("actors");
	b.data("data-actor-name", passActor);
	b.attr("value", passActor);
	b.text(passActor);
	
	return b;


}

function getActorGiphy(){
	// gets the giphy api json document for the selected 
	var actorToGet  = $(this).data("data-actor-name");

	var passString = $(this).attr("data-actor-name");
	var passURL = "https://api.giphy.com/v1/gifs/search?api_key="+apiKey+"&q="+actorToGet;
	var holdTbl = "";
	$("#pictTable tbody").empty();
	$.ajax({
        url: passURL,
        method: "GET"
      }).done(function(response){
      // loop thru the data
	  // clears showGiph group
	  console.log(response.data)
      $("#showGiphs").empty();
	      for (var img=0;img < response.data.length; img++){
	      	// creates img div and appends it to the showGipsh id
				 var newDiv =$("<div>");
				//  newDiv.css("border", "solid 1px blue");
				 newDiv.css("display", "inline");
				 newDiv.css("position", "absolue");
				 newDiv.css("left", 0);
				 // creating dynamic id based upon img value
				 newDiv.attr("id", "img-"+img);
				  newDiv.addClass("col-lg-1 eachGiphs");
				 
				 $("#showGiphs").append(newDiv);
				 // creating new img object to append to the dynamic id
				 var newImg =$("<img>");
				 newImg.attr("id", "actorImg"+img);
				 newImg.attr("src",response.data[img].images.fixed_width_still.url);
				newImg.data("data-state", "still");
				newImg.data("data-animate", response.data[img].images.preview_gif.url);   
				newImg.data("data-still", response.data[img].images.fixed_width_still.url);   
				newImg.addClass("show-pict");
				 // creates individual id tab for image.
				  $("#img-"+img).append(newImg);
				 
				var p = $("<p>");
				// adding css to load the text onto the image...
				p.css("display", "inline");
				p.css("position", "absolute");
				p.css("background-color", "silver");
				p.css("color", "red");
				p.css("left", 0);
				p.css("top", 15);
				p.html("<b>Rating: " + response.data[img].rating+"</b>");
				$("#img-"+img).append(p);


	  	}// end for

      });

	     $(document).on("click", ".show-pict", makeShake);


 }// end fcn getActorGiphy

function makeShake(){
	alert("xx")
	console.log($(this).attr("src"));
	console.log($(this).data("data-animate"));
	console.log($(this).data("data-state"))
	//making image inimated vs static
	// when clicked on..
	// if still, then 
	// 1. set src to inimaged 
	// 2. set data-state to animate
	// if animaged, then
	// 1. set srs to still
	// 2. set data-state to still
	if ($(this).data("data-state") === "still"){
		$(this).attr("src",$(this).data("data-animate"));
		$(this).data("data-state","animate");
	} else {
		$(this).attr("src",$(this).data("data-still"));
		

		$(this).data("data-state","still");
	}

}
$("#actorButton").on("click",addNewButton);

$(".actors").on("click",getActorGiphy);

})// end document ready