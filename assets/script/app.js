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

	var b = addButton(actors[i]);
	
	$("#button-row").append(b);
	//$(document).on("click", ".actors", getActorGiphy);
}

function addNewButton(){
// adds new button to the list
	var b = addButton($("#newActor").val());
	$("#button-row").append(b);
	// this sets the click event on the actors class, calls getActorGiphy
	$(document).on("click", ".actors", getActorGiphy);

}//


function addButton(passActor){
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
	      for (var img=0;img < response.data.length; img++){
	      	// puts 2 sets of images onto 1 row.
	      	// when modulus ne 0, then do nothing..else get the image and 1 minus image.
	      	//
	      	if (img%2 != 0){
	      		holdTbl = holdTbl + "<tr><td><img src='" + response.data[img-1].images.fixed_width_still.url + "'></td><td><img src='" + response.data[img].images.fixed_width_still.url +"'></td></tr>";
	      	} else if (img === response.data.length - 1){
	     		holdTbl = holdTbl + "<tr><td><img src='" + response.data[img-1].images.fixed_width_still.url + "'></td></tr>";
	      	}// end
	      }// end for
	      $('#pictTable tbody:last-child').append(holdTbl);
      });

	// }).done(function( msg ) {
 //    	alert( "Data Saved: " + msg );
 //  	});

	// $.ajax({

	// 	url: passURL,
	// 	method: "GET"

	// })
	// .done(function(response){
	// 	console.log(response);

	// })// end ajas

 }// end fcn getActorGiphy

$("#actorButton").on("click",addNewButton);

$(".actors").on("click",getActorGiphy);


})// end document ready