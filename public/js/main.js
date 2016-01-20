
var Note = function(){
  
  var current_element = null;

  // Note destroy button
  var noteDelElement = function(){
    $delButton = document.createElement('a');
    $delButton.className = "close_button";
    $delButton.innerHTML = "<i class='ion-ios-close'></i>";
    $delButton.addEventListener('click', noteDestroy);
    return $delButton;
  }

  function noteDestroy(e){
    $obj = e.target.parentElement.parentElement;
    console.log($obj);
    console.log("destroy event!")
    return true;
  };

  // Main note container
  var noteElement = function(){
    $note = document.createElement('div');
    $note.className = "note";
    $note.appendChild(noteDelElement());
    
    // Events
    $note.addEventListener('mousedown', function(e){
      current_element = this;
      console.log(current_element);
      document.addEventListener('mousemove', moveNote);
    });
    $note.addEventListener('mouseup', function(e){
      document.removeEventListener('mousemove', moveNote);
      console.log("event triggers!");
      current_element = null;
    });
    
    return $note;
  };

  function moveNote(e){
    $obj = current_element;
    $obj.style.left = e.clientX - 50 + "px";
    $obj.style.top = e.clientY - 50 + "px";
    return true;
  }

  // public functions
  return{
    init: function(){
      // init notes on board
    },
    addNote: function(){ 
      document.body.appendChild(noteElement());
    }
  };
}
 

note = Note();
note.init();
$newButton = document.getElementById('new_note');
$newButton.addEventListener('click', function(e){
  note.addNote();
});