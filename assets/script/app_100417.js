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
      $("#showGiphs").empty()
	      for (var img=0;img < response.data.length; img++){
	      	console.log(img);
	      	// creates img div and appends it to the showGipsh id
				 var newDiv =$("<div style='display: inline;'>");
				 newDiv.attr("id", "img-"+img);
				 newDiv.addClass("col-lg-2");
				 newDiv.text(response.data[img].rating);
				 $("#showGiphs").append(newDiv);
				var newImg =$("<img>");
				 newImg.attr("id", "actorImg")
		      	 newImg.attr("src",response.data[img].images.fixed_width_still.url);
		      	 newImg.data("data-state", "still");
				 newImg.addClass("col-lg-3 show-pict");
				 $("#img-"+img).append(newImg);
				  
				// var p = $("<p>");
				// p.attr("id", "text")
				// p.text("helloxxx");
				// $("#actorImg").append(p);


		      	 //newDiv.text("hello");
	      //$('#pictTable tbody:last-child').append(holdTbl);
	    //   $("#showGiphs").append(newImg);
	  	}
	      $(document).on("click", ".show-pict", makeShake);

      });
      // binding the makeShake method to the new element.


 // <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
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

function makeShake(){

	console.log($(this));
}
$("#actorButton").on("click",addNewButton);

$(".actors").on("click",getActorGiphy);

$(".show-pict").on("click",function(){
	alert($(this).data-state);
});

})// end document ready