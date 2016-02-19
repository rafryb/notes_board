
var Db = function(){
	api_prefix = "/api";

  var readyCheck = function(param){
    console.log("hello form db " + api_prefix + " " + param);
  }

	return{
    readyCheck: readyCheck

	}
}

var Note = function(){

  var current_element = null;

  var db = Db();

  var month_names = [
    "styczen", "luty", "marzec",
    "kwiecien", "maj", "czerwiec",
    "lipiec", "sierpien", "wrzesien",
    "pazdziernik", "listopad", "grudzien"
  ];

  // helpers
  var helpers = {
    getCurrentDate: function(){
      var d = new Date();
      var day = d.getDate();
      var month = d.getMonth();
      var year = d.getFullYear();
      var current_time = day + " " + month_names[month] + " " + year;
      return current_time;
    }
  }

  // events
  var events = {
    noteDestroy: function (e){
      console.log("destroy event triggers");
      var $obj = e.target.parentElement.parentElement;
      var $board = document.getElementById("board");
      $board.removeChild($obj);
      console.log($obj);
      console.log("destroy event!");
      return true;
    },
    noteDone: function (e){
      console.log("done event triggers");
      console.log(db.readyCheck());
      var $obj = e.target.parentElement.parentElement;
      $obj.style.color = "green";
      // current time
      current_time = helpers.getCurrentDate();
      var $footer = $obj.childNodes[3];
      $footer.innerHTML = "<p>" + current_time + " Done!</p>";
      return true;
    },
    moveNote: function (e){
      var $obj = current_element;
      $obj.style.left = e.clientX - 50 + "px";
      $obj.style.top = e.clientY - 50 + "px";
      return true;
    }
  }

  // Note destroy button
  var noteDelElement = function(){
    var $delButton = document.createElement('a');
    $delButton.className = "close_button";
    $delButton.innerHTML = "<i class='ion-ios-close'></i>";
    $delButton.addEventListener('click', events.noteDestroy);
    return $delButton;
  }

  var noteDoneElement = function(){
    var $doneButton = document.createElement('a');
    $doneButton.className = "done_button";
    $doneButton.innerHTML = "<i class='ion-ios-checkmark'></i>"
    $doneButton.addEventListener('click', events.noteDone);
    return $doneButton;
  }

  function noteDone(e){
    $obj = e.target.parentElement.parentElement;
    $obj.style.color = "green";

    // current time
    current_time = helpers.getCurrentDate();
    $footer = document.getElementsByClassName("footer")[0];
    $footer.innerHTML = "<p>" + current_time + " Done!</p>";
  }

  //Note Content element
  var noteBodyElement = function(content){
    var content = content;
    var $bodyElement = document.createElement('div');
    $bodyElement.className = "note_body";
    $bodyElement.innerHTML = "<p>" + content + "</p>";
    return $bodyElement;
  }

  var noteFooterElement = function(){
    var current_time = helpers.getCurrentDate();
    var $footerElement = document.createElement('div');
    $footerElement = document.createElement('div');
    $footerElement.className = "footer";
    $footerElement.innerHTML = "<p>" + current_time + "</p>";
    return $footerElement;
    }

  // Main note container
  var noteElement = function(x,y, content){
    // x,y, content variables
    var content = content || "Your Note !";
    var x = x || 300;
    var y = y || 300;
    console.log(x,y,content);

    // Note element
    var $note = document.createElement('div');
    $note.className = "note";

    // Destroy note button
    $note.appendChild(noteDelElement());

    // Done note button
    $note.appendChild(noteDoneElement());

    // Note Content
    $note.appendChild(noteBodyElement(content));

    // Note Footer
    $note.appendChild(noteFooterElement());

    // Note Position
    $note.style.top = y + "px";
    $note.style.left = x + "px";

    // Note Events
    $note.addEventListener('mousedown', function(e){
      current_element = this;
      console.log(current_element);
      if (e.target === this){
        document.addEventListener('mousemove', events.moveNote);
      }
    });
    $note.addEventListener('mouseup', function(e){
      if (e.target === this){
        document.removeEventListener('mousemove', events.moveNote);
        console.log("mouse up");
      }
      current_element = null;
    });

    return $note;
  };

  var generateNote = function(content){
    var $note = noteElement(null,null,content);
    return $note;
  }

  var generateNotes = function(){
     var $notes_obj = []
     var notes = [{
       x: 100,
       y: 200,
       content: "This is content"
     },
     {
       x: 600,
       y: 500,
       content: "This is second content"
     }
     ];
     for(var i in notes){
       var $note =  noteElement(notes[i].x, notes[i].y, notes[i].content)
       $notes_obj.push($note);
     }
     console.log($notes_obj);;
     return $notes_obj;
  }

  // public functions
  return{
    init: function(){
      var $noteBoard = document.getElementById('board');
      var $notes = generateNotes();
      console.log($notes);
      for(var i in $notes){
        console.log(i);
        $noteBoard.appendChild($notes[i]);
      }
      // init notes on board
      console.log("App init");
    },
    addNote: generateNote
  };
}


note = Note();
note.init();

// Elements
$newButton = document.getElementById('new_note');
$closeForm = document.getElementById('close_form');
$submitNote = document.getElementById('submit_note');
$noteWindow = document.getElementById('background');
$noteInput = document.getElementById('new_note_content');


// Main page events
$newButton.addEventListener('click', function(e){
  $noteWindow.style.visibility = "visible";
});

$closeForm.addEventListener('click', function(e){
  $noteInput.value = "";
  $noteWindow.style.visibility = "hidden";
});

$submitNote.addEventListener('click', function(e){
  var content = $noteInput.value;
  document.body.appendChild(note.addNote(content));
  $noteInput.value = "";
  $noteWindow.style.visibility = "hidden";
});
