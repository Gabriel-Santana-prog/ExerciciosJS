$("#bt").click(function(){
    mostrarDados();
});
function mostrarDados(){
    $("#res").html(`Nome: ${$("#txtnome").val()} <br>
    E-mail: ${$("#txtemail").val()} <br> 
    Sexo: ${$("input:radio.sexo:checked").val()}`);
    
}