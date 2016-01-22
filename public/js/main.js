
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
    $board = document.getElementById("board");
    $board.removeChild($obj);
    console.log($obj);
    console.log("destroy event!")
    return true;
  };

  // Main note container
  var noteElement = function(x,y, content){
    // x,y, content variables
    var content = content || "Your Note !";
    var x = x + "px" || 300 + "px";
    var y = y + "px" || 300 + "px";
    console.log(x,y,content);

    // Destroy note element
    $note = document.createElement('div');
    $note.className = "note";
    $note.appendChild(noteDelElement());

    // Note Position
    $note.style.top = y;
    $note.style.left = x;

    // Note Content


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


  var generateNote = function(){
    var $note = noteElement();
    document.body.appendChild($note);
  }

  // public functions
  return{
    init: function(){
      // init notes on board
    },
    addNote: generateNote
  };
}


note = Note();
note.init();
$newButton = document.getElementById('new_note');
$newButton.addEventListener('click', note.addNote );
