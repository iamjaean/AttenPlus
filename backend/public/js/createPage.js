const create_title = document.getElementById("create_title");
const title_length = document.getElementById("title_length");
$("#create_title").keyup(function (e) {
    var content = $(this).val();
    $("#title_length").html(content.length + "/50");
});
$("#create_introduce").keyup(function (e) {
    var content = $(this).val();
    $("#introduce_length").html(content.length + "/100");
});