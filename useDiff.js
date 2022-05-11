var htmldiff = require("html-differ").HtmlDiffer;

let originalHTML = `
    <p>Hello Mr. Wayne, decide what to do:</p>
    <ul>
        <li>Call Alfred</li>
        <li>Take Thalia Al Gul to the cinema</li>
        <li>Save Gotham</li>
    </ul>
    <span>Use the mouse to choose an option.</span>
`;

let newHTML = `
<p>Hello Batman, decide what to do:</p>
<ul>
    <li>Kill The Joker</li>
    <li>Save Thalia Al Gul</li>
    <li>Save Gotham</li>
</ul>
<span>Use the batarang to choose an option.</span>
`;

// Diff HTML strings
let output = htmldiff(originalHTML, newHTML);

// Show HTML diff output as HTML (crazy right?)!
document.getElementById("output").innerHTML = output;




//*[@id="new_user"]/button

//--------------

// let oldData= <span id="blah" class="ololo" tabIndex="1">Text</span>
// let newData= <span tabIndex="1" id="blah" class="ololo">Text</span>

// const compareHTML=()=>{
//   if (htmlDiffer.isEqual(oldData,newData)){
//     console.log("************ Hurray *************");
//   }
//   else{
//     console.log("************ Alas *************");
//   }
// };
// compareHTML();

var htmlCompare = require('html-compare');
 
var result = htmlCompare.compare('<div>Some HTML elements</div>', '<div>Some HTML</div>');
if (result.different) {
  console.log("HTML fragments are different, changes:");
  result.changes.map(function(change) {
    console.log("In node " + change.before.parentPath + ":\n\t" + change.message);
  });
} else {
  console.log("*********No changes found.");
}