/*load customers NIC combobox*/
function loadComboBox() {
    $("#invoice-customerNIC").empty();
    $("#item-itemCode").empty();
    $("#invoice-customerNIC").append(
        `<option>Select NIC</option>`
    );
    $("#item-itemCode").append(
        `<option>Select Code</option>`
    );
    for (let i = 0; i < customer.length; i++) {
        $("#invoice-customerNIC").append(
            `<option>"${customer[i].nic}"</option>`
        );
    }
    for (let i = 0; i < item.length; i++) {
        $("#item-itemCode").append(
            `<option>${item[i].code}</option>`
        );
    }
}

/*invoice*/
$("#invoice-customerNIC").click(function () {
    let nic = $("#invoice-customerNIC").val();
    if (nic !== "Select NIC") {
        customer1 = searchCustomer(nic);
        $("#customerName").val(customer1.name);
        $("#customerTel").val(customer1.tel);
        $("#customerAddress").val(customer1.address);

        $("#invoice-customerNIC").css("border", 'solid green 2px');
        $("#customerName").css("border", 'solid green 2px');
        $("#customerTel").css("border", 'solid green 2px');
        $("#customerAddress").css("border", 'solid green 2px');
    } else {
        $("#customerName").val("");
        $("#customerTel").val("");
        $("#customerAddress").val("");
    }
});


function setOrderId() {
    $("#orderDate").val(new Date().toISOString().slice(0, 10));
    if (order.length > 0) {
        $("#orderId").val("O00-00" + (order.length + 1));
    } else {
        $("#orderId").val("O00-001");
    }
}


/*item*/
$("#item-itemCode").click(function () {
    let code = $("#item-itemCode").val();
    if (code !== "Select Code") {
        item1 = searchItem(code);
        $("#itemName").val(item1.name);
        $("#itemPrice").val(item1.price);
        $("#itemQTY").val(item1.qty);

        $("#item-itemCode").css("border", 'solid green 2px');
        $("#itemName").css("border", 'solid green 2px');
        $("#itemPrice").css("border", 'solid green 2px');
        $("#itemQTY").css("border", 'solid green 2px');
    } else {
        $("#itemName").val("");
        $("#itemPrice").val("");
        $("#itemQTY").val("");
    }
});
$("#Quantity").keyup(function () {
    let qty = $("#Quantity").val();
    if (Number($("#Quantity").val()) !== 0 && $("#Quantity").val() !== "") {
        if (Number(qty) <= Number($("#itemQTY").val())) {
            $("#Quantity").css("border", 'solid green 2px');
        } else {
            $("#Quantity").css("border", 'solid red 2px');
        }
    } else {
        $("#Quantity").css("border", 'solid red 2px');
    }
});

function checkOrderAndItem(itemQty) {
    for (let j = 0; j < order.length; j++) {
        if (order[j].orderId === $("#orderId").val() && order[j].itemCode === $("#item-itemCode").val()) {
            order[j].itemQty = Number(order[j].itemQty) + Number(itemQty);
            console.log( order[j].itemQty)
            return true;
        }
    }
    return false;
}

$("#addToCart").click(function () {
    let nic = $("#invoice-customerNIC").val();
    let code = $("#item-itemCode").val();
    if (nic !== "Select NIC" && code !== "Select Code") {
        let orderId = $("#orderId").val();
        let itemCode = $("#item-itemCode").val();
        let itemName = $("#itemName").val();
        let itemPrice = $("#itemPrice").val();
        let itemQty = $("#Quantity").val();
        if (!checkOrderAndItem(itemQty)) {
            order.push({
                orderId: orderId,
                itemCode: itemCode,
                itemName: itemName,
                itemPrice: itemPrice,
                itemQty: itemQty
            });
        }

        addToCart();
    } else {
        $("#invoice-customerNIC").css("border", 'solid red 2px');
        $("#item-itemCode").css("border", 'solid red 2px');
        $("#customerName").css("border", 'solid red 2px');
        $("#customerTel").css("border", 'solid red 2px');
        $("#customerAddress").css("border", 'solid red 2px');
        $("#itemName").css("border", 'solid red 2px');
        $("#itemPrice").css("border", 'solid red 2px');
        $("#itemQTY").css("border", 'solid red 2px');
    }
});

function addToCart() {
    let tableBody = $("#order-table");
    tableBody.empty();
    for (let i = 0; i < order.length; i++) {
        if (order[i].orderId === $("#orderId").val()) {
            let tr = `<tr>
                        <td>${order[i].itemCode}</td>
                        <td>${order[i].itemName}</td>
                        <td>${order[i].itemPrice}</td>
                        <td>${order[i].itemQty}</td>
                        <td>
                          <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                        </td>
                      </tr>`;
            tableBody.append(tr);
        }
    }


}



