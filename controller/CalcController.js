class CalcController{

	constructor(){
		//this._locale= 'pt-BR';
		this._operation = [];
		this._displayCalcEl = document.querySelector("#display_visor");
		this._dateEl = document.querySelector("#data_visor");
		this._timeEl = document.querySelector("#time_visor");
		this._currentDate;
		this.initialize();
		this.initButtonsEvents();
	}

	initialize(){

		this.setInterval();
		this.displayCalc = 0;

	} 

	setDisplayDateTime(){
		this.displayDate = this.currentDate.toLocaleDateString(this._locale, {day: "2-digit", month:"long", year:"numeric"});
		this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
	}

	addEventListenerAll(element, events, fn){

		events.split(' ').forEach(event => {

			element.addEventListener(event, fn, false);

		});

	}

	clearAll(){

		this._operation = [];
		this.displayCalc = 0;

	}

	clearEntry(){

		this._operation.pop();

	}

	setError(){
		this.displayCalc = "Error";
	}

	getLastOperation(){
		
		return this._operation[this._operation.length-1];
	}

	isOperator(value){

		return (['+','-','*','/','%'].indexOf(value) > -1);
	}

	setLastOperation(value){

		this._operation[this._operation.length-1] = value;
	}

	pushOperation(value){

		this._operation.push(value);

		if (this._operation.length > 3){

			this.calc();

		}
	}

	calc(){

		let last = this._operation.pop();

		let result = eval(this._operation.join(""));

		this._operation = [result, last];

		this.setLastNumberToDisplay();

		console.log(this._operation)

	}

	setLastNumberToDisplay(){

		let lastnumber;

		for (let i = this._operation.length-1; i>=0; i--){

			if(!this.isOperator(this._operation[i])){
				lastnumber = this._operation[i];
				break;
			}
		}

		this.displayCalc = lastnumber;
	}

	addOperation(value){

		console.log('A', value, isNaN(this.getLastOperation()));

		if (isNaN(this.getLastOperation())){

			if (this.isOperator(value)){

				this.setLastOperation(value);

			}else{

				this.pushOperation(value);

				this.setLastNumberToDisplay();
				
			}

		}else {

			if (this.isOperator(value)){

				this.pushOperation(value);

			}else {

				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperation(parseInt(newValue));

				this.setLastNumberToDisplay();
			}	

		}

	}



	execBtn(value){

		switch(value){

			case 'ac' :
				this.clearAll();
				break;
			case 'ce' :
				this.clearEntry();
				break;

			case 'soma' :

				this.addOperation('+');

				break;

			case 'subtracao' :

				this.addOperation('-');

				break;

			case 'multiplicacao' :

				this.addOperation('*');

				break;

			case 'divisao' :

				this.addOperation('/');

				break;

			case 'porcentagem' :

				this.addOperation('%');

				break;


			case 'igual' :

				break;

			case 'ponto' :

				this.addOperation('.');

				break;

			default:
				//this.setError();
				break;

			case '0':
			case '1':
			case '2':
			case '3':
			case '4':
			case '5':
			case '6':
			case '7':
			case '8':
			case '9':

			this.addOperation(parseInt(value));

		}
	}

	initButtonsEvents(){
		let buttons = document.querySelectorAll("#numeros_grade > td, td");

		buttons.forEach((btn, index)=>{

			this.addEventListenerAll(btn, "click drag", e => {
				let textBtn = btn.className.replace("tecla-","");

				this.execBtn(textBtn);

			} );

			this.addEventListenerAll(btn, "mouseover mouseup mousedown", e=> {

				btn.style.cursor = "pointer";
			});


		});
	}


	setInterval(){
		setInterval(()=>{
			this.setDisplayDateTime();

		}, 1000);
	}
	get displayDate(){
		return this._dateEl.innerHTML;

	}

	set displayDate(value){
		return this._dateEl.innerHTML = value;

	}

	get displayTime(){
		return this._timeEl.innerHTML = value;

	}

	set displayTime(value){
		return this._timeEl.innerHTML = value;

	}

	get displayCalc(){

		return this._displayCalcEl.innerHTML;
	}

	set displayCalc(valor){

		this._displayCalcEl.innerHTML = valor;

	}

	get currentDate(){
		return new Date();
	}

	set currentDate(valor){
		this._currentDate = valor;
	}
}