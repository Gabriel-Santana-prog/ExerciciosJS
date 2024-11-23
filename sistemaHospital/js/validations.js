function validarCamposObrigatorios(campos) {
    let valido = true;
    campos.forEach(campo => {
        if (!campo.value.trim()) {
            alert(`O campo "${campo.name}" é obrigatório.`);
            valido = false;
        }
    });
    return valido;
}

