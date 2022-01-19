class cpfValidation {


    constructor(){
        
    }

    cpfVerification(value){

		let cpf = value;
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
			this.displayCalc = 'CPF Válido'
		}else{
			this.displayCalc = 'CPF ERRADO'
			console.log('PEnultimo digito ' + cpfPenultimoDigito + 'Primeiro número verificado ' + firstDigitVerified + 'Ultimo numero do CPF' + cpfLastNumber + 'Ultimo numero verificado' + secondDigitVerified)
			
		}



	}
}