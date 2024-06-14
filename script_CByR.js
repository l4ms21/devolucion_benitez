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
