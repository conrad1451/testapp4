// I WILL NOT BE CONVERTING THIS TO A DEVBOX. MAYBE LATER. GUESS
// I JUST GOTTA USE BROWSER DEV TOOLS TO GET MY CONSOLE LOGS


import React from "react";
// import auth from "./auth";
// import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
// import * as CSV from "csv-string"
import { useState } from "react";
// Sources:
// [1] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLocaleLowerCase
// [2] https://stackoverflow.com/questions/5296268/fastest-way-to-check-a-string-contain-another-substring-in-javascript
// [3]https://www.tutorialspoint.com/How-to-format-a-float-in-JavaScript

// [4] https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch
// [5] https://stackoverflow.com/questions/26069238/call-multiple-functions-onclick-reactjs

// - could not figure out how to so global variables to the rescue

// source: https://www.delftstack.com/howto/typescript/typescript-cloning-an-object/
function deepCopy<T>(instance: T): T {
  if (instance == null) {
    return instance;
  }

  // handle Dates
  if (instance instanceof Date) {
    return new Date(instance.getTime()) as any;
  }

  // handle Array types
  if (instance instanceof Array) {
    var cloneArr = [] as any[];
    (instance as any[]).forEach((value) => {
      cloneArr.push(value);
    });
    // for nested objects
    return cloneArr.map((value: any) => deepCopy<any>(value)) as any;
  }
  // handle objects
  if (instance instanceof Object) {
    var copyInstance = { ...(instance as { [key: string]: any }) } as {
      [key: string]: any;
    };
    for (var attr in instance) {
      if ((instance as Object).hasOwnProperty(attr))
        copyInstance[attr] = deepCopy<any>(instance[attr]);
    }
    return copyInstance as T;
  }
  // handling primitive data types
  return instance;
}


function isASubstrCaseSensitive(str: string, subStr: string) {
  return str.indexOf(subStr) !== -1;
}

function isASubstr(str: string, subStr: string) {
  return isASubstrCaseSensitive(str.toLowerCase(), subStr.toLowerCase());
}


function anyAreSubStr(str: string, arrayOfSubStr: string[]) {
  let anyAreSubstr = false;

  // CHQ: this loop is designed to remain within
  // until we move through the entire list
  // or we encounter the first array entry that
  // is a substring.
  let i = 0;
  while (!anyAreSubStr && i < arrayOfSubStr.length) {
    anyAreSubstr = isASubstr(str, arrayOfSubStr[i]);
    ++i;
  }

  return anyAreSubstr;
}

function allAreSubStr(str: string, arrayOfSubStr: string[]) {
  let allAreSubstr = true;

  // CHQ: this loop is designed to remain within
  // until we move through the entire list
  // or we come across an array entry that is not
  // a substring.
  let i = 0;
  while (allAreSubstr && i < arrayOfSubStr.length) {
    allAreSubstr = isASubstr(str, arrayOfSubStr[i]);
    ++i;
  }

  return allAreSubstr;
}

function getAllIndexes(arr, val) {
  let indexes = [];
  let i = arr.indexOf(val);

  while (i !== -1) {
    indexes.push(i);
    i = arr.indexOf(val, i + 1);
  }
  return indexes;
}

function onlyBlanks(theLine: string) {
  let i = 0;
  let isABlank = true;

  while (i < theLine.length && isABlank) {
    isABlank = theLine.charAt(i) === " ";
    ++i;
  }

  return isABlank;
}

// CHQ: some tests to ensure that "test" is
// different from "lineToExamine".
function lowerCasingTestSuite(thisLine: string) {
  let test = String(thisLine);
  let lineToExamaine = String(test).toLocaleLowerCase();

  // CHQ: test1 passed
  // test += "TESTME";
  // console.log("lineToExamaine is ", lineToExamaine, " rather than ", test);

  // CHQ: test2 passed
  // let otherTest = String(thisLine);
  // let lineToExamaine2 = "bro" + String(otherTest).toLocaleLowerCase();
  // console.log(
  //   "lineToExamaine2 is ",
  //   lineToExamaine2,
  //   " rather than ",
  //   otherTest
  // );

  // CHQ: test3 passed
  // let otherTest2 = String(thisLine);
  // let lineToExamaine3 = String(thisLine).toLocaleLowerCase();

  // console.log(
  //   "lineToExamaine3 is ",
  //   lineToExamaine3,
  //   " rather than ",
  //   otherTest2
  // );
}

 
 

function createNewText(anArrayOfLines: string[]) {
  // onlyBlanks();

  let numBlankLines = 0;
  let numContentLines = 0;
  let numCommentLines = 0;
  let numFunctions = 0;

  let listOfFunctions = [];

  let newArrayOfLines: string[] = [];

  let newArrayOfBlanks: string[] = [];
  anArrayOfLines.forEach((line: string) => {
    if (!onlyBlanks(line)) {
      let tmpStr = line.trim();
      // tmpStr.trim

      if(tmpStr[0] === "/" || tmpStr[0] === "*")
      {
        ++numCommentLines;
      }
      else
      {
        let isPotentialFunction = isASubstr(tmpStr, "var") && isASubstr(tmpStr, "function");
        
        
        if(isPotentialFunction){
 

          let posVarKeyword = tmpStr.indexOf("var");
          let posFunctionKeyword = tmpStr.indexOf(" = function");

          isVerifiedFunction = posVarKeyword < posFunctionKeyword;

          if(isVerifiedFunction)
          {
          let functionName = tmpStr.substring(posVarKeyword+3, posFunctionKeyword)
          listOfFunctions.push([numFunctions, functionName]);
          ++numFunctions;
          }
        }
        ++numContentLines;
      }
      newArrayOfLines.push(line);
    } else {
      newArrayOfBlanks.push(line);
      ++numBlankLines;
    }
  });

  console.log("content line is");
  console.log(newArrayOfLines);
  console.log("and here are the stats for the input");

  let programScanResults = "content lines: " + String(numContentLines)
  + " | comment lines: " + String(numCommentLines) 
  + " | blank lines: " + String(numBlankLines);

  return [newArrayOfLines, programScanResults, listOfFunctions];
}

// CHQ: may use this for graphing data from time log insight tabulations?
function equalLengths(csvFile) {
  let tmp = csvFile;
  let matchingFieldCounts = true;

  const firstLine = tmp[0];

  let rowNum = 0;

  /*
  
    for some reason, this function 
    isn't flagging the following as an error:

    "
    x, y
    1, 2
    3, 
    5, 6
    "

    and When the graph is applied, it 
    pretends as if the missing value is a 0.

   */

  while (matchingFieldCounts && rowNum < csvFile.length) {
    let rowLength = csvFile[rowNum].length;
    let sameLengths = rowLength === firstLine.length;

    let endVal = csvFile[rowNum][rowLength - 1];

    // all vals in list are of type "string"
    // console.log(typeof endVal);

    // endVal.length === 1;

    let missingEndVal = endVal === "";
    matchingFieldCounts = sameLengths && !missingEndVal;
    ++rowNum;
  }

  return matchingFieldCounts;
}

// standard helper functions

// function occurencesOfASubstring(targetStr, substr) {
//   return (targetStr.match(/substr/g) || []).length;
// }

// Purpose: gives as a text output
// the nutrition data for 1 unit of each of the chosen foods

function createArrayOfIndices(size) {
  let myArr = [];
  for (let i = 0; i < size; ++i) {
    myArr.push(i);
  }
  return myArr;
}

// https://www.w3schools.com/js/js_random.asp

// source: https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
function makeid(length: number) {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

function isAlphanumeric(str: string) {
  return /^[a-zA-Z0-9]+$/.test(str);
}

function isAlpha(str: string) {
  return /^[a-zA-Z]+$/.test(str);
}

function isNumeric(str: string) {
  // following fails: allows '1a11b3' to be considered a number
  return isAlphanumeric(str) && !isAlpha(str);
}

// CHQ: yes the time complexity for this function
// is O(n), but that's okay
function isAnInteger(str: string) {
  let isANum = true;
  let i = 0;
  while (isANum && i < str.length) {
    let isCharANum = isNumeric(str[i]);

    // CHQ: as long as isCharANum is a number, then isANum is true;

    isANum = isCharANum;

    ++i;
  }

  // if i === str.length, we know it is true. In all circumstances,
  // isANum should equal (i === str.length)
  return isANum;
}

function isAFloatingPoint(str: string) {
  let isFloatingPt = false;

  // let pos1 = str.search("."); //nope
  // let pos1 = str.indexOf("."); // want 1.7 to become 7, not .7
  let pos1 = str.indexOf(".") + 1;

  if (pos1 !== -1 && pos1 < str.length) {
    let str2 = str.substring(pos1);

    // let pos2 = str2.search(".");
    let pos2 = str2.indexOf(".");

    if (pos2 === -1 && isNumeric(str2)) {
      isFloatingPt = true;
    }
  }

  return isFloatingPt;
}

function isANumber(str: string) {
  return isAnInteger(str) || isAFloatingPoint(str);
}
 

const ScanProcessingJS: React.FC = () => {
  const [list, setList] = useState<any[]>([]); // source: https://www.telerik.com/blogs/getting-started-typescript-react
  const [selected, setSelected] = useState({ x: {}, y: {} });

  const [text, setText] = useState<string[]>([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const { csv } = event.target.elements;

    // source: https://stackoverflow.com/questions/9196954/how-to-read-line-by-line-of-a-text-area-html-tag
    let arrayOfLines = csv.value.split("\n");

    // arrayOfLines is array where every element is string of one line

    let thetmp1 = createNewText(arrayOfLines);
    // let brobro = thetmp1[0]; 
    // console.log("THIS IS THE BRO")
    // console.log(brobro);

    // let organizedData = produceOrganizedData(arrayOfLines);
 

    let listAsText = "List of functions in the program:\n\n\n";

    let textForDrawFunctions = "List of draw functions in the program:\n\n";
    let textForRecipeFunctions = "List of recipe functions in the program:\n\n";
    let textForOtherFunctions = "List of other functions in the program:\n\n";

    let fullFunctionList = thetmp1[2];

    let drawFunctions = [];
    let recipeFunctions = [];
    let otherFunctions = [];

    for(let m = 0; m < fullFunctionList.length; ++m)
    {
      let curFunction = fullFunctionList[m];
      // listAsText += (String(curFunction[0]) + "." + curFunction[1]);
      // listAsText += "\n";

      let functionName = curFunction[1];

      if(isASubstr(functionName, "draw"))
      {
        drawFunctions.push(functionName);
      }
      else if(isASubstr(functionName, "recipe"))
      {
        recipeFunctions.push(functionName);
      }
      else
      {
        otherFunctions.push(functionName);
      }

    }

    for (let n = 0; n < drawFunctions.length; ++n)
    {
      let curFunction = drawFunctions[n];
      textForDrawFunctions += curFunction;
      textForDrawFunctions += "\n";
    }
    for (let n = 0; n < recipeFunctions.length; ++n)
    {
      let curFunction = recipeFunctions[n];
      textForRecipeFunctions += curFunction;
      textForRecipeFunctions += "\n";
    }
    for (let n = 0; n < otherFunctions.length; ++n)
    {
      let curFunction = otherFunctions[n];
      textForOtherFunctions += curFunction;
      textForOtherFunctions += "\n";
    }

    let outputMessage = "Overall Scan:\n\n" + thetmp1[1] +"\n\n------------------------------------------------------------\n\n";
    outputMessage += listAsText;
    outputMessage += textForDrawFunctions;
    outputMessage += "\n\n\n"
    outputMessage += textForRecipeFunctions;
    outputMessage += "\n\n\n"
    outputMessage += textForOtherFunctions;

    setText(outputMessage);
  };

  const [dropdownOpen, setOpen] = useState(false);

  const [modalOpen3, setModalOpen3] = useState(false);

  const toggle = () => setOpen(!dropdownOpen);

  const toggleModal3 = () => setModalOpen3(!modalOpen3);

  let randomList = [
    { name: "test", values: ["d", "e", "f"] },
    { name: "test2", values: ["a", "b", "c"] }
  ];

  function myCallBack() {
    let myChoice = 1;

    if (myChoice === 0) {
      alert("bro alert");
    } else if (myChoice === 1) {
      console.log("bro console");
    }
  }

  return (
    <section className="line-page">
      <h1>Count Lines of Code</h1>

      <p>Counts the lines of code in any given program written in Processing</p>
      <form onSubmit={handleSubmit}>
        <textarea
          name="csv"
          placeholder="Paste the code here...."
          rows={10}
          required
        ></textarea>
        <button type="submit">Process</button>
      </form>
      <textarea
        name="resultField"
        placeholder="Program analysis comes here"
        value={text}
        rows={10}
        required
      ></textarea>
    </section>
  );

};

export default ScanProcessingJS;
