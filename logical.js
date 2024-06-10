var balance = 100; // Define o valor inicial do balanço
document.getElementById('balance').innerHTML = balance.toFixed(2) + "$"; // Mostra o valor no HTML  
let side = 1; // Define o valor inicial do lado como 1

// Reseta o saldo para o valor inicial
function resetBalance() {
    balance = 100;
    document.getElementById('balance').innerHTML = balance.toFixed(2) + "$";
}

// Divide o value por 2
function div2() {

    var value = parseFloat(document.getElementById('value').value);

    // Checa se o value é um número
    if (isNaN(value)) {
        console.error('Value must be a number');
        document.getElementById('error-msg').innerHTML = "Value must be a number"
        showMensage()
        return;
    } 
    
    // Checa se o value é igual a 1
    if (value == 1) {
        console.error('Minimum bet value is 1');
        document.getElementById('error-msg').innerHTML = "Minimum bet reached"
        showMensage()
        return;
    }

    // Ajusta os valores menores que 2 para a aposta mínima
    if (value <= 1.99) {
        value = 1;
        document.getElementById('value').value = value;
        return;
    }

    value = value/2;
    value = value.toFixed(2);
    document.getElementById('value').value = value;
}

// Multiplica o value por 2
function x2() {

    var value = parseFloat(document.getElementById('value').value);

    // Checa se o value é um número
    if (isNaN(value)) {
        console.error('Value must be a number');
        document.getElementById('error-msg').innerHTML = "Value must be a number"
        showMensage()
        return;
    } 

    // Checa se o balance é igual o value
    if (value == balance) {
        console.error('Maximum Bet');
        document.getElementById('error-msg').innerHTML = "Maximum Bet Reached"
        showMensage()
        return;
    }

    // Se o value for maior que a metade do balance iguala para a aposta máxima
    if (value >= (balance / 2) + 0.01) {
        value = balance;
        document.getElementById('value').value = value;
        return;
    }

    value = value * 2;
    value = value.toFixed(2);
    document.getElementById('value').value = value;
}

// Mostrar mensagem por 5 segundos
function showMensage() {
    document.getElementById('error').style.visibility = 'visible';
    document.getElementById('error').style.opacity = 1;
    setTimeout(() => {
        document.getElementById('error').style.visibility = 'hidden';
        document.getElementById('error').style.opacity = 0;
    }, 5000);
}

// Inverter o lado da aposta
function invertSide() {
    var multiplier = parseFloat(document.getElementById('multiplier').value);

    // Checa se o multiplier é um número, se é menor que 1.1, se é maior que 25 e inverte os valores de side
    if (isNaN(multiplier)) {
        console.error('Multiplier must be a number');
        document.getElementById('error-msg').innerHTML = "Multiplier must be a number"
        showMensage();
        return;
    } else if ((multiplier <= 1.09)) { 
        console.error('Multiplier must be greater than 1.09');
        document.getElementById('error-msg').innerHTML = "Multiplier must be greater than 1.09"
        showMensage();
        return;
    } else if (multiplier > 25) {
        console.error('Maximum multiplier is 25x');
        document.getElementById('error-msg').innerHTML = "Maximum multiplier is 25x"
        showMensage();
        return;
    } else {
        if (side == 1) {
            side = 0;
        } else {
            side = 1;
        }
    }

    // Chama a função de atualizar as linhas
    updateLines();
}

// Atualizar as linhas
function updateLines() {
    var multiplier = parseFloat(document.getElementById('multiplier').value);

    // Checa se o multiplier é número
    if (isNaN(multiplier)) {
        console.error('Multiplier must be a number');
        return;
    }

    // Função de definir o tamanho e a cor das linahs
    function colors(multiplier) {

        // Se side for = 1 o verde fica do lado direito, se não fica do lado esquerdo
        if (side == 1) {
            let player = 70 / multiplier;
            document.getElementById('line2').style.width = player + "%";
            document.getElementById('line1').style.width = (70 - player) + "%";
            document.getElementById('line2').style.backgroundColor = 'green';
            document.getElementById('line1').style.backgroundColor = 'red';
            document.getElementById('pointer').style.left = ((70 - player) + 14.75) + "%";
        } else {
            let player = 70 / multiplier;
            document.getElementById('line1').style.width = player + "%";
            document.getElementById('line2').style.width = (70 - player) + "%";
            document.getElementById('line1').style.backgroundColor = 'green';
            document.getElementById('line2').style.backgroundColor = 'red';
            document.getElementById('pointer').style.left = ((player) + 14.75) + "%";
        }
    }

    // Checa se o multiplier é menor que 1.1 e maior que 25
    if (multiplier <= 1.09) {
        console.error('Multiplier must be greater than 1.09');
    } else if (multiplier > 25) {
        console.error('Maximum multiplier is 25x');
    } else {
        colors(multiplier); // Executa a função colors
    }
}

// Função de Evento do Jogo
function percentCalculation(event) {
    // Impede o envio do formulário
    event.preventDefault();

    var value = parseFloat(document.getElementById('value').value);
    var multiplier = parseFloat(document.getElementById('multiplier').value);

    // Checa se value e multiplier são números
    if (isNaN(value) || isNaN(multiplier)) {
        console.error('Value and multiplier must be numbers');
        document.getElementById('error-msg').innerHTML = "Value and multiplier must be numbers"
        showMensage();
        return;
    }

    // Checa se value é menor que 1 e multiplier menor que 1.1, se multiplier é maior que 25, se value é maior que balance, se não executa o jogo
    if ((value < 1) || (multiplier <= 1.09)) {
        console.error('Value must be greater than 0.99 and multiplier must be greater than 1.09');
        document.getElementById('error-msg').innerHTML = "Value must be greater than 0.99 and multiplier must be greater than 1.09"
        showMensage();
        return;
    } else if (multiplier > 25) {
        console.error('Maximum multiplier is 25x');
        document.getElementById('error-msg').innerHTML = "Maximum multiplier is 25x"
        showMensage();
        return;
    } else if (value > balance) {
        console.error('The bet amount is greatter than your balance');
        document.getElementById('error-msg').innerHTML = "The bet amount is greatter than your balance"
        showMensage();
        return;
    } else {
        // Sorteia um número entre 00.00 e 100.00
        let random = Math.random() * 100;
        random = parseFloat(random.toFixed(2));

        document.getElementById('result').innerHTML = random;
        document.getElementById('pin').style.left = (12.65 + (random - (random * 0.3))) + "%";
        document.getElementById('pin').style.display = "block";

        // Mensagem de Vitória ou Derrota
        function showWinLoss() {
            document.getElementById('winloss').style.visibility = 'visible';
            document.getElementById('winloss').style.opacity = 1;
        }

        // Se side = 1 o verde está na direita, se não o verde está na esquerda, é uma lógica matemática para cada lado
        if (side == 1) {
            let player = 100 - (100 / multiplier);
            if (player <= random) {
                balance = balance + (value * (multiplier - 1));
                showWinLoss();
                document.getElementById('winloss-txt').innerHTML = `Congratulations, you won! <span>+${(value * multiplier).toFixed(2)}$</span>`;
                document.querySelector('span').style.color = 'green';
            } else {
                balance = balance - value;
                showWinLoss();
                document.getElementById('winloss-txt').innerHTML = `Unfortunately you lost! <br> <span>-${value}$</span>`;
                document.querySelector('span').style.color = 'red';
            }
        } else {
            let player = 100 / multiplier;
            if (player >= random) {
                balance = balance + (value * (multiplier - 1));
                showWinLoss();
                document.getElementById('winloss-txt').innerHTML = `Congratulations, you won! <span>+${value * multiplier}$</span>`;
                document.querySelector('span').style.color = 'green';
            } else {
                balance = balance - value;
                showWinLoss();
                document.getElementById('winloss-txt').innerHTML = `Unfortunately you lost! <br> <span>-${value}$</span>`;
                document.querySelector('span').style.color = 'red';
            }
        }
        document.getElementById('balance').innerHTML = balance.toFixed(2) + "$";
    }

}

// Atualizar as linhas e o value ao vivo
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('value').addEventListener('input', updateLines);
    document.getElementById('multiplier').addEventListener('input', updateLines);
    document.querySelector('form').addEventListener('submit', percentCalculation);
    document.getElementById('div2').addEventListener('click', div2);
    document.getElementById('x2').addEventListener('click', x2);
});