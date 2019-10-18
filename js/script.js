const startCalc = () => {
    // for display
    const displayS = document.querySelector('#content #calcbody .display .result');
    const displayP = document.querySelector('#content #calcbody .display .intro');
    const displayR = document.querySelector('#content #calcbody .display .output');
    //for buttons
    const Buttons = document.querySelectorAll('#content #calcbody .buttonsbody .numbers button');
    const Operators = document.querySelectorAll('#content #calcbody .buttonsbody .functions button');
    //for history
    const forwardAndBack = document.querySelectorAll('#content #calcbody .buttonsbody .history button')
    let histArr = [];
    let futArr = [];

    forwardAndBack.forEach(time => {
	time.addEventListener('click', function() {
	    if(time.classList.contains('back')) {
		const redundantFut = futArr.includes(displayS.innerHTML);
		if(histArr.length === 0) {
		    if (displayS.innerHTML === '') {
		    displayP.innerHTML='';
		    displayP.innerHTML='Output goes here...';
		    displayS.innerHTML='';
		    } else {
	            futArr.push(displayS.innerHTML);
		    displayP.innerHTML='';
		    displayP.innerHTML='Output goes here...';
		    displayS.innerHTML='';
		    }
		} else {
		    if(displayS.innerHTML==='') {
			const prevVal = histArr[histArr.length-1];
			displayR.innerHTML='';
			displayS.innerHTML='';
			displayS.innerHTML=prevVal;
			histArr.pop();
			console.log(histArr);
			console.log(futArr);
		    } else {
			const prevVal = histArr[histArr.length-1];
			displayR.innerHTML='';
			futArr.push(displayS.innerHTML);
			displayS.innerHTML='';
			displayS.innerHTML=prevVal;
			histArr.pop();
			console.log(histArr);
			console.log(futArr);
		    }
		} 
	    } else {
		const comparison = futArr.length <= 0;
		if(!comparison) {
		    if (displayP.innerHTML === 'Output goes here...') {
			const nextVal = futArr[futArr.length-1];
			displayP.innerHTML='';
			displayR.innerHTML='';
			displayS.innerHTML='';
			displayS.innerHTML=nextVal;
			futArr.pop();
			console.log(histArr);
			console.log(futArr);
		    } else {
			const nextVal = futArr[futArr.length-1];
			const redundantHist = histArr.includes(displayS.innerHTML);
			displayR.innerHTML='';
			histArr.push(displayS.innerHTML);
			displayS.innerHTML='';
			displayS.innerHTML=nextVal;
			futArr.pop();
			console.log(histArr);
			console.log(futArr);    
		    }
		}
	    }
	});
    });
    
    Buttons.forEach(button => {
	button.addEventListener('click', function(){
	    futArr = [];
	    displayP.innerHTML='';
	    displayR.innerHTML='';
	    const addToDisplay = document.createTextNode(this.value);
    	    displayS.appendChild(addToDisplay);
	});	
    });
    Operators.forEach(operator => {
	operator.addEventListener('click', function() {
	    if(operator.classList.contains("clear")) {
		if (displayS.innerHTML.length===1) {
		    displayP.innerHTML='Output goes here...';
		    displayS.innerHTML='';
		} else {
		    const displaySValue = displayS.innerHTML;
		    const cleared = displaySValue.slice(0, displaySValue.length - 1);
		    displayS.innerHTML = cleared;    
		}
	    } else if (operator.classList.contains("equal")) {
		const displayArr=displayS.innerHTML.split(' ');
		const displayString=displayArr.toString();
		const displayOnDisplay= new Function('return '+displayString);
		// or const displayOnDisplay = eval(displayString); but not recomended?
		displayR.innerHTML=displayOnDisplay();
		
		histArr.push(displayS.innerHTML);
		displayS.innerHTML='';

	    } else if (operator.classList.contains("reset")) {
		histArr = [];
		futArr = [];
		displayP.innerHTML='Output goes here...';
		displayR.innerHTML='';
		displayS.innerHTML='';   
	    } else {
		futArr = [];
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
