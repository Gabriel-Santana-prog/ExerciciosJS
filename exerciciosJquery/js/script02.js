$("#btn").click(function(){
    $("#ex1").html("<h1>Isto é uma tag </h1> <h2>Isto é uma tag</h2>");
});
$("#btn2").click(function(){
    $("#ex1").text("<h1> Isto não é uma tag</h1>");
});
$("#btn3").click(function(){
    $("#ex1").append(" Uso do método append");
});
$("#btn4").click(function(){
    $("#ex1").prepend("Uso do método prepend ");
});
$("#btn5").click(function(){
    $("#ex1").empty();
});
$("#btn6").click(function(){
    $("#ex1").remove();
});