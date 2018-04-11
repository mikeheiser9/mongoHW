$(document).ready(function() {
// Scrape button
$("#scrapeBut").on("click", function() {
    $.ajax({
        method: "GET",
        url: "/articles",
    }).then(function(data) {
        // window.location = "/"
        $("#noScapeHolder").hide();
        for (let i = 0; i < data.length; i++) {
            $(".articleContainer").append("<div class= 'card scrapedData'>"+"<span>"+"Title: "+ data[i].title + "</span>" + "<br><br>" +"<span>"+"Link: "+ data[i].link + "</span>" + "<br><br>" + "<button class='saveButton'>"+ 'Save Article' + "</button>" + "</div>")
        }
    })
});


//Handle Save Article button
$(".saveButton").on("click", function() {
    var thisId = $(this).attr("data-id");
    $.ajax({
        method: "POST",
        url: "/articles/saved/" + thisId
    }).then(function(data) {
        window.location = "/"
    })
});

// //Handle Delete Article button
// $(".delete").on("click", function() {
//     var thisId = $(this).attr("data-id");
//     $.ajax({
//         method: "POST",
//         url: "/articles/delete/" + thisId
//     }).done(function(data) {
//         window.location = "/saved"
//     })
// });

// //Handle Save Note button
// $(".saveNote").on("click", function() {
//     var thisId = $(this).attr("data-id");
//     if (!$("#noteText" + thisId).val()) {
//         alert("please enter a note to save")
//     }else {
//       $.ajax({
//             method: "POST",
//             url: "/notes/save/" + thisId,
//             data: {
//               text: $("#noteText" + thisId).val()
//             }
//           }).done(function(data) {
//               // Log the response
//               console.log(data);
//               // Empty the notes section
//               $("#noteText" + thisId).val("");
//               $(".modalNote").modal("hide");
//               window.location = "/saved"
//           });
//     }
// });

// //Handle Delete Note button
// $(".deleteNote").on("click", function() {
//     var noteId = $(this).attr("data-note-id");
//     var articleId = $(this).attr("data-article-id");
//     $.ajax({
//         method: "DELETE",
//         url: "/notes/delete/" + noteId + "/" + articleId
//     }).done(function(data) {
//         console.log(data)
//         $(".modalNote").modal("hide");
//         window.location = "/saved"
//     })
// });
});