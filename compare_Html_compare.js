import htmlCompare from "html-compare";
import fs from "fs";

var html1 = fs.readFileSync("1.html", "utf-8"),
  html2 = fs.readFileSync("2.html", "utf-8");

var result = htmlCompare.compare(html1, html2);
if (result.different) {
  console.log("HTML fragments are different, changes:");
  result.changes.map(function (change) {
    console.log(
      "In node " + change.before.parentPath + ":\n\t" + change.message
    );
  });
} else {
  console.log("No changes found.");
}

console.log("\n\n\n\n");
var result = htmlCompare.compare(html1, html2, {
  tagComparison: { name: 1, id: 0, attributes: 1, contents: 0 },
});
if (result.different) {
  console.log("HTML fragments are different, changes:");
  result.changes.map(function (change) {
    console.log(
      "In node " + change.before.parentPath + ":\n\t" + change.message
    );
  });
} else {
  console.log("No changes found.");
}