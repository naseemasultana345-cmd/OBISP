let result = document.getElementById("result");
let history = document.getElementById("history");

let expression = "";

function appendValue(value){

  if(result.innerText === "0" && value !== "."){
    expression = value;
  } else {
    expression += value;
  }

  result.innerText = expression;
}

function clearDisplay(){

  expression = "";
  history.innerText = "";
  result.innerText = "0";

}

function deleteLast(){

  expression = expression.slice(0,-1);

  if(expression === ""){
    result.innerText = "0";
  } else {
    result.innerText = expression;
  }

}

function calculate(){

  try{

    history.innerText = expression;

    expression = eval(expression).toString();

    result.innerText = expression;

  } catch(error){

    result.innerText = "Error";
    expression = "";

  }

}

// Keyboard Support

document.addEventListener("keydown", function(event){

  let key = event.key;

  if(!isNaN(key) || ['+','-','*','/','.','%'].includes(key)){
    appendValue(key);
  }

  else if(key === "Enter"){
    calculate();
  }

  else if(key === "Backspace"){
    deleteLast();
  }

  else if(key === "Escape"){
    clearDisplay();
  }

});