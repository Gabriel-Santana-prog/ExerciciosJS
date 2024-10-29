$("#somar").click(function(){
    somarDois();    
})
function somarDois(){
    let v1= parseInt($("#valor1").val());
    let v2= parseInt($("#valor2").val());
    soma=v1+v2;
    $("#resul").html(soma);
}