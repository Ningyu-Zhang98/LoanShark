//Controller
function getValues(){
    let loanAmount = document.getElementById("loanAmount").value
    let loanTime = document.getElementById("time").value
    let interestRate = document.getElementById("interestRate").value
    if (!loanAmount || !loanTime || !interestRate){
        alert('Inputs must be numbers!')
        return
    }
    let rows = []
    let remainBalance = loanAmount
    let monthlyPayment = ((loanAmount)*(interestRate/1200)/(1-Math.pow((1+interestRate/1200),-loanTime))).toFixed(2)
    let totalInterest = 0
    for (let index = 1; index <= loanTime; index++) {
        rowInfo = {
            month:index, 
            payment:monthlyPayment,
            principal:0,
            interest: 0,
            totalInterest:0,
            balance:0
        }
        fillInRow(rowInfo,interestRate,remainBalance)
        remainBalance = rowInfo.balance
        totalInterest += Number(rowInfo['interest'])
        rowInfo['totalInterest'] = totalInterest.toFixed(2)
        
        rows.push(rowInfo)
    }
    displayResults(rows,loanAmount, totalInterest)

}

//Fill in the rows
function fillInRow(rowObject,interestRate, remainBalance){
    rowObject['interest'] = (remainBalance*(interestRate/1200)).toFixed(2)
    rowObject['principal'] = (rowObject['payment'] - rowObject['interest']).toFixed(2)
    rowObject['balance'] = (remainBalance - rowObject['principal']).toFixed(2)

}

//Display the results
function displayResults(rowsArr,loanAmount, totalInterest){
    let tableBody = document.getElementById("results");
    let templateRow = document.getElementById("tmpResults")
    tableBody.innerHTML = ""

    for (let index = 0; index < rowsArr.length; index++) {
        let rowOjt = rowsArr[index];

        let tableRow = document.importNode(templateRow.content, true);
        let rowCols = tableRow.querySelectorAll('td');
        rowCols[0].textContent = rowOjt['month']
        rowCols[1].textContent = rowOjt['payment']
        rowCols[2].textContent = rowOjt['principal']
        rowCols[3].textContent = rowOjt['interest']
        rowCols[4].textContent = rowOjt['totalInterest']
        rowCols[5].textContent = rowOjt['balance']
        
        tableBody.appendChild(tableRow)
    }
    let displayMonthlyPayments = document.getElementById("monthlyPayments")
    displayMonthlyPayments.innerHTML = `$${rowsArr[0]["payment"]}`

    let totalPrin = document.getElementById("totalPrincipal")
    totalPrin.innerHTML = `$${loanAmount}`

    let total = document.getElementById("totalInterests")
    total.innerHTML = `$${totalInterest.toFixed(2)}`

    let totalCost = document.getElementById("totalCost")
    totalCost.innerHTML = `$${(Number(totalInterest) + Number(loanAmount)).toFixed(2)}`

}
