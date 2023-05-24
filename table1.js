const items = {
    data: [
        {
            itemName: "Desks",
            itemData: [
                { name: "large straight", wt: 90 },
                { name: "Sm Straight", wt: 55 },
                { name: "L 1.3", wt: 65 },
                { name: "L 1.8", wt: 90 },
                { name: "120 degree", wt: 65 },
                { name: "Desk – reception", wt: 250 }
            ]
        },
        {
            itemName: "Storage",
            itemData: [
                { name: "Bookcase – Lg", wt: 80 },
                { name: "Bookcase – Small", wt: 40 },
                { name: "Credenza - Lg", wt: 100 },
                { name: "Credenza – Small", wt: 60 },
                { name: "Cubby unit", wt: 50 }, ,
                { name: "Server Racking", wt: 60 },
                { name: "Storage cab", wt: 100 },
                { name: "Tambour – Lg", wt: 80 },
                { name: "Tambour - med", wt: 60 },
                { name: "Tambour – small", wt: 40 },
                { name: "Wall mounted open shelfs", wt: 50 },

            ]
        },
        {
            itemName: "Tables",
            itemData: [
                { name: "Boardroom", wt: 30 },
                { name: "Task ", wt: 21 },
                { name: "Poof", wt: 10 },
                { name: "Reception", wt: 20 },
                { name: "Stacker", wt: 15 },
                { name: "Couch", wt: 100 },
                { name: "Lounge Chair", wt: 35 },

            ]
        },
        {
            itemName: "Partitioning",
            itemData: [
                { name: "Partition shelfs", wt: 3 },
                { name: "Dividers", wt: 10 },
                { name: "Partitions", wt: 20 },

            ]
        },
        {
            itemName: "Boards",
            itemData: [
                { name: "Boards - Cork", wt: 5 },
                { name: "Boards - Pin", wt: 5 },
                { name: "Boards - White", wt: 10 },
                { name: "Boards - White on wheels", wt: 15 },
                { name: "Elec whiteboard", wt: 50 },

            ]
        },
        {
            itemName: "Other",
            itemData: [
                { name: "Art work", wt: 10 },
                { name: "BBQ", wt: 50 },
                { name: "Bin", wt: 2 },
                { name: "Carpet Rug", wt: 30 },
                { name: "Carpet Tiles", wt: 1 },
                { name: "Foot stools", wt: 10 },
                { name: "Hat stand", wt: 15 },
                { name: "Office stationary (Box)", wt: 10 },
                { name: "Other 2", comment: "set a weight value" },
                { name: "Other 3", comment: "set a weight value" },
                { name: "Other 4", comment: "set a weight value" },
                { name: "Other 5", comment: "set a weight value" },

            ]
        }

    ]
};


var tbody1 = document.querySelector('table#firstTable tbody');

items.data.map(item => {
    var heading = document.createElement('tr');
    heading.innerHTML = `<th colspan="5" style="text-align: left; border: 1px solid black; background: grey">${item.itemName}</th>`;

    tbody1.appendChild(heading);
    item.itemData.map(data => {
        var tr = document.createElement('tr');
        tr.innerHTML = `<td>${data.name}</td>
                    <td><input class="cell1 wt" default="0" value="${data.wt}" type="number"></td>
                    <td><input class="cell1 qty" default="0" type="number" value="0" onfocus="clearInitialValue(this)"></td>
                    <td><input readonly type="number" class="multiplyWt" value="0"></input></td>
                    ${data.comment ? `<td><input value="${data.comment}" class="commentCell" type="text"></td>` : `<td><input class="commentCell" type="text"></td>`}`;

        tbody1.appendChild(tr);
    });
});


var cells = document.getElementsByClassName('cell1');
for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener('input', calculateRowMultiply);
}

function clearInitialValue(input) {
    if (input.value === "0") {
        input.value = "";
    }
}

function calculateRowMultiply() {
    var row = this.parentNode.parentNode;
    var wtCell = row.getElementsByClassName('wt')[0].value;
    var qtyCell = row.getElementsByClassName('qty')[0].value;
    var multiply = 0;

    if (!isNaN(parseFloat(wtCell)) && !isNaN(parseFloat(qtyCell))) {
        multiply = wtCell * qtyCell;
    }

    row.getElementsByClassName('multiplyWt')[0].value = multiply;
    calculateTotals();
    calculateTotalFee();
}

function calculateTotals() {
    var totalQty = 0;
    var totalWt = 0;
    var twt = document.getElementsByClassName('multiplyWt');
    var tqty = document.getElementsByClassName('qty');

    for (let i = 0; i < tqty.length; i++) {
        var qtyValue = parseFloat(tqty[i].value);
        if (!isNaN(qtyValue)) {
            totalQty += qtyValue;
            var multiplyValue = parseFloat(twt[i].value);
            if (!isNaN(multiplyValue)) {
                totalWt += multiplyValue;
            }
        }
    }

    document.getElementById('totalWt').textContent = totalWt;
    document.getElementById('totalQty').textContent = totalQty;
}



function calculateTotalFee() {
    var totalFee = 0;
    var fee = parseFloat(document.getElementById('fee').value)
    var wt = parseFloat(document.getElementById('totalWt').innerHTML);
    var tWt = parseFloat(wt);
    totalFee = parseFloat((tWt / 1000) * fee).toFixed(2);
    if (isNaN(totalFee)) {
        totalFee = 0;
    }

    document.getElementById('totalFee').innerHTML = totalFee;
}
