function fuckJqueryWhatTheFuck(){
    console.log("Suck my fucking nuts");
    if ($(this).children("div.arrow").text() === "▶") {
        $(this).children("div.arrow").text("▼");
        $(this).next().show();
    } else {
        $(this).children("div.arrow").text("▶");
        $(this).next().hide();
    }
}

function jQuerySucksBalls(){
    if ($(this).children("div.arrow").text() === "▶") {
        $(this).children("div.arrow").text("▼");
        $(this).next().show();
    } else {
        $(this).children("div.arrow").text("▶");
        $(this).next().hide();
    }
}

$(".entry").click(fuckJqueryWhatTheFuck);
$(".sub-entry").click(jQuerySucksBalls);

