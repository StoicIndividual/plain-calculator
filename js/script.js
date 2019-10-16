const startCalc = () => {
    // for display
    const displayS = document.querySelector('#content #calcbody .display .result');
    const displayP = document.querySelector('#content #calcbody .display .intro');
    const displayR = document.querySelector('#content #calcbody .display .output');
    //for buttons
    const Buttons = document.querySelectorAll('#content #calcbody .buttonsbody .numbers button');
    const Operators = document.querySelectorAll('#content #calcbody .buttonsbody .functions button');
    
    Buttons.forEach(button => {
	button.addEventListener('click', function(){
	    displayP.innerHTML='';
	    const addToDisplay = document.createTextNode(this.value);
    	    displayS.appendChild(addToDisplay);
	});	
    });
    Operators.forEach(operator => {
	operator.addEventListener('click', function() {
	    if(operator.classList.contains("clear")) {
		const displaySValue = displayS.innerHTML;
		const cleared = displaySValue.slice(0, displaySValue.length - 1);
		displayS.innerHTML = cleared;
	    } else if (operator.classList.contains("equal")) {
		const input = displayS.innerHTML;
		const numbers = input.split(/\D/g);
		const op = input.split(/\d/g).filter(Boolean);
		const displayArr=displayS.innerHTML.split(' ');
		const displayString=displayArr.toString();
		const displayOnDisplay= new Function('return '+displayString);
		// or const displayOnDisplay = eval(displayString); but not recomended?
		displayR.innerHTML=displayOnDisplay();
		displayS.innerHTML='';

	    } else if (operator.classList.contains("reset")) {
		displayP.innerHTML='Output goes here...';
		displayR.innerHTML='';
		displayS.innerHTML='';   
	    } else {
		displayP.innerHTML='';
		const previousVal = document.createTextNode(displayR.innerHTML);
		const addToDisplay = document.createTextNode(this.value);
		displayS.appendChild(previousVal);
		displayR.innerHTML='';
    		displayS.appendChild(addToDisplay);	    
	    }
	});	
    });
};

startCalc();
