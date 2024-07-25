document.addEventListener("DOMContentLoaded", function() {
    // Add row to table
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

    // Calculate total for a row
    window.calculateRow = function(element) {
        const row = element.closest('tr');
        const cachitos = parseFloat(row.querySelector('.cachitos').value) || 0;
        const value = parseFloat(row.querySelector('.premio, .valor').value) || 0;
        const total = cachitos * value;
        row.querySelector('.total').textContent = total.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });

        updateTotals();
    };

    // Update totals
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
});
