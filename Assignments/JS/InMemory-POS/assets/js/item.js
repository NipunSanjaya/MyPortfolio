$("#save-item").click(function () {
    let code = $("#inputItemCode").val();
    let name = $("#inputItemName").val();
    let price = $("#inputItemPrice").val();
    let qty = $("#inputItemQuantity").val();
    $("#item-table-body").empty();
    if (checkCode(code)) {
        item.push({
            code: code,
            name: name,
            price: price,
            qty: qty
        });
        loadItems();
    } else {
        alert("This item already exists");
        loadItems();
    }
    clearNewItemForm();
});

function loadItems() {
    let tableBody = $("#item-table-body");
    for (let i = 0; i < item.length; i++) {
        let tr = `<tr>
                    <td>${item[i].code}</td>
                    <td>${item[i].name}</td>
                    <td>${item[i].price}</td>
                    <td>${item[i].qty}</td>
                    <td>
                      <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                      <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;"><i class="fa-solid fa-pencil"></i></button>
                    </td>
                  </tr>`;
        tableBody.append(tr);
    }
    getUpdateItem();
    getDeleteItem();
}

$("#addNewItemClearButton").click(function () {
    clearNewItemForm();
});

/*function getCustomer() {
    $("#customer-table-body>tr").click(function () {
        let nic = $(this).children().eq(0).text();
        let name = $(this).children().eq(1).text();
        let tel = $(this).children().eq(2).text();
        let address = $(this).children().eq(3).text();
        $('#inputNIC').val(nic);
        $('#inputName').val(name);
        $('#inputTel').val(tel);
        $('#inputAddress').val(address);
        popUpAddCustomerForm();
    });
}*/
function getDeleteItem() {
    $("#item-table-body>tr>td>button:nth-child(1)").click(function () {
        let code = $(this).parents("#item-table-body>tr").children().eq(0).text();
        let consent = confirm("Do you want to delete.?");
        if (consent) {
            let response = deleteItem(code);
            if (response) {
                alert("Item Deleted");
                $("#item-table-body").empty();
                loadItems();
            } else {
                alert("Item Not Removed..!");
            }
        }
    });
}

function deleteItem(code) {
    for (let i = 0; i < item.length; i++) {
        // item.log(code)
        if (item[i].code === code) {
            item.splice(i, 1);
            return true;
        }
    }
    return false;
}

function getUpdateItem() {
    $("#item-table-body>tr>td>button:nth-child(2)").click(function () {
        let code = $(this).parents("#item-table-body>tr").children().eq(0).text();
        let name = $(this).parents("#item-table-body>tr").children().eq(1).text();
        let price = $(this).parents("#item-table-body>tr").children().eq(2).text();
        let qty = $(this).parents("#item-table-body>tr").children().eq(3).text();
        console.log(code)
        $('#inputUpdateItemCode').val(code);
        $('#inputUpdateItemName').val(name);
        $('#inputUpdateItemPrice').val(price);
        $('#inputUpdateItemQuantity').val(qty);
        popUpUpdateItemForm();
    });
}

function popUpUpdateItemForm() {
    let modalToggle = $('#item-table-body>tr');
    let myModal = new bootstrap.Modal($('#updateItem'));
    myModal.show(modalToggle);
}

function clearNewItemForm() {
    $("#inputItemCode,#inputItemName,#inputItemQuantity,#inputItemPrice").val("");
    $("#inputItemCode").focus();
}

function checkCode(code) {
    for (let i = 0; i < item.length; i++) {
        if (code === item[i].code) {
            return false;
        }
    }
    return true;
}


$("#itemSearchButton").click(function () {
    let x = $("#itemSearchBar").val();
    item.filter(function (e) {
        if (e.code === x) {
            $("#item-table-body").empty();
            let tableBody = $("#item-table-body");
            let tr = `<tr>
                    <td>${e.code}</td>
                    <td>${e.name}</td>
                    <td>${e.price}</td>
                    <td>${e.qty}</td>
                    <td>
                      <button type="button" class="btn btn-danger border-0" style="background-color: #ff0014"><i class="fa-solid fa-trash-can"></i></button>
                      <button type="button" class="btn border-0 btn-danger" style="background-color: #1aff00;"><i class="fa-solid fa-pencil"></i></button>
                    </td>
                  </tr>`;
            tableBody.append(tr);
            getUpdateItem();
            getDeleteItem();
        } else {
            alert("This item code does not match");
        }
    });
});


$("#itemSearchClear").click(function () {
    $("#itemSearchBar").val("");
    $("#item-table-body").empty();
    loadItems();
});
let item1 = undefined;

function searchItem(code) {
    return item.find(function (item) {
        return item.code === code;
    });
}

$("#itemUpdateButton").click(function () {
    item1 = searchItem($("#inputUpdateItemCode").val());
    item1.name = $("#inputUpdateItemName").val();
    item1.price = $("#inputUpdateItemPrice").val();
    item1.qty = $("#inputUpdateItemQuantity").val();
    $("#item-table-body").empty();
    clearUpdateItemForm();
    loadItems();
});

function clearUpdateItemForm() {
    $("#inputUpdateItemCode").val("");
    $("#inputUpdateItemName").val("");
    $("#inputUpdateItemPrice").val("");
    $("#inputUpdateItemQuantity").val("");
}
$("#inputItemCode,#inputItemName,#inputItemPrice,#inputItemQuantity").keydown(function (e) {
    if (e.key === "Tab") {
        e.preventDefault();
    }
});
$("#inputItemCode").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputItemName").focus();
    }
});
$("#inputItemName").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputItemPrice").focus();
    }
});
$("#inputItemPrice").keydown(function (e) {
    if (e.key === "Enter") {
        $("#inputItemQuantity").focus();
    }
});

/*
let code=/^I00-00[1-9]\d{2}$/,name=/^[a-zA-Z\s.'-]{2,}$/,price=/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d{2})?$/,qty=/^\d+(\.\d+)?$/;
$("#inputNIC").keydown(function () {
    let checkCode = code.test($("#inputItemCode").val());
    if (!checkCode) {
        $("#inputItemCode").css("border", 'solid red 2px');
    } else {
        $("#inputItemCode").css("border", 'solid green 2px');
    }
});
$("#inputItemName").keydown(function () {
    let check =name.test($("#inputItemName").val());
    if (!check) {
        $("#inputItemName").css("border", 'solid red 2px');
    } else {
        $("#inputItemName").css("border", 'solid green 2px');
    }
});
$("#inputItemPrice").keydown(function () {
    let check = price.test($("#inputItemPrice").val());
    if (!check) {
        $("#inputItemPrice").css("border", 'solid red 2px');
    } else {
        $("#inputItemPrice").css("border", 'solid green 2px');
    }
});
$("#inputItemQuantity").keydown(function () {
    let check = qty.test($("#inputItemQuantity").val());
    if (!check) {
        $("#inputItemQuantity").css("border", 'solid red 2px');
    } else {
        $("#inputItemQuantity").css("border", 'solid green 2px');
    }
});

*/