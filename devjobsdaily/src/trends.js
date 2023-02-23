

let percentage = 0;

document.getElementById("gauge").style.transform = "rotate("+percentage*-1+"deg)";

var slider = document.getElementById("myRange");
var output = document.getElementById("demo");
percentage = slider.value;

slider.oninput = function() {
  percentage = slider.value;
  document.getElementById("percent").textContent = Math.abs(percentage)+"%";
  if (percentage<0){
    document.getElementById("delta").textContent = "decrease";
    document.getElementById("gauge").style.filter = "hue-rotate(150deg)";
  } else {
    document.getElementById("delta").textContent = "increase";
    document.getElementById("gauge").style.filter = "hue-rotate(290deg)";
  } 
  document.getElementById("gauge").style.transform = "rotate("+percentage*-1+"deg)";
}
