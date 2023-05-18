const previousNumber = document.querySelector('.previous-num')
const mathSign = document.querySelector('.sign')
const currentNumber = document.querySelector('.current-num')
const endNumber = document.querySelector('.end-num')
const numberBtns = document.querySelectorAll('.number')
const operatorBtns = document.querySelectorAll('.operator')
const clearBtn = document.querySelector('.clear')
const equalsBtn = document.querySelector('.equals')
const calculationsList = document.querySelector('.list')
const clearList = document.querySelector('.clear-list')

let result = ''

const displayNumber = e => {
    if (endNumber.textContent === '' || e.target.classList.contains('number')) {
        endNumber.textContent = ''
        endNumber.style.display = 'none'
        if (e.target.textContent === '.' && currentNumber.textContent.includes('.')) return
        if (e.target.textContent === '.' && currentNumber.textContent === '') return (currentNumber.textContent = '0.')
        currentNumber.textContent += e.target.textContent
    }
}

const operate = e => {
    if (endNumber.textContent !== '' && e.target.classList.contains('operator')) {
        currentNumber.textContent = endNumber.textContent
        console.log(currentNumber.textContent);
        endNumber.textContent = ''
        endNumber.style.display = 'none'
        if (currentNumber.textContent == '' && e.target.textContent === '-') {
            currentNumber.textContent = '-'
            return
        } else if (currentNumber.textContent === '') {
            return
        }
        if (mathSign.textContent !== '') {
            showResult()
        }
    }

	previousNumber.textContent = currentNumber.textContent
	mathSign.textContent = e.target.textContent
	currentNumber.textContent = ''
}

const showResult = () => {
	if (previousNumber.textContent === '' || currentNumber.textContent === '') {
		return
	}

	let firstNum = Number(currentNumber.textContent)
	let secondNum = Number(previousNumber.textContent)
	let sign = mathSign.textContent

	switch (sign) {
		case '+':
			result = firstNum + secondNum
			break
		case '-':
			result = secondNum - firstNum
			break
		case 'x':
			result = firstNum * secondNum
			break
		case ':':
			result = secondNum / firstNum
			break
		case '^':
			result = secondNum ** firstNum
			break
	}
    addToList()
    endNumber.textContent = result
    endNumber.style.display = 'flex'
    currentNumber.textContent = ''
    previousNumber.textContent = ''
    mathSign.textContent = ''
}

const clearDisplay = () => {
	currentNumber.textContent = ''
	mathSign.textContent = ''
	previousNumber.textContent = ''
    result = ''
    endNumber.textContent = ''
}

const addToList = () => {
    const newItem = document.createElement('li')
    newItem.textContent = `${previousNumber.textContent} ${mathSign.textContent} ${currentNumber.textContent} = ${result}`
    newItem.classList.add('list-item')
    calculationsList.appendChild(newItem)
}

const clearHistory = () => {
    calculationsList.textContent = ''
}

numberBtns.forEach(button => button.addEventListener('click', displayNumber))
operatorBtns.forEach(button => button.addEventListener('click', operate))
equalsBtn.addEventListener('click', showResult)
clearBtn.addEventListener('click', clearDisplay)
clearList.addEventListener('click', clearHistory)
