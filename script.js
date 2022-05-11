var axios = require("axios");
var htmlCompare = require("html-compare");
var HtmlDiffer = require("html-differ").HtmlDiffer;
var fs = require("fs");

const URL = "https://www.algolia.com/apps/W4Y7TX3BB0/dashboard";

console.log("Fetching html from " + URL);
axios
  .get(URL, {
    params: {
      email: "ishrat.fatima@educative.io",
      password: "A123456!",
      remember_me: 0,
    },
  })
  .then((response) => {
    console.log("Html Received");
    console.log("Reading local html");

    //let local_html = fs.readFileSync("oAuth/1.html", "utf-8");
    writeToFile(response.data);
    //compareByHtmlCompare(response.data, local_html);
  })
  .catch((err) => {
    console.log("Error Fetching html from local repository" + err);
  });

const writeToFile = (htmlContent) => {
  try {
    fs.writeFileSync("algolia/3.html", htmlContent);
    //file written successfully
  } catch (err) {
    console.error(err);
  }
};

const compareByHtmlCompare = (currentWebHtml, local_html) => {
  console.log("Comparing htmls");
  /*var html1 = fs.readFileSync("dropbox.html", "utf-8");
  html2 = fs.readFileSync("2.html", "utf-8");
  var result = htmlCompare.compare(html1, html2);*/
  var result = htmlCompare.compare(currentWebHtml, local_html);
  console.log("Comparison completed");
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
};