$("#login_section").css("display", 'block');
$("#home_section").css("display", 'none');
$("#nav_bar").css("display", 'none');
$("#customer_section").css("display", 'none');
$("#order_section").css("display", 'none');
$("#store_section").css("display", 'none');

$("#log_in").click(function () {
    $("#home_section").css("display", 'block');
    $("#nav_bar").css("display", 'block');
    $("#customer_section").css("display", 'none');
    $("#order_section").css("display", 'none');
    $("#store_section").css("display", 'none');
    $("#login_section").css("display", 'none');
});
$("#home").click(function () {
    $("#home_section").css("display", 'block');
    $("#customer_section").css("display", 'none');
    $("#order_section").css("display", 'none');
    $("#store_section").css("display", 'none');
});
$("#customer").click(function () {
    $("#home_section").css("display", 'none');
    $("#customer_section").css("display", 'block');
    $("#order_section").css("display", 'none');
    $("#store_section").css("display", 'none');
});
$("#order").click(function () {
    loadComboBox();
    setOrderId();
    console.log(new Date())
    $("#home_section").css("display", 'none');
    $("#customer_section").css("display", 'none');
    $("#order_section").css("display", 'block');
    $("#store_section").css("display", 'none');
});
$("#store").click(function () {
    $("#home_section").css("display", 'none');
    $("#customer_section").css("display", 'none');
    $("#order_section").css("display", 'none');
    $("#store_section").css("display", 'block');
});
$("#log_out").click(function () {
    $("#home_section").css("display", 'none');
    $("#customer_section").css("display", 'none');
    $("#order_section").css("display", 'none');
    $("#store_section").css("display", 'none');
    $("#nav_bar").css("display", 'none');
    $("#login_section").css("display", 'block');
});