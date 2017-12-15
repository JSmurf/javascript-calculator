$(document).ready(function() {

  // Variables to hold values to be calculated, and to validate
  var calcArr = [""];
  var calcStr;
  var memArr = [""];
  var funcCheck = ["/","*","-","+"];
  // Functions to update the view on the screen, and 
  function update() {
    calcStr = calcArr.join("");
    $(".textBox").html(calcStr);
  }
  function getTotal(){
    calcStr = calcArr.join("");
    $(".textBox").html(eval(calcStr));   
  }
  
  
  // We can actually refer to all buttons and give them a function, and then refer to this.id for specific operations
$("button").on("click", function() {
  if(this.id==="total"){
    getTotal();
  } 
  else if(this.id==="clrAll"){
    calcArr = [""];
    update();
  }
  else if(this.id==="clrOne"){
    calcArr.pop();
    update();
  }
  // This adds an item to the memory variable, and memRec recovers it
  else if(this.id==="memAdd"){
    memArr = calcArr;
  }
 else if(this.id==="memRec"){
   calcArr = memArr;
   update();
  } else if (this.id==="neg"){
    if(calcArr[0]!="-"){
      calcArr.unshift("-");
    } else {
      calcArr.shift();
    }
    update();
  }
  // Here, we are checking to see if we have duplicate operations in a row, then we will check for multiple decimal points
    else if(funcCheck.includes(this.id)){ 
      if(calcArr.length < 1) {
         console.log("Error: Please enter a value first");
    }
      else if (funcCheck.includes(calcArr[calcArr.length-1]) ){
        console.log("Error: Multiple consecutive opperations");
      } else {
        calcArr.push(this.id);
      }
      update();
    }
  else if(this.id==="."){
          if (calcArr.includes(".")){
            console.log("Error: Multiple decimals detected");
          } 
    else {
      calcArr.push(".");
    }
    update();
  } 
  // With these two functions, we're actually replacing our entire calcArr, otherwise, if we continue to make calculations it uses the previous calcArr. I'm sure there's a better way to do this, and I will change this when I figure that out
  else if(this.id==="sqr"){
     calcArr = [Math.pow(eval(calcArr.join("")),2)];   
     update();
  }
  else if(this.id==="sqrt"){
     calcArr = [Math.sqrt(eval(calcArr.join("")))];   
     update();
  }
    //Every other case, used for numbers
  else {
    calcArr.push(this.id);
    update();
          
  }
  
});

  
  // End of program
});
// It's important to note at this point that the JQuery eval() function DOES follow order of operations (8 * 8 + 4 / 2 = 66). If I want to truly duplicate the TI-108, I will have to find a way to force this to not follow those rules.

//I have decided to waiver from the original "simulate TI-108" plan, so this is also largely irrelevant.