document.addEventListener('DOMContentLoaded', cargarClasificacion);

async function cargarClasificacion() {
    const torneoId = 1; // ID del torneo actual
    const grupoId = 'A'; // El grupo que queremos mostrar
    const tablaBody = document.getElementById('tabla-body');
    
    // Simulación de datos que vendrían del Backend
    // En la vida real, se haría:
    // const response = await fetch(`/api/clasificacion/${grupoId}?torneo=${torneoId}`);
    // const equipos = await response.json();
    
    // Datos de ejemplo para mostrar la tabla
    const equipos = [
        { nombre: 'Uruguay', pj: 3, pg: 2, pe: 1, pp: 0, gf: 5, gc: 2, pts: 7 },
        { nombre: 'México', pj: 3, pg: 1, pe: 1, pp: 1, gf: 3, gc: 3, pts: 4 },
        { nombre: 'Francia', pj: 3, pg: 0, pe: 3, pp: 0, gf: 2, gc: 2, pts: 3 },
        { nombre: 'Sudáfrica', pj: 3, pg: 0, pe: 1, pp: 2, gf: 1, gc: 4, pts: 1 }
    ];

    tablaBody.innerHTML = ''; // Limpiar
    
    equipos.forEach((equipo, index) => {
        const fila = tablaBody.insertRow();
        const pos = index + 1;
        
        // Determinar si clasifica (ej: los 2 primeros)
        if (pos <= 2) {
            fila.classList.add('clasificado');
        }

        const dif = equipo.gf - equipo.gc;
        
        // 1. Posición
        fila.insertCell().textContent = pos;
        
        // 2. Nombre del Equipo (Columna especial)
        const equipoCell = fila.insertCell();
        equipoCell.textContent = equipo.nombre;
        equipoCell.classList.add('equipo-col');
        
        // 3. PJ, PG, PE, PP...
        fila.insertCell().textContent = equipo.pj;
        fila.insertCell().textContent = equipo.pg;
        fila.insertCell().textContent = equipo.pe;
        fila.insertCell().textContent = equipo.pp;
        fila.insertCell().textContent = equipo.gf;
        fila.insertCell().textContent = equipo.gc;
        fila.insertCell().textContent = dif;

        // 4. Puntos (Columna de puntos)
        const ptsCell = fila.insertCell();
        ptsCell.textContent = equipo.pts;
        ptsCell.classList.add('puntos-col');
    });
}