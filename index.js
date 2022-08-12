// A node script for loading a local csv file and replacing values in a specific column with a new value
var csv = require("csv");
var fs = require("fs");
var file = fs.readFileSync("input.csv", "utf8");
var jsonTagValues = require("./mapFile.json");
var columnHeader = "";

// prompt user to enter column value to replace via command line
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

readline.question(
  `What is the column header for the column values you want to replace?\nColumn header: `,
  (name) => {
    columnHeader = name;
    // find the specific column in the csv file
    csv.parse(file, { columns: true }, function (err, data) {
      let newData = data;
      for (let column of newData) {
        for (let tag of jsonTagValues) {
          if (column[columnHeader].toLowerCase() === tag.value.toLowerCase()) {
            console.log(
              "found a match! replaced " +
                column[columnHeader] +
                " with " +
                tag.tag
            );
            column[columnHeader] = tag.tag;
          }
        }
      }
      // write the new csv file
      csv.stringify(data, function (err, output) {
        fs.writeFileSync("output.csv", output);
      });
    });
    readline.close();
  }
);
