$(document).ready(function() {
// Scrape button

$.ajax ({
    method: "GET",
    url:"/articles"
}).then(function (data) {
    for (let i = 0; i < data.length; i++) {
        $(".articleContainer").append("<div class= 'card scrapedData'>"+"<span>"+"Title: "+ data[i].title + "</span>" + "<br><br>" +"<span>"+"Link: "+ data[i].link + "</span>" + "<br><br>" + "<button class='saveButton' id=" + data[i]._id +">" + 'Save Article' + "</button>" + "</div>")

        if (data[i].saved === true) {
            $(".scrapedData").append("<button class='addNote' id=" +data[i]._id + ">" + 'Add Note' + "</button>")
        }
    }
    if (data) {
        $("#noScapeHolder").hide();
    }
   
});


$("#scrapeBut").on("click", function() {
    console.log("this is working");
    $.ajax({
        method: "GET",
        url: "/scrape",
    }).then(function(data) {
        $("#noScapeHolder").hide();
            $.ajax({
                method: "GET",
                url: "/articles"
            })
            .then(function (data) {
        for (let i = 0; i < data.length; i++) {
            $(".articleContainer").append("<div class= 'card scrapedData'>"+"<span>"+"Title: "+ data[i].title + "</span>" + "<br><br>" +"<span>"+"Link: "+ data[i].link + "</span>" + "<br><br>" + "<button class='saveButton' id=" + data[i]._id +">" + 'Save Article' + "</button>" + "</div>")
        }

    })
    })
});


//Handle Save Article button
$(document).on("click", ".saveButton", function() {
    var thisId = $(this).attr("id");
    $.ajax({
        method: "POST",
        url: "/articles/saved/" + thisId
    }).then(function(data) {
        console.log(data)
        // console.log(data.saved); 
    })
});

    $(document).on("click", ".deleteButton", function() {    $.ajax({
        method: "POST",
        url: "/articles/deleteSaved/" + thisId
    }).then(function(data) {
        console.log(data) 
    })
});


$(document).on("click", ".addNote", function() {
    var thisId = $(this).attr("id");


})
});
