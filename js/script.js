const tela = document.getElementById("tela");
const calculoDisplay = document.getElementById("calculo");

let valorAtual = "";
let operador = "";
let valorAnterior = "";
let expressao = "";


function calcular() {
    let resultado;
    const numAnterior = Number(valorAnterior);
    const numAtual = Number(valorAtual);

    if (operador === "+") {
        resultado = numAnterior + numAtual;
    } else if (operador === "-") {
        resultado = numAnterior - numAtual;
    } else if (operador === "*") {
        resultado = numAnterior * numAtual;
    } else if (operador === "/") {
        if (numAtual !== 0) {
            resultado = numAnterior / numAtual;
        } else {
            resultado = "";
        }
    }

    return resultado;
}

function formatarExpressao(exp) {
    return exp.replace(/(\d+|\.)|([+\-*/])/g, (match, num, op) => {
        if (num) return `<span class="numero">${num}</span>`;
        if (op) return `<span class="operador">${op}</span>`;
    });
}

document.querySelectorAll("[data-num]").forEach(botao => {
    botao.addEventListener("click", () => {
        const num = botao.getAttribute("data-num");
       
        if (num === "." && valorAtual.includes(".")) {
            return;
        }

        valorAtual += num;
        expressao += num;
        tela.value = valorAtual;
        calculoDisplay.innerHTML = formatarExpressao(expressao);
    });
});

document.querySelectorAll("[data-op]").forEach(botao => {
    botao.addEventListener("click", () => {
        const op = botao.getAttribute("data-op");

        if (op === "=") {
            if (operador && valorAtual && valorAnterior) {
                const resultado = calcular();
                tela.value = resultado;
                valorAtual = resultado.toString();
                valorAnterior = "";
                operador = "";
                expressao = valorAtual;
                calculoDisplay.innerHTML = formatarExpressao(expressao);
            }
        } 
        else if (op === "Ac") {
            valorAtual = "";
            valorAnterior = "";
            operador = "";
            expressao = "";
            tela.value = "0";
            calculoDisplay.innerHTML = "";
        }
        else if (op === "<") {
            if (valorAtual.length > 0) {
                valorAtual = valorAtual.slice(0, -1);
                expressao = expressao.slice(0, -1);
                tela.value = valorAtual || "0";
                calculoDisplay.innerHTML = formatarExpressao(expressao);
            }
        }
        else {
            if (valorAtual === "") return;
            
            if (operador && valorAtual) {
                const resultado = calcular();
                valorAnterior = resultado.toString();
                valorAtual = "";
                operador = op;
                expressao = valorAnterior + op;
            } else {
                valorAnterior = valorAtual;
                valorAtual = "";
                operador = op;
                expressao += op;
            }
            
            calculoDisplay.innerHTML = formatarExpressao(expressao);
            tela.value = "";
        }
    });
});