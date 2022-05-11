/*var fs = require("fs");
(HtmlDiffer = require("@markedjs/html-differ").HtmlDiffer),
  (logger = require("@markedjs/html-differ/lib/logger"));*/

import fs from "fs";
import { HtmlDiffer } from "html-differ";

//import logger from "@markedjs/html-differ/lib/logger";
//import HtmlDiffer from "@markedjs/html-differ";
///var logger = require("@markedjs/html-differ/lib/logger");

var html1 = fs.readFileSync("1.html", "utf-8"),
  html2 = fs.readFileSync("2.html", "utf-8");

//var html1 = `<body><h1>Title</h1></body>`;
//var html2 = `<body><h2>Titfffffle</h2></body>`;

var options = {
  ignoreAttributes: ["id", "class", "value"],
  compareAttributesAsJSON: [],
  ignoreWhitespaces: true,
  ignoreComments: true,
  ignoreEndTags: false,
  ignoreDuplicateAttributes: true,
};

var htmlDiffer = new HtmlDiffer(options);

async function run() {
  const diff = await htmlDiffer.diffHtml(html1, html2);
  const isEqual = await htmlDiffer.isEqual(html1, html2);

  console.log(diff);
}

run();