$(".entry").click(function () {
    if ($(this).children("div.arrow").text() === "▶") {
        $(this).children("div.arrow").text("▼");
        $(this).next().show();
    } else {
        $(this).children("div.arrow").text("▶");
        $(this).next().hide();
    }
});

$(".sub-entry").click(function () {
    if ($(this).children("div.arrow").text() === "▶") {
        $(this).children("div.arrow").text("▼");
        $(this).next().show();
    } else {
        $(this).children("div.arrow").text("▶");
        $(this).next().hide();
    }
});

