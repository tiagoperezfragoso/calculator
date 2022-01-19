class CalcController{

	constructor(){
		//this._locale= 'pt-BR';

		this._lastOperator = '';
		this._lastNumber = '';
		this._operation = [];
		this._displayCPFEl = document.querySelector('#display_cpfvisor')
		this._displayCalcEl = document.querySelector("#display_visor");
		this._dateEl = document.querySelector("#data_visor");
		this._timeEl = document.querySelector("#time_visor");
		this._currentDate;
		this.initialize();
		this.initButtonsEvents();
		this.initKeyboard();
	}

	pastFromClipboard(){
		document.addEventListener('paste', e=>{

			let text =  e.clipboardData.getData('Text');

			this.displayCalc = parseFloat(text);

			console.log(text);

			
		})
	}

	copyToClipboard(){
		let input = document.createElement('input');

		input.value = this.displayCalc;

		document.appendChild(input);

		input.select();

		document.execCommand("Copy");
	}

	initialize(){

		this.setInterval();
		this.setLastNumberToDisplay();
		this.pastFromClipboard();

	} 

	setDisplayDateTime(){
		this.displayDate = this.currentDate.toLocaleDateString(this._locale, {day: "2-digit", month:"long", year:"numeric"});
		this.displayTime = this.currentDate.toLocaleTimeString(this._locale);
	}

	//setting event Listener to take what keyboard we are press
	initKeyboard(){

		document.addEventListener('keyup', e=>{

			switch(e.key){

				case 'Escape' :
					this.clearAll();
					break;
				case 'Backspace' :
					this.clearEntry();
					break;
	
				case '+' :
				case '-' :
				case '*' :
				case '/' :	
				case '%' :
					this.addOperation(e.key);
					break;
				case 'Enter' :	
				case '=' :
					this.calc();
					break;
	
				case '.' :
					case ',':
	
					this.addDot('.');
	
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
	
				this.addOperation(parseInt(e.key));
				break;

				case 'c':
					if (e.ctrlKey) this.copyToClipboard();
					break;
			}
		});
	}

	addEventListenerAll(element, events, fn){

		events.split(' ').forEach(event => {

			element.addEventListener(event, fn, false);

		});

	}

	clearAll(){

		this._operation = [];

		this._lastNumber = '';
		this._lastOperator = '';
		this.setLastNumberToDisplay();
		this.displayCalcCPF = []

	}

	clearEntry(){

		this._operation.pop();
		this.setLastNumberToDisplay();

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

	getResult(){

		return eval(this._operation.join(""));
	}

	cpfVerification(){

		let cpf = this._operation.toString();
		let cpfDividido = [];
		let cpfParcial = [];
		let j = 10;
		let y = 11;
		let result = [];
		let resultSecond = []
		let resultMultiplicacao = []
		let resultMultiplicacaoSecond = []
		let cpfLastNumber = 0;
		let cpfPenultimoDigito = 0;
		let soma =0;
		let somaSecond = 0;
		

		//HEre we take the CPF number and see if it has 11 numbers, after this we put each number in a posintion inside of other array, and we separete 
		//the last namber and penultimate number
		if (cpf.length === 11){
			cpfDividido = cpf.split("")
			
			//last number of verified digit
			cpfLastNumber = cpfDividido[cpfDividido.length-1]
			//first number of verified digt
			cpfPenultimoDigito = cpfDividido[cpfDividido.length-2]

		}else{
			console.log('tamanho incorreto')
		}

		//Here I copy the value of CPF to other array to do some validations
		cpfParcial = cpfDividido;

		for (let i = 0; i<=1; i++){

			cpfParcial.pop();

		}

		//here we do the first step that is to multiplicate each number of cpf, the nine firsts, with 10 to 2
		for (let i=0; i<= cpfParcial.length-1; i++){
			result = cpfParcial[i] * j;
			resultMultiplicacao.push(result)
			j--
		}

		//Here we sum the result of multiplication
		for (let i=0; i < resultMultiplicacao.length; i++){
			soma += resultMultiplicacao[i]
		}

		//here we calculate the rest of a module

		let moduleFirst = soma % 11

		let firstDigitVerified = 11 - moduleFirst

		if (firstDigitVerified >= 10){
			firstDigitVerified = 0
		}

		if (firstDigitVerified === cpfPenultimoDigito){
			return true
		}

		//Here starts the verification of the second number


		let cpfDividoSecond = cpf.split("")

		cpfDividoSecond.pop()


		//here we do the first step that is to multiplicate each number of cpf, the nine firsts, with 11 to 2
		for (let i=0; i<= cpfDividoSecond.length-1; i++){
			resultSecond = cpfDividoSecond[i] * y;
			resultMultiplicacaoSecond.push(resultSecond)
			y--

		}

		//Here we sum the result of multiplication of second part
		for (let i=0; i < resultMultiplicacaoSecond.length; i++){
			somaSecond += resultMultiplicacaoSecond[i]
		}

		//here we calculate the rest of a second module 

		let moduleSecond = somaSecond % 11
		let secondDigitVerified = 11 - moduleSecond

		if (secondDigitVerified >= 10){
			secondDigitVerified = 0
		}

		
		if (secondDigitVerified == cpfLastNumber && firstDigitVerified == cpfPenultimoDigito){
			console.log('PEnultimo digito ' + cpfPenultimoDigito + 'Primeiro número verificado ' + firstDigitVerified + 'Ultimo numero do CPF' + cpfLastNumber + 'Ultimo numero verificado' + secondDigitVerified)
			this.displayCalcCPF = 'CPF Válido'

			this.displayCalc = []
		}else{
			this.displayCalcCPF = 'CPF Inválido'
			console.log('PEnultimo digito ' + cpfPenultimoDigito + 'Primeiro número verificado ' + firstDigitVerified + 'Ultimo numero do CPF' + cpfLastNumber + 'Ultimo numero verificado' + secondDigitVerified)
			this.displayCalc = []
		}



	}

	calc(){
		
		let last = '';

		this._lastOperator = this.getLastItem();

		if (this._operation.length < 3){

			let firstItem = this._operation[0];
			this._operation = [firstItem, this._lastOperator, this._lastNumber];

			this.getResult()


		}

		if (this._operation.length > 3) {

			last = this._operation.pop();
			this._lastNumber = this.getResult();

		}else if (this._operation.length ==3){

			this._lastNumber = this.getLastItem(false);
		}


		let result = this.getResult();

		if (last == '%'){

			result /= 100;

			this._operation=[result];

		}else {
			this._operation = [result];

			if (last) this._operation.push(last);
		}
		
		
		this.setLastNumberToDisplay();


	}

	getLastItem(isOperator = true){

		let lastItem;

		for (let i = this._operation.length-1; i>=0; i--){


				if(this.isOperator(this._operation[i]) == isOperator){
					lastItem = this._operation[i];
					break;
				}
			}

			if (!lastItem){
				lastItem = (isOperator) ? this._lastOperator : this._lastNumber;
			}

		return lastItem;
	}
		

	setLastNumberToDisplay(){

		let lastnumber = this.getLastItem(false);

		if (!lastnumber) lastnumber =0;

		this.displayCalc = lastnumber;
	}

	addOperation(value){

		//console.log('A', value, isNaN(this.getLastOperation()));

		if (isNaN(this.getLastOperation())){

			if (this.isOperator(value)){
				
				//string
				this.setLastOperation(value);

			}else {

				//number

				this.pushOperation(value);

				this.setLastNumberToDisplay();
				
			}

		}else {

			if (this.isOperator(value)){

				this.pushOperation(value);

			}else {

				let newValue = this.getLastOperation().toString() + value.toString();
				this.setLastOperation(newValue);

				this.setLastNumberToDisplay();
			}	

		}

	}

	addDot(){

		let lastOperation = this.getLastOperation();

		if (typeof lastOperation ==='string' && lastOperation.split('').indexOf('.') > -1) return;

		if(this.isOperator(lastOperation) || !lastOperation){
			this.pushOperation('0.')
		} else {
			this.setLastOperation(lastOperation.toString()+ '.')
		}

		this.setLastNumberToDisplay();

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

				this.calc();

				break;

			case 'ponto' :

				this.addDot('.');

				break;

			case 'cpf' :

			this.cpfVerification();
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

		if (valor.toString().length > 11){
			this.setError();
			return false;
		}

		this._displayCalcEl.innerHTML = valor;

	}

	get displayCalcCPF(){

		return this._displayCPFEl.innerHTML;
	}

	set displayCalcCPF(valor){

		this._displayCPFEl.innerHTML = valor;

	}

	get currentDate(){
		return new Date();
	}

	set currentDate(valor){
		this._currentDate = valor;
	}
}