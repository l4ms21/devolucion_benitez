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

    // Function to print the page
    window.imprimirPagina = function() {
        // Get values from inputs
        const ventaBola = parseFloat(document.getElementById("ventaBola").value) || 0;
        const ventaRifa = parseFloat(document.getElementById("ventaRifa").value) || 0;
        const comisionBola = ventaBola * (parseFloat(document.getElementById("comisionBola").value) || defaultComisionBola) / 100;
        const alcanzaBola = ventaBola - comisionBola;
        const comisionRifa = ventaRifa * (parseFloat(document.getElementById("comisionRifa").value) || defaultComisionRifa) / 100;
        const alcanzaRifa = ventaRifa - comisionRifa;
        const pagoDonaVicky = alcanzaBola + alcanzaRifa;
        const comisionLocal = comisionBola + comisionRifa;

        const resultWindow = window.open('', '_blank');
        resultWindow.document.write(`
            <html>
            <head>
                <title>Reporte de Cálculo de Bola y Rifa</title>
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
                    .total-general {
                        text-align: center;
                        font-weight: bold;
                        margin-top: 20px;
                    }
                </style>
            </head>
            <body>
                <h1>Reporte de Cálculo de Bola y Rifa</h1>
                <table>
                    <tr>
                        <th></th>
                        <th>Día</th>
                        <th colspan="3">${formattedDate}</th>
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
                        <td>${ventaBola.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                        <td>${ventaRifa.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                        <td>${pagoDonaVicky.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                        <td>${comisionLocal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                    </tr>
                    <tr>
                        <td>Comisión</td>
                        <td>${comisionBola.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                        <td>${comisionRifa.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>Alcanza</td>
                        <td>${alcanzaBola.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                        <td>${alcanzaRifa.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
                <div class="total-general">
                    <h3>Venta Total:</h3>
                    <p>${(pagoDonaVicky + comisionLocal).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' })}</p>
                </div>
                <div>
                    <button onclick="window.close()">Cerrar</button>
                </div>
            </body>
            </html>
        `);

        resultWindow.document.close(); // Close the document
    };
});
