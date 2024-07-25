const multiplicadores = [1, 2, 3, 4, 5, 10, 15, 20];
let inputFields = [];
let resultLabels = [];
let totalLabel = document.getElementById('totalLabel');
let seriesLabel = document.getElementById('seriesLabel');
let messageLabel = document.getElementById('messageLabel');
let total = 0;

function obtenerFechaActual() {
    const today = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString('es-ES', options);
}

function mostrarFechaActual() {
    document.getElementById('currentDate').textContent = obtenerFechaActual();
}

function crearInputs() {
    const inputsDiv = document.getElementById('inputs');
    multiplicadores.forEach((multiplicador, index) => {
        const row = document.createElement('div');
        row.className = 'row';
        row.innerHTML = `<label>${multiplicador} x </label>
                         <input type="number" oninput="actualizarResultado(${index})"> 
                         <label id="resultLabel${index}"> = </label>`;
        inputsDiv.appendChild(row);
        inputFields.push(row.querySelector('input'));
        resultLabels.push(row.querySelector(`#resultLabel${index}`));
    });
}

function actualizarResultado(index) {
    try {
        let userInput = parseFloat(inputFields[index].value) || 0;
        let result = multiplicadores[index] * userInput;
        resultLabels[index].textContent = ` = ${result}`;
        updateTotalAndSeries();
    } catch (e) {
        resultLabels[index].textContent = ' = ';
    }
}

function updateTotalAndSeries() {
    total = 0;
    inputFields.forEach((input, index) => {
        let userInput = parseFloat(input.value) || 0;
        let result = multiplicadores[index] * userInput;
        total += result;
    });
    totalLabel.textContent = `Total de billetes: ${total}`;
    let series = total / 20;
    seriesLabel.textContent = `Número de Series: ${series.toFixed(2)}`;

    let totalBilletes = Math.round(total);
    let ultimoDigito = totalBilletes % 10;

    let message = '';
    if (ultimoDigito !== 0 && ultimoDigito !== 5) {
        let sobrantesQuitar = ultimoDigito > 5 ? ultimoDigito - 5 : ultimoDigito;
        let sobrantesAgregar = 10 - ultimoDigito;

        if (sobrantesQuitar !== 5) {
            message += `Quitar <b>${sobrantesQuitar}</b> billetes<br>`;
        }
        message += `Agregar <b>${sobrantesAgregar}</b> billetes`;
        seriesLabel.style.color = 'red';
    } else {
        seriesLabel.style.color = 'black';
    }
    messageLabel.innerHTML = message;
}

function borrar() {
    // Refrescar la página para borrar todo
    location.reload();
}

function mostrarResultados() {
    const fechaActual = obtenerFechaActual();
    let results = '';
    for (let i = 0; i < multiplicadores.length; i++) {
        results += `<p>${multiplicadores[i]} x ${inputFields[i].value} = ${resultLabels[i].textContent.replace(' = ', '')}</p>`;
    }
    results += `<p>${totalLabel.textContent}</p>`;
    results += `<p>${seriesLabel.textContent}</p>`;
    results += `<p>${messageLabel.innerHTML}</p>`;

    const resultWindow = window.open('', '_blank');
    resultWindow.document.write(`
        <html>
        <head>
            <title>Devolución - ${fechaActual}</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                }
                .container {
                    width: 400px;
                    margin: 0 auto;
                    text-align: center;
                }
                h1 {
                    font-size: 24px;
                    text-align: center;
                }
                p {
                    font-size: 18px;
                    margin-bottom: 10px;
                }
                .message {
                    margin-top: 20px;
                    font-size: 18px;
                }
                .buttons {
                    display: flex;
                    justify-content: center;
                    margin-top: 20px;
                }
                .buttons button {
                    width: 100px;
                    height: 40px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Devolución - ${fechaActual}</h1>
                ${results}
                <div class="buttons">
                    <button onclick="window.close()">Cerrar</button>
                </div>
            </div>
        </body>
        </html>
    `);
}

function calcularComision() {
    const comisionWindow = window.open('', '_blank');

    const head = comisionWindow.document.head;
    const body = comisionWindow.document.body;

    const style = comisionWindow.document.createElement('style');
    style.textContent = `
        body { font-family: Arial, sans-serif; padding: 20px; }
        .container { width: 400px; margin: 0 auto; text-align: center; }
        h1 { font-size: 24px; text-align: center; }
        .row { display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
        .row input { flex: 1; margin-left: 10px; }
        .row label { width: 150px; }
        .result { margin-top: 20px; }
        .result label { font-weight: bold; }
        .buttons { display: flex; justify-content: center; margin-top: 20px; }
        .buttons button { width: 120px; height: 40px; }
    `;
    head.appendChild(style);

    const container = comisionWindow.document.createElement('div');
    container.className = 'container';

    const title = comisionWindow.document.createElement('h1');
    title.textContent = 'Calcular Comisión';
    container.appendChild(title);

    const seriesRow = comisionWindow.document.createElement('div');
    seriesRow.className = 'row';
    const seriesLabel = comisionWindow.document.createElement('label');
    seriesLabel.setAttribute('for', 'seriesInput');
    seriesLabel.textContent = 'Series Recibidas:';
    const seriesInput = comisionWindow.document.createElement('input');
    seriesInput.setAttribute('type', 'number');
    seriesInput.setAttribute('id', 'seriesInput');
    seriesRow.appendChild(seriesLabel);
    seriesRow.appendChild(seriesInput);
    container.appendChild(seriesRow);

    const precioRow = comisionWindow.document.createElement('div');
    precioRow.className = 'row';
    const precioLabel = comisionWindow.document.createElement('label');
    precioLabel.setAttribute('for', 'precioInput');
    precioLabel.textContent = 'Precio por Billete:';
    const precioInput = comisionWindow.document.createElement('input');
    precioInput.setAttribute('type', 'number');
    precioInput.setAttribute('id', 'precioInput');
    precioRow.appendChild(precioLabel);
    precioRow.appendChild(precioInput);
    container.appendChild(precioRow);

    const resultContainer = comisionWindow.document.createElement('div');
    resultContainer.className = 'result';
    const totalBilletesRecibidosLabel = comisionWindow.document.createElement('label');
    totalBilletesRecibidosLabel.setAttribute('id', 'totalBilletesRecibidosLabel');
    totalBilletesRecibidosLabel.textContent = 'Total de Billetes Recibidos: ';
    const totalBilletesDevueltosLabel = comisionWindow.document.createElement('label');
    totalBilletesDevueltosLabel.setAttribute('id', 'totalBilletesDevueltosLabel');
    totalBilletesDevueltosLabel.textContent = 'Total de Billetes Devueltos: ' + total;
    const totalBilletesVendidosLabel = comisionWindow.document.createElement('label');
    totalBilletesVendidosLabel.setAttribute('id', 'totalBilletesVendidosLabel');
    totalBilletesVendidosLabel.textContent = 'Total de Billetes Vendidos: ';
    const totalAmountLabel = comisionWindow.document.createElement('label');
    totalAmountLabel.setAttribute('id', 'totalAmountLabel');
    totalAmountLabel.textContent = 'Total en $: ';
    const comisionLabel = comisionWindow.document.createElement('label');
    comisionLabel.setAttribute('id', 'comisionLabel');
    comisionLabel.textContent = 'Comisión del Expendio (10%): ';
    const pagoAgenciaLabel = comisionWindow.document.createElement('label');
    pagoAgenciaLabel.setAttribute('id', 'pagoAgenciaLabel');
    pagoAgenciaLabel.textContent = 'Pago a la Agencia (90%): ';
    resultContainer.appendChild(totalBilletesRecibidosLabel);
    resultContainer.appendChild(document.createElement('br'));
    resultContainer.appendChild(totalBilletesDevueltosLabel);
    resultContainer.appendChild(document.createElement('br'));
    resultContainer.appendChild(totalBilletesVendidosLabel);
    resultContainer.appendChild(document.createElement('br'));
    resultContainer.appendChild(totalAmountLabel);
    resultContainer.appendChild(document.createElement('br'));
    resultContainer.appendChild(comisionLabel);
    resultContainer.appendChild(document.createElement('br'));
    resultContainer.appendChild(pagoAgenciaLabel);
    container.appendChild(resultContainer);

    const buttonsContainer = comisionWindow.document.createElement('div');
    buttonsContainer.className = 'buttons';
    const calcularButton = comisionWindow.document.createElement('button');
    calcularButton.textContent = 'Calcular Comisión';
    calcularButton.onclick = () => {
        const series = parseFloat(seriesInput.value) || 0;
        const precio = parseFloat(precioInput.value) || 0;
        const totalBilletesRecibidos = series * 20;
        const totalBilletesVendidos = totalBilletesRecibidos - total;
        const totalAmount = totalBilletesVendidos * precio;
        const comision = totalAmount * 0.10;
        const pagoAgencia = totalAmount * 0.90;

        totalBilletesRecibidosLabel.textContent = 'Total de Billetes Recibidos: ' + totalBilletesRecibidos;
        totalBilletesVendidosLabel.textContent = 'Total de Billetes Vendidos: ' + totalBilletesVendidos;
        totalAmountLabel.textContent = 'Total en $: ' + totalAmount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
        comisionLabel.textContent = 'Comisión del Expendio (10%): ' + comision.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
        pagoAgenciaLabel.textContent = 'Pago a la Agencia (90%): ' + pagoAgencia.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });                
    };
    buttonsContainer.appendChild(calcularButton);

    const cerrarButton = comisionWindow.document.createElement('button');
    cerrarButton.textContent = 'Cerrar';
    cerrarButton.onclick = () => {
        comisionWindow.close();
    };
    buttonsContainer.appendChild(cerrarButton);

    container.appendChild(buttonsContainer);
    body.appendChild(container);
}

function abrirCorteBolaYRifa() {
    const corteWindow = window.open('CBR.html', '_blank'); //('', '_blank'); //

    const head = corteWindow.document.head;
    const body = corteWindow.document.body;

    const style = corteWindow.document.createElement('style');
    style.textContent = `
        body { font-family: Arial, sans-serif; padding: 20px; }
        .container { width: 400px; margin: 0 auto; text-align: center; }
        h1 { font-size: 24px; text-align: center; }
        .row { display: flex; align-items: center; justify-content: center; margin-bottom: 10px; }
        .row input { flex: 1; margin-left: 10px; }
        .row label { width: 150px; }
        .result { margin-top: 20px; }
        .result label { font-weight: bold; }
        .buttons { display: flex; justify-content: center; margin-top: 20px; }
        .buttons button { width: 120px; height: 40px; }
    `;
    head.appendChild(style);

    const container = corteWindow.document.createElement('div');
    container.className = 'container';

    const title = corteWindow.document.createElement('h1');
    title.textContent = 'Corte Bola y Rifa';
    container.appendChild(title);

    const corteContent = corteWindow.document.createElement('div');
    corteContent.className = 'result';
    corteContent.innerHTML = `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Calcular Bola y Rifa</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
        }
        table {
            border-collapse: collapse;
            width: 80%;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: center;
        }
        th {
            background-color: #f2f2f2;
        }
        .button-container {
            margin-top: 20px;
        }
        .button-container button {
            padding: 10px 20px;
            font-size: 16px;
        }
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <h1>Calcular Bola y Rifa</h1>
    <label for="ventaBola">Venta Bola:</label>
    <input type="number" id="ventaBola" name="ventaBola"><br><br>
    <label for="ventaRifa">Venta Rifa:</label>
    <input type="number" id="ventaRifa" name="ventaRifa"><br><br>
    <div class="button-container">
        <button onclick="calcular()">Calcular</button>
        <button onclick="mostrarInputs()">Cambiar Porcentajes</button>
    </div>
    <div id="inputContainer" class="hidden">
        <label for="comisionBola">Comisión Bola (%):</label>
        <input type="number" id="comisionBola" name="comisionBola" step="0.01"><br><br>
        <label for="comisionRifa">Comisión Rifa (%):</label>
        <input type="number" id="comisionRifa" name="comisionRifa" step="0.01"><br><br>
    </div>
    <table id="resultTable">
        <tr>
            <th></th>
            <th id="dayOfWeek">Día</th>
            <th colspan="3">Fecha Actual</th>
        </tr>
        <tr>
            <td></td>
            <td>BOLA</td>
            <td>RIFA</td>
            <td>PAGO DOÑA VICKY</td>
            <td>COMISIÓN LOCAL</td>
        </tr>
        <tr>
            <td>Venta</td>
            <td id="ventaBolaResult"></td>
            <td id="ventaRifaResult"></td>
            <td id="pagoDonaVickyResult"></td>
            <td id="comisionLocalResult"></td>
        </tr>
        <tr>
            <td>Comisión</td>
            <td id="comisionBolaResult"></td>
            <td id="comisionRifaResult"></td>
            <td></td>
            <td></td>
        </tr>
        <tr>
            <td>Alcanza</td>
            <td id="alcanzaBolaResult"></td>
            <td id="alcanzaRifaResult"></td>
            <td></td>
            <td></td>
        </tr>
    </table>
    <script src="script.js"></script>
</body>
</html>
    `;

    document.addEventListener("DOMContentLoaded", function() {
        // Set the current date and day of the week
        const today = new Date();
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = today.toLocaleDateString('es-ES', options);
        const daysOfWeek = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
        const dayOfWeek = daysOfWeek[today.getDay()];
    
        document.getElementById("dayOfWeek").textContent = dayOfWeek;
        document.querySelectorAll("#resultTable th[colspan='3']").forEach(th => th.textContent = formattedDate);
    
        // Set default commission percentages
        let defaultComisionBola = 30;
        let defaultComisionRifa = 20;
    
        // Function to show input fields for changing commission percentages
        window.mostrarInputs = function() {
            const inputContainer = document.getElementById("inputContainer");
            if (inputContainer.classList.contains("hidden")) {
                inputContainer.classList.remove("hidden");
            } else {
                inputContainer.classList.add("hidden");
            }
        };
    
        // Calculation function
        window.calcular = function() {
            const ventaBola = parseFloat(document.getElementById("ventaBola").value) || 0;
            const ventaRifa = parseFloat(document.getElementById("ventaRifa").value) || 0;
    
            // Get commission percentages from input fields or use default values
            const comisionBolaInput = parseFloat(document.getElementById("comisionBola").value) || defaultComisionBola;
            const comisionRifaInput = parseFloat(document.getElementById("comisionRifa").value) || defaultComisionRifa;
    
            const comisionBola = ventaBola * (comisionBolaInput / 100);
            const alcanzaBola = ventaBola - comisionBola;
    
            const comisionRifa = ventaRifa * (comisionRifaInput / 100);
            const alcanzaRifa = ventaRifa - comisionRifa;
    
            const pagoDonaVicky = alcanzaBola + alcanzaRifa;
            const comisionLocal = comisionBola + comisionRifa;
    
            document.getElementById("ventaBolaResult").textContent = ventaBola.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            document.getElementById("ventaRifaResult").textContent = ventaRifa.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            document.getElementById("comisionBolaResult").textContent = comisionBola.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            document.getElementById("alcanzaBolaResult").textContent = alcanzaBola.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            document.getElementById("comisionRifaResult").textContent = comisionRifa.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            document.getElementById("alcanzaRifaResult").textContent = alcanzaRifa.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            document.getElementById("pagoDonaVickyResult").textContent = pagoDonaVicky.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
            document.getElementById("comisionLocalResult").textContent = comisionLocal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
        };
    });

    container.appendChild(corteContent);

    const closeButton = corteWindow.document.createElement('button');
    closeButton.textContent = 'Cerrar';
    closeButton.onclick = function() {
        corteWindow.close();
    };

    container.appendChild(closeButton);
    body.appendChild(container);
}

function salir() {
    window.close();
}

function abrirPyR() {
    const PyRWindow = window.open('PyR.html', '_blank');
    //window.location.href = 'PyR.html';
}

crearInputs();



