$( document ).ready(function() {
	let result = undefined,
	numberBuilder = [],
	currentNumber = 0,
	convertedNumber,
	eq = [],
	mathThis = [],
	mathOperator,
	tempNum;

	const MAKECLICKSWORK = function(keyPressed) {

		switch(keyPressed) {
			case '48':
			case '49':
			case '50':
			case '51':
			case '52':
			case '53':
			case '54':	
			case '55':
			case '56':
			case '57':
				keypressed = parseInt(keyPressed);
				ENTERNUMBER(keyPressed);
				break;
			case 'Multiply':
				MULTIPLY();
				break;
			case 'Subtract':
				SUBTRACT();
				break;
			case 'Add':
				ADD();
				break;
			case 'Power':
				POWER();
				break;
			case 'Enter':
				ENTER();
				break;
			case 'Clear':
				CLEAR();
				break;
			case 'Divide':
				DIVIDE();
				break;
			default:
				break;
		}
	}

	const OPERATENUMBER = function() {
			switch (mathOperator) {
				case "divide":
					currentNumber = mathThis[0] / mathThis[1];
					mathThis = [currentNumber];
					break;
				case "multiply":
					currentNumber = mathThis[0] * mathThis[1];
					mathThis = [currentNumber];
					break;
				case "subtract":
					currentNumber = mathThis[0] - mathThis[1];
					mathThis = [currentNumber];
					break;
				case "add":
					currentNumber = mathThis[0] + mathThis[1];
					mathThis = [currentNumber];
					break;
				case "power":
					currentNumber = Math.pow(mathThis[0], mathThis[1]);
					mathThis = [currentNumber];
					break;
			}
	}

	const ENTERNUMBER = function(val) {

		//freeze numberBuilder at 9 digits.
		if (numberBuilder.length == 9) {
			return;
		}

		val > 57 ? convertedNumber = String.fromCharCode(val-48) : convertedNumber = String.fromCharCode(val);

		if (mathThis.length == 0 || mathThis.length == 1 && !isNaN(eq[eq.length-1])) {
			//First Digit...
			if (numberBuilder.length == 0) {
				numberBuilder.push(convertedNumber);
				currentNumber = parseInt(numberBuilder.join(''), 10);
				eq.push(currentNumber);
			}
			//If '0' is first digit, we need to replace it with the current number pressed.
			else if (numberBuilder.length == 1 && numberBuilder[0] == 0) {
				numberBuilder.splice(0,1,convertedNumber);
				currentNumber = parseInt(numberBuilder.join(''), 10);
				eq.splice(0,1,currentNumber);
			}
			//Otherwise, continue...
			else {
				numberBuilder.push(convertedNumber);
				currentNumber = parseInt(numberBuilder.join(''), 10);
				eq.splice(0,1,currentNumber);
			}
			//insert the currentNumber into mathThis[0] for calculation purposes later...
			mathThis = [currentNumber];
		}
		else if (mathThis.length == 1 && isNaN(eq[eq.length-1])) {
			//First Digit...
			if (numberBuilder.length == 0) {
				numberBuilder.push(convertedNumber);
				currentNumber = parseInt(numberBuilder.join(''), 10);
				eq.push(currentNumber);
			}
			//If '0' is first digit, we need to replace it with the current number pressed.
			else if (numberBuilder.length == 1 && numberBuilder[0] == 0) {
				numberBuilder.splice(0,1,convertedNumber);
				currentNumber = parseInt(numberBuilder.join(''), 10);
				eq.splice(0,1,currentNumber);
			}
			//Otherwise, continue...
			else {
				numberBuilder.push(convertedNumber);
				currentNumber = parseInt(numberBuilder.join(''), 10);
				eq.splice(0,1,currentNumber);
			}
			//insert the currentNumber into mathThis[1] for calculation purposes later...
			mathThis.push(currentNumber);
			tempNum = currentNumber;
		}
		else if (mathThis.length == 2) {
			if (numberBuilder.length == 1 && numberBuilder[0] == 0) {
				numberBuilder.splice(0,1,convertedNumber);
				currentNumber = parseInt(numberBuilder.join(''), 10);
				eq.splice(eq.length-1,1,currentNumber);
			}
			//Otherwise, continue...
			else {
				numberBuilder.push(convertedNumber);
				currentNumber = parseInt(numberBuilder.join(''), 10);
				eq.splice(eq.length-1,1,currentNumber);
			}
			//insert the currentNumber into mathThis[1] for calculation purposes later...
			mathThis.splice(1,1,currentNumber);
			tempNum = currentNumber;
		}

		console.log(eq);
		$(".results").html(currentNumber);
		$(".equation").html(eq.join(''));
	}

	const ADD = function() {
		if (mathThis.length == 2) {
			OPERATENUMBER();
			numberBuilder = [];
			mathOperator = "add";
			eq = ["ans + ", currentNumber];
			$(".results").html(currentNumber);
			$(".equation").html(eq.join(''));
			console.log(eq);
		}
		if (mathThis.length == 1) {
			if (isNaN(eq[eq.length-1])) {
				eq.splice(eq.length-1,1," + ");
			}
			else {
				eq.push(" + ");
			}
			numberBuilder = [];
			mathOperator = "add";
			tempNum = mathThis[0];
			$(".equation").html(eq.join(''));
		}
	}

	const SUBTRACT = function() {
		if (mathThis.length == 2) {
			OPERATENUMBER();
			numberBuilder = [];
			mathOperator = "subtract";
			eq = ["ans - ", currentNumber];
			$(".results").html(currentNumber);
			$(".equation").html(eq.join(''));
			console.log(eq);
		}
		if (mathThis.length == 1) {
			if (isNaN(eq[eq.length-1])) {
				eq.splice(eq.length-1,1," - ");
			}
			else {
				eq.push(" - ");
			}
			numberBuilder = [];
			mathOperator = "subtract";
			tempNum = mathThis[0];
			$(".equation").html(eq.join(''));
		}
	}

	const MULTIPLY = function() {
		if (mathThis.length == 2) {
			OPERATENUMBER();
			numberBuilder = [];
			mathOperator = "multiply";
			eq = ["ans × ", currentNumber];
			$(".results").html(currentNumber);
			$(".equation").html(eq.join(''));
			console.log(eq);
		}
		if (mathThis.length == 1) {
			if (isNaN(eq[eq.length-1])) {
				eq.splice(eq.length-1,1," × ");
			}
			else {
				eq.push(" × ");
			}
			numberBuilder = [];
			mathOperator = "multiply";
			tempNum = mathThis[0];
			$(".equation").html(eq.join(''));
		}
	}

	const DIVIDE = function() {
		if (mathThis.length == 2) {
			OPERATENUMBER();
			numberBuilder = [];
			mathOperator = "divide";
			eq = ["ans ÷ ", currentNumber];
			$(".results").html(currentNumber);
			$(".equation").html(eq.join(''));
			console.log(eq);
		}
		if (mathThis.length == 1) {
			if (isNaN(eq[eq.length-1])) {
				eq.splice(eq.length-1,1," ÷ ");
			}
			else {
				eq.push(" ÷ ");
			}
			numberBuilder = [];
			mathOperator = "divide";
			tempNum = mathThis[0];
			$(".equation").html(eq.join(''));
		}
	}

	const POWER = function() {
		if (mathThis.length == 2) {
			OPERATENUMBER();
			numberBuilder = [];
			mathOperator = "power";
			$(".results").html(currentNumber);
			$(".equation").html(eq.join(''));
			console.log(eq);
		}
		if (mathThis.length == 1) {
			if (isNaN(eq[eq.length-1])) {
				eq.splice(eq.length-1,1," ^ ");
			}
			else {
				eq.push(" ^ ");
			}
			numberBuilder = [];
			mathOperator = "power";
			tempNum = mathThis[0];
			$(".equation").html(eq.join(''));
		}
	}

	const CLEAR = function() {
		currentNumber = 0;
		numberBuilder = [];
		eq = [];
		mathThis = [];
		$(".results").html("0");
		$(".equation").html(eq.join(''));
		console.log(eq);
	}

	const ENTER = function() {
		if (mathThis.length == 2) {
			OPERATENUMBER();
			eq.push(" = ", currentNumber);
		}
		else if (mathThis.length == 1) {
			switch (mathOperator) {
				case "divide":
					currentNumber = mathThis[0] / tempNum;
					mathThis = [currentNumber];
					eq = ["ans ÷ ", tempNum, " = ", currentNumber];
					break;
				case "multiply":
					currentNumber = mathThis[0] * tempNum;
					mathThis = [currentNumber];
					eq = ["ans × ", tempNum, " = ", currentNumber];
					break;
				case "subtract":
					currentNumber = mathThis[0] - tempNum;
					mathThis = [currentNumber];
					eq = ["ans - ", tempNum, " = ", currentNumber];
					break;
				case "add":
					currentNumber = mathThis[0] + tempNum;
					mathThis = [currentNumber];
					eq = ["ans + ", tempNum, " = ", currentNumber];
					break;
				case "power":
					currentNumber = Math.pow(mathThis[0], tempNum);
					mathThis = [currentNumber];
					eq = ["ans ^ ", tempNum, " = ", currentNumber];
					break;
			}
		}

		$(".results").html(currentNumber);
		$(".equation").html(eq.join(''));
		console.log(eq);
	}

	const FONTSIZEADJUST = function(currentNumberLength) {
		if (currentNumberLength <= 9) {
			$(".results").css("font-size", "61px");
		}
		else if (currentNumberLength > 9) {
			switch(currentNumberLength) {
				case 10:
					$(".results").css("font-size", "51px");
					break;
				case 11:
					$(".results").css("font-size", "46px");
					break;
				case 12:
					$(".results").css("font-size", "44px");
					break;
				case 13:
					$(".results").css("font-size", "41px");
					break;
				case 14:
					$(".results").css("font-size", "38px");
					break;
				case 15:
					$(".results").css("font-size", "35px");
					break;
				case 16:
					$(".results").css("font-size", "34px");
					break;
				case 17:
					$(".results").css("font-size", "32px");
					break;
				case 18:
					$(".results").css("font-size", "30px");
					break;
				case 19:
					$(".results").css("font-size", "28px");
					break;
				case 20:
					$(".results").css("font-size", "27px");
					break;
			}
		}
	}

window.addEventListener("keydown", function (event) {

		//Add
		if (event.keyCode == 107 || event.shiftKey && event.keyCode == 187) {
			ADD();
		}

		//Subtract
		else if (event.keyCode == 109 || event.keyCode == 189) {
			SUBTRACT();
		}

		//Multiply
		else if (event.keyCode == 106 || event.shiftKey && event.keyCode == 56) {
			MULTIPLY();
		}

		//Number 8
		else if (!event.shiftKey && event.keyCode == 56) {
			//This line saves you a lot of code by allowing convertedNumber to change based on keypressed.
			convertedNumber = String.fromCharCode(event.keyCode);
			ENTERNUMBER(event.keyCode);
		}

		//Divide
		else if (event.keyCode == 111 || event.keyCode == 191) {
			DIVIDE();
		}

		//Power
		else if (event.shiftKey && event.keyCode == 54) {
			POWER();
		}

		//Number 6
		else if (!event.shiftKey && event.keyCode == 54) {
			//This line saves you a lot of code by allowing convertedNumber to change based on keypressed.
			convertedNumber = String.fromCharCode(event.keyCode);
			ENTERNUMBER(event.keyCode);
		}

		//Enter
		else if (event.keyCode == 13) {
			ENTER();			
		}

		//Clear
		else if (event.keyCode == 8) {
			CLEAR();
		}

		//Numpad Number Keys and Regular Number Keys
		else if (event.keyCode == 96 || event.keyCode == 97 || event.keyCode == 98 || event.keyCode == 99 || event.keyCode == 100 || event.keyCode == 101 || event.keyCode == 102 || event.keyCode == 103 || event.keyCode == 104 || event.keyCode == 105 || event.keyCode == 48 || event.keyCode == 49 || event.keyCode == 50 || event.keyCode == 51 || event.keyCode == 52 || event.keyCode == 53 || event.keyCode == 55 || event.keyCode == 57) {
			ENTERNUMBER(event.keyCode);
		}

		else {
			return;
		}

		return FONTSIZEADJUST(currentNumber.toString().length);

});

	$("button").on({
		click: function() {
			MAKECLICKSWORK($(this).attr('id'));
			FONTSIZEADJUST(currentNumber.toString().length);
		}
	});
});