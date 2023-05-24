const bedsData = [
    {name : "Single Mattress", amount: 45, tqty: 1},
    {name : "Single Base ", amount: 55, tqty: 1},
    {name : "Double Mattress", amount: 55, tqty: 1},
    {name : "Double Base ", amount: 65, tqty: 1},
    {name : "Queen Mattress", amount: 60, tqty: 1},
    {name : "Queen Base ", amount: 70, tqty: 1},
    {name : "King Mattress", amount: 65, tqty: 1},
    {name : "King Base", amount: 75, tqty: 1},
]

var tbody2 = document.querySelector('table#secondTable tbody');


bedsData.map(data => {
        var tr = document.createElement('tr');
        tr.innerHTML = `<td >${data.name}</td>
                        <td><input class="cell2 amount" value=${data.amount} type="number"></td>
                        <td><input class="cell2 bedsQty" type="number" value=0 onfocus="clearInitialValue(this)"></td>
                        <td><input readonly type="number" class="multiplyCost" value="0"></input></td>
                        <td ><input class="commentCell2" type="text"></td>`
        tbody2.appendChild(tr);
});


var cells = document.getElementsByClassName('cell2');
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('input', calculateRowMultiply);
}


function clearInitialValue(input) {
    if (input.value === "0") {
        input.value = "";
    }
}

var qty = document.getElementById('fee')
fee.addEventListener('input', calculateTotalFee)

function calculateRowMultiply() {
    var row = this.parentNode.parentNode;
    var wtCell = row.getElementsByClassName('amount')[0].value;
    var qtyCell = row.getElementsByClassName('bedsQty')[0].value;
    var multiply = 0;
    if (!isNaN(parseFloat(wtCell) && parseFloat(qtyCell))) {
        multiply = wtCell * qtyCell;
    }

    row.getElementsByClassName('multiplyCost')[0].value = multiply;
    calculateTotal();
}


function calculateTotal() {
    var totalCost = 0;
    var tCost = document.getElementsByClassName('multiplyCost')
    for (let i = 0; i < tCost.length; i++) {
        totalCost += parseFloat(tCost[i].innerHTML)
    }
    if (isNaN(totalQty)) {
        totalQty = 0
    }
    document.getElementById('totalBedsCost').textContent = totalCost;
}

