$(".entry").click(function(){
    if ($(this).children("p.arrow").text() === "▶") {
        $(this).children("p.arrow").text("▼");
        $(this).next().show();
    } else {
        $(this).children("p.arrow").text("▶");
        $(this).next().hide();
    }
});
