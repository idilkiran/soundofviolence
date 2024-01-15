// set up text to print, each item in array is new line
var aText = new Array(
    "The sound you heard is the sonification of the “Violence against Women in 2023” dataset.", 
    "The dataset is derived from The Organisation for Economic Co-operation and Development (OECD) and contains two different indicators.",
    "The first indicator focuses on attitudes toward violence, represented by the percentage of women who agree that a husband or partner is justified in beating his wife or partner under certain circumstances.",
    "The second indicator addresses the prevalence of violence experienced over a lifetime, specifically highlighting the percentage of women who have suffered physical and/or sexual violence from an intimate partner.",
    "The data is transformed into MIDI notes using Python. The value of attitudes toward violence determines the time of each note, while the prevalence of violence in the lifetime controls the pitch and velocity."
    );
    var iSpeed = 75; // time delay of print out
    var iIndex = 0; // start printing array at this posision
    var iArrLength = aText[0].length; // the length of the text array
    var iScrollAt = 20; // start scrolling up at this many lines
     
    var iTextPos = 0; // initialise text position
    var sContents = ''; // initialise contents variable
    var iRow; // initialise current row
     
    function typewriter()
    {
     sContents =  ' ';
     iRow = Math.max(0, iIndex-iScrollAt);
     var destination = document.getElementById("typedtext");
     
     while ( iRow < iIndex ) {
      sContents += aText[iRow++] + '<br />';
     }
     destination.innerHTML = sContents + aText[iIndex].substring(0, iTextPos) + "_";
     if ( iTextPos++ == iArrLength ) {
      iTextPos = 0;
      iIndex++;
      if ( iIndex != aText.length ) {
       iArrLength = aText[iIndex].length;
       setTimeout("typewriter()", 500);
      }
     } else {
      setTimeout("typewriter()", iSpeed);
     }
    }
    
    typewriter();