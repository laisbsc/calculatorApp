(function() {
  "use strict"; //just in case

  //getting elements
  let elem = function(element) {
    if (element.charAt(0) === "#") {
      //if element has ID
      return document.querySelector(element); //return the element
    }
    return document.querySelectorAll(element); //else, return all elements on the list
  };

  //declaring variables on bulk
  let display = elem("#display"), //calculator's display
    equal = elem("#equal"), //'=' button
    numbers = elem(".num"), //list of numbers [className]
    operators = elem(".operator"), //list of operators [className]
    currentNum = "",
    prevNum = "",
    result,
    operator;

  //return clicked number
  let setNum = function() {
    if (result) {
      //if result is being displayed, reset number.
      currentNum = this.getAttribute("data-num");
      result = "";
    } else {
      //else, add clicked digit to previous one
      currentNum += this.getAttribute("data-num");
    }
    display.innerHTML = currentNum; //display current number
  };

  //move number from currentNum to prevNum when operator is clicked
  let moveNum = function() {
    prevNum = currentNum;
    currentNum = "";
    operator = this.getAttribute("data-operator");

    equal.setAttribute("data-result", ""); //reset result
  };

  //calculate result when equalButton is clicked
  let displayResult = function() {
    //type casting input string to float
    currentNum = parseFloat(currentNum);
    prevNum = parseFloat(prevNum);
    
    switch (operator) {
      case "addition":
        result = prevNum + currentNum;
        break;
      case "subtract":
        result = prevNum - currentNum;
        break;
      case "multiply":
        result = prevNum * currentNum;
        break;
      case "division":
        result = prevNum / currentNum;
        result = Math.round(result*1000000000) / 1000000000; //round the result (10e9)
        break;
       
      default:
        //in case '=' is pressed without an operator
        result = currentNum; //keep the current number on display
    }
    
    //if result is indefined
    if (!isFinite(result) || isNaN(result)) {
      result = "Undefined."; //return message error
      // }
    }

    //display result
    display.innerHTML = result;
    equal.setAttribute("data-result", result);

    prevNum = 0; //resets the previous number
    currentNum = result; //stores the result
  };

  //clear button function
  let clearBtn = function() {
    prevNum = "";
    currentNum = "";
    display.innerHTML = "0";
    equal.setAttribute("data-result", result);
  };

  //click event for numbers
  for (let i = 0; i < numbers.length; i++) {
    //loop through number's list
    numbers[i].addEventListener("click", setNum, false);
  }

  //click event for operators
  for (let j = 0; j < operators.length; j++) {
    //loop through operator's list
    operators[j].addEventListener("click", moveNum, false);
  }
  //click event to equal button
  elem("#equal").addEventListener("click", displayResult, false);

  //click event to clear button
  elem("#clear").addEventListener("click", clearBtn, false);
})();
