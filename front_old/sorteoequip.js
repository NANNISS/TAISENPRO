document.getElementById('btnSorteo').addEventListener('click', iniciarSorteo);

// Simulación de los 32 equipos inscritos
const equiposInscritos = [
    "Argentina", "Brasil", "Alemania", "España", "Holanda", "Uruguay", 
    "Francia", "Inglaterra", "Portugal", "Italia", "México", "Chile", 
    "Paraguay", "Japón", "Ghana", "USA", "Corea del Sur", "Sudáfrica",
    "Dinamarca", "Camerún", "Nigeria", "Honduras", "Serbia", "Australia",
    "Suiza", "Eslovenia", "Argelia", "Grecia", "Corea del Norte", "Costa de Marfil",
    "Nueva Zelanda", "Eslovaquia"
];

const GRUPOS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
const equiposPorGrupo = 4;

function shuffleArray(array) {
    // Función de mezcla de Fisher-Yates para asegurar la aleatoriedad
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function iniciarSorteo() {
    // 1. Deshabilitar botón para evitar doble click
    const btn = document.getElementById('btnSorteo');
    btn.textContent = '... SORTEANDO ...';
    btn.disabled = true;

    // 2. Mezclar la lista de equipos inscritos
    shuffleArray(equiposInscritos);

    let equipoIndex = 0;
    const gruposAsignados = {};

    // 3. Asignar equipos a los 8 grupos
    for (const grupoName of GRUPOS) {
        const grupoList = equiposInscritos.slice(equipoIndex, equipoIndex + equiposPorGrupo);
        gruposAsignados[grupoName] = grupoList;
        equipoIndex += equiposPorGrupo;
    }
    
    // 4. Renderizar y mostrar en el HTML (simulando que la BD ha guardado el resultado)
    mostrarResultados(gruposAsignados);
    
    btn.textContent = '✅ SORTEO COMPLETADO';
    
    // NOTA: Aquí se enviaría la llamada POST a tu Backend para guardar el resultado del sorteo.
    // fetch('/api/torneo/guardar-sorteo', { method: 'POST', body: JSON.stringify(gruposAsignados) });
}

function mostrarResultados(gruposAsignados) {
    const gruposDisplay = document.getElementById('gruposDisplay');
    gruposDisplay.innerHTML = ''; // Limpiar el contenido anterior

    for (const [grupoName, equipos] of Object.entries(gruposAsignados)) {
        let htmlEquipos = equipos.map(equipo => 
            `<li class="equipo-item">${equipo}</li>`
        ).join('');
        
        const grupoCard = document.createElement('div');
        grupoCard.className = 'grupo-card';
        grupoCard.innerHTML = `
            <h3 class="grupo-title">GRUPO ${grupoName}</h3>
            <ul class="equipo-list">${htmlEquipos}</ul>
        `;
        gruposDisplay.appendChild(grupoCard);
    }
}