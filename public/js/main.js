
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
    console.log("destroy event!");
    return true;
  };

  var noteDoneElement = function(){
    $doneButton = document.createElement('a');
    $doneButton.className = "done_button";
    $doneButton.innerHTML = "<i class='ion-ios-checkmark'></i>"
    $doneButton.addEventListener('click', noteDone);
    return $doneButton;
  }

  function noteDone(e){
    $obj = e.target.parentElement.parentElement;
    $obj.style.color = "green";
    console.log($obj);
  }


  //Note Content element
  var noteBodyElement = function(content){
    var content = content;
    $bodyElement = document.createElement('div');
    $bodyElement.className = "note_body";
    $bodyElement.innerHTML = "<p>" + content + "</p>";
    return $bodyElement;
  }

  // Main note container
  var noteElement = function(x,y, content){
    // x,y, content variables
    var content = content || "Your Note !";
    var x = x || 300;
    var y = y || 300;
    console.log(x,y,content);

    // Note element
    $note = document.createElement('div');
    $note.className = "note";

    // Destroy note button
    $note.appendChild(noteDelElement());

    // Done note button
    $note.appendChild(noteDoneElement());

    // Note Content
    $note.appendChild(noteBodyElement(content));
    // Note Footer

    // Note Position
    $note.style.top = y + "px";
    $note.style.left = x + "px";

    // Events
    $note.addEventListener('mousedown', function(e){
      current_element = this;
      console.log(current_element);
      document.addEventListener('mousemove', moveNote);
    }, true);
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

  var generateNotes = function(){

  }

  // public functions
  return{
    init: function(){
      // init notes on board
      console.log("App init")
    },
    addNote: generateNote
  };
}


note = Note();
note.init();
$newButton = document.getElementById('new_note');
$newButton.addEventListener('click', note.addNote );
