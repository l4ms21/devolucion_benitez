document.addEventListener("DOMContentLoaded", function() {
    // Función para añadir filas a las tablas
    window.addRow = function(section) {
        const table = document.getElementById(section + 'Table').getElementsByTagName('tbody')[0];
        const newRow = table.insertRow();
        
        const cachitosCell = newRow.insertCell(0);
        const premioCell = newRow.insertCell(1);
        const totalCell = newRow.insertCell(2);

        cachitosCell.innerHTML = '<input type="number" class="cachitos" onchange="calculateRow(this)">';
        premioCell.innerHTML = `
            <input type="text" class="premio" list="${section}List" onchange="calculateRow(this)">
            <datalist id="${section}List">
                <!-- Options will be added dynamically -->
            </datalist>
        `;
        totalCell.innerHTML = '<span class="total"></span>';
    };

    // Función para calcular el total de una fila
    window.calculateRow = function(element) {
        const row = element.closest('tr');
        const cachitos = parseFloat(row.querySelector('.cachitos').value) || 0;
        const value = parseFloat(row.querySelector('.premio, .valor').value) || 0;
        const total = cachitos * value;
        row.querySelector('.total').textContent = total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

        updateTotals();
    };

    // Función para actualizar los totales generales
    function updateTotals() {
        const premiosTable = document.getElementById('premiosTable');
        const reintegrosTable = document.getElementById('reintegrosTable');
        
        let premiosTotal = 0;
        let reintegrosTotal = 0;

        premiosTable.querySelectorAll('tbody tr').forEach(row => {
            const total = parseFloat(row.querySelector('.total').textContent.replace(/[^0-9.-]+/g, '')) || 0;
            premiosTotal += total;
        });
        reintegrosTable.querySelectorAll('tbody tr').forEach(row => {
            const total = parseFloat(row.querySelector('.total').textContent.replace(/[^0-9.-]+/g, '')) || 0;
            reintegrosTotal += total;
        });

        document.getElementById('premiosTotal').textContent = premiosTotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
        document.getElementById('reintegrosTotal').textContent = reintegrosTotal.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
        document.getElementById('totalGeneral').textContent = (premiosTotal + reintegrosTotal).toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    }

    // Función para imprimir los datos
    window.imprimirPagina = function() {
        let premiosRows = '';
        document.querySelectorAll('#premiosTable tbody tr').forEach(row => {
            const cachitos = row.querySelector('.cachitos').value;
            const premio = row.querySelector('.premio').value;
            const total = row.querySelector('.total').textContent;
            premiosRows += `
                <tr>
                    <td><label>${cachitos}</label></td>
                    <td><label>${premio}</label></td>
                    <td><label>${total}</label></td>
                </tr>
            `;
        });
        const premiosTotal = document.getElementById('premiosTotal').textContent;

        let reintegrosRows = '';
        document.querySelectorAll('#reintegrosTable tbody tr').forEach(row => {
            const cachitos = row.querySelector('.cachitos').value;
            const valor = row.querySelector('.valor').value;
            const total = row.querySelector('.total').textContent;
            reintegrosRows += `
                <tr>
                    <td><label>${cachitos}</label></td>
                    <td><label>${valor}</label></td>
                    <td><label>${total}</label></td>
                </tr>
            `;
        });
        const reintegrosTotal = document.getElementById('reintegrosTotal').textContent;
        const totalGeneral = document.getElementById('totalGeneral').textContent;

        // Genera el contenido de la nueva página
        const resultWindow = window.open('', '_blank');
        resultWindow.document.write(`
            <html>
            <head>
                <title>Reporte de Premios y Reintegros</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        padding: 20px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                    .container {
                        width: 90%;
                        max-width: 1200px;
                        margin: 0 auto;
                    }
                    h1 {
                        font-size: 24px;
                        text-align: center;
                    }
                    table {
                        width: 100%;
                        border-collapse: collapse;
                        margin-bottom: 20px;
                    }
                    table th, table td {
                        border: 1px solid #ddd;
                        padding: 8px;
                        text-align: center;
                    }
                    table th {
                        background-color: #f2f2f2;
                    }
                    tfoot tr td {
                        font-weight: bold;
                    }
                    .total-general {
                        text-align: center;
                        font-weight: bold;
                        margin-top: 40px;
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
                    <h1>Reporte de Premios y Reintegros</h1>
                    
                    <h2>Premios</h2>
                    <table>
                        <thead>
                            <tr>
                                <th># de Cachitos</th>
                                <th>Premio</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${premiosRows}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2"><strong>Total en Premios:</strong></td>
                                <td>${premiosTotal}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <h2>Reintegros</h2>
                    <table>
                        <thead>
                            <tr>
                                <th># de Cachitos</th>
                                <th>Valor</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${reintegrosRows}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="2"><strong>Total en Reintegros:</strong></td>
                                <td>${reintegrosTotal}</td>
                            </tr>
                        </tfoot>
                    </table>

                    <div class="total-general">
                        <h3>Total General: ${totalGeneral}</h3>
                    </div>

                    <div class="buttons">
                        <button onclick="window.close()">Cerrar</button>
                    </div>
                </div>
            </body>
            </html>
        `);
        resultWindow.document.close(); // Cierra el flujo de escritura para el nuevo documento
    }
});
