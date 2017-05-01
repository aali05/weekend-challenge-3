$(document).ready(onReady);
function onReady(){
  toDoAdd ();
  console.log('JQ up and running');
// event listeners
$('#addtodo').on('click', addAToDo);
// function
function addAToDo() {
  console.log('Add button clicked');
  var objectToSend = {
    todo: $('#listinput').val(),
    status: true
  }; // objectToSend
  console.log('add new todo');
  $.ajax ({
  url: '/addNewToDo',
  type: 'POST',
  data: objectToSend,
  success: function(data){
    console.log('adding client ->' , data);
  }
});
}
 // end addAToDo

function toDoAdd() {
  $.ajax({
    url: '/addToDo',
    type: 'GET',
    success: function(response){
    console.log('adding client ->' , response);

  $('#listitem').empty();
  for (var i = 0; i < response.length; i++) {
    $('#viewList').append('<p>' + response[i].task + " " + response[i].status + '</p>' + '<button id="updateButton">Update</button><button id="deleteButton">Delete</button>');
  }; // end for loop
  } // end success
}); // end ajax
}; // end toDoAdd
}; // end onReady
