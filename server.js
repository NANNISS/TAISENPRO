require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '76812511',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 5433,
  database: process.env.DB_NAME || 'taikenpro'
});

// Test de conexión
pool.connect((err, client, release) => {
  if (err) {
    console.error('❌ Error al conectar a la BD:', err.stack);
  } else {
    console.log('✅ Conectado a PostgreSQL');
    release();
  }
});

// ============================================
// RUTAS DE TORNEOS
// ============================================

app.get('/torneos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM torneos ORDER BY fecha_inicio DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

app.get('/torneos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM torneos WHERE id_torneo = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/torneos', async (req, res) => {
  const { nombre, fecha_inicio, fecha_fin, modalidad, duracion_partido, admin_id } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO torneos (nombre, fecha_inicio, fecha_fin, modalidad, duracion_partido, admin_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, fecha_inicio, fecha_fin, modalidad, duracion_partido, admin_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTAS DE EQUIPOS
// ============================================

app.get('/equipos', async (req, res) => {
  try {
    const { torneo_id } = req.query;
    let query = 'SELECT * FROM team';
    let params = [];
    
    if (torneo_id) {
      query += ' WHERE torneo_id = $1';
      params = [torneo_id];
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/equipos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM team WHERE id_team = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/equipos', async (req, res) => {
  const { nombreEquipo, logoEquipo, nombreCapitan, emailCapitan, telefonoCapitan, torneoId } = req.body;
  
  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    
    // 1. Verificar si el email ya existe
    const usuarioExistente = await client.query(
      'SELECT * FROM users WHERE correo = $1',
      [emailCapitan]
    );

    let capitanId;
    if (usuarioExistente.rows.length > 0) {
      capitanId = usuarioExistente.rows[0].id_user;
    } else {
      // Crear nuevo usuario (capitán) - role_id 3 para jugador
      const nuevoUsuario = await client.query(
        'INSERT INTO users (user_name, correo, role_id) VALUES ($1, $2, 3) RETURNING id_user',
        [nombreCapitan, emailCapitan]
      );
      capitanId = nuevoUsuario.rows[0].id_user;
    }

    // 2. Generar código único
    const codigoInvitacion = 'TEAM-' + Math.random().toString(36).substr(2, 9).toUpperCase();

    // 3. Crear el equipo
    const nuevoEquipo = await client.query(
      `INSERT INTO team 
       (nombre_team, url_logo, torneo_id, capitan_user_id, codigo_invitacion, estado_cupos, telefono_capitan) 
       VALUES ($1, $2, $3, $4, $5, $6, $7) 
       RETURNING *`,
      [nombreEquipo, logoEquipo || 'default-logo.png', torneoId, capitanId, codigoInvitacion, '1/11', telefonoCapitan]
    );

    // 4. Agregar capitán a plantilla
    await client.query(
      'INSERT INTO plantilla (jugador_id, team_id, es_capitan) VALUES ($1, $2, true)',
      [capitanId, nuevoEquipo.rows[0].id_team]
    );

    await client.query('COMMIT');
    
    res.json({
      success: true,
      equipo: nuevoEquipo.rows[0],
      codigoInvitacion: codigoInvitacion
    });
  } catch (err) {
    await client.query('ROLLBACK');
    console.error('Error:', err);
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

app.get('/equipos/codigo/:codigo', async (req, res) => {
  try {
    const { codigo } = req.params;
    const result = await pool.query(
      'SELECT * FROM team WHERE codigo_invitacion = $1',
      [codigo]
    );
    
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Equipo no encontrado' });
    }
    
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTAS DE JUGADORES
// ============================================

app.get('/jugadores', async (req, res) => {
  try {
    const { equipo_id } = req.query;
    let query = `
      SELECT j.*, u.user_name, u.correo, p.es_capitan, p.team_id
      FROM jugadores j
      JOIN users u ON j.user_id = u.id_user
      LEFT JOIN plantilla p ON j.id_jugador = p.jugador_id
    `;
    let params = [];
    
    if (equipo_id) {
      query += ' WHERE p.team_id = $1';
      params = [equipo_id];
    }
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/jugadores', async (req, res) => {
  const { 
    nombreCompleto, cedula, fechaNacimiento, telefono, email,
    posicionPreferida, numeroCamiseta, pieHabil,
    tipoSangre, alergias, medicamentos, condicionesMedicas,
    contactoEmergencia, telefonoEmergencia, seguroMedico
  } = req.body;

  const client = await pool.connect();
  try {
    await client.query('BEGIN');

    // Crear/obtener usuario
    let userId;
    const usuarioExistente = await client.query(
      'SELECT id_user FROM users WHERE correo = $1',
      [email]
    );

    if (usuarioExistente.rows.length > 0) {
      userId = usuarioExistente.rows[0].id_user;
    } else {
      const nuevoUsuario = await client.query(
        'INSERT INTO users (user_name, correo, role_id) VALUES ($1, $2, 3) RETURNING id_user',
        [nombreCompleto, email]
      );
      userId = nuevoUsuario.rows[0].id_user;
    }

    // Crear jugador
    const nuevoJugador = await client.query(
      `INSERT INTO jugadores 
       (user_id, cedula, fecha_nacimiento, telefono, posicion_preferida, numero_camiseta, 
        pie_habil, tipo_sangre, alergias, medicamentos, condiciones_medicas,
        contacto_emergencia, telefono_emergencia, seguro_medico)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
       RETURNING *`,
      [userId, cedula, fechaNacimiento, telefono, posicionPreferida, numeroCamiseta,
       pieHabil, tipoSangre, alergias, medicamentos, condicionesMedicas,
       contactoEmergencia, telefonoEmergencia, seguroMedico]
    );

    await client.query('COMMIT');
    res.json({ success: true, jugador: nuevoJugador.rows[0] });
  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ success: false, error: err.message });
  } finally {
    client.release();
  }
});

// ============================================
// RUTAS DE PARTIDOS
// ============================================

app.get('/partidos', async (req, res) => {
  try {
    const { torneo_id } = req.query;
    let query = `
      SELECT p.*,
             t1.nombre_team as equipo_local_nombre,
             t2.nombre_team as equipo_visitante_nombre,
             c.nombre_sede as cancha_nombre,
             u.user_name as arbitro_nombre
      FROM partidos p
      LEFT JOIN team t1 ON p.equipo_local_id = t1.id_team
      LEFT JOIN team t2 ON p.equipo_visitante_id = t2.id_team
      LEFT JOIN canchas c ON p.cancha_id = c.id_cancha
      LEFT JOIN users u ON p.arbitro_id = u.id_user
    `;
    let params = [];
    
    if (torneo_id) {
      query += ' WHERE p.torneo_id = $1';
      params = [torneo_id];
    }
    
    query += ' ORDER BY p.fecha_hora DESC';
    
    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/partidos', async (req, res) => {
  const { torneo_id, equipo_local_id, equipo_visitante_id, fecha_hora, cancha_id, arbitro_id } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO partidos 
       (torneo_id, equipo_local_id, equipo_visitante_id, fecha_hora, cancha_id, arbitro_id, estado)
       VALUES ($1, $2, $3, $4, $5, $6, 'PENDIENTE')
       RETURNING *`,
      [torneo_id, equipo_local_id, equipo_visitante_id, fecha_hora, cancha_id, arbitro_id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/partidos/:id', async (req, res) => {
  const { id } = req.params;
  const { marcador_local, marcador_visitante, minuto_actual, estado } = req.body;
  try {
    const result = await pool.query(
      'UPDATE partidos SET marcador_local = $1, marcador_visitante = $2, minuto_actual = $3, estado = $4 WHERE id_partido = $5 RETURNING *',
      [marcador_local, marcador_visitante, minuto_actual, estado, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTAS DE GOLES
// ============================================

app.post('/eventos-gol', async (req, res) => {
  const { partido_id, jugador_id, equipo_id, minuto_juego, tipo_gol } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO eventos_gol (partido_id, jugador_id, equipo_id, minuto_juego, tipo_gol, estado) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [partido_id, jugador_id, equipo_id, minuto_juego, tipo_gol || 'normal', 'CONFIRMADO']
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/eventos-gol/:partido_id', async (req, res) => {
  try {
    const { partido_id } = req.params;
    const result = await pool.query(
      `SELECT eg.*, j.user_id, u.user_name as jugador_nombre, t.nombre_team as equipo_nombre
       FROM eventos_gol eg
       LEFT JOIN jugadores j ON eg.jugador_id = j.id_jugador
       LEFT JOIN users u ON j.user_id = u.id_user
       LEFT JOIN team t ON eg.equipo_id = t.id_team
       WHERE eg.partido_id = $1
       ORDER BY eg.minuto_juego ASC`,
      [partido_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTAS DE SANCIONES/TARJETAS
// ============================================

app.post('/sanciones', async (req, res) => {
  const { partido_id, jugador_id, tipo_sancion, motivo, descripcion, multa, minuto } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO sanciones 
       (partido_id, jugador_id, tipo_sancion, motivo, descripcion, multa, minuto)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       RETURNING *`,
      [partido_id, jugador_id, tipo_sancion, motivo, descripcion, multa || 0, minuto]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/sanciones/:partido_id', async (req, res) => {
  try {
    const { partido_id } = req.params;
    const result = await pool.query(
      `SELECT s.*, j.user_id, u.user_name as jugador_nombre, j.numero_camiseta
       FROM sanciones s
       LEFT JOIN jugadores j ON s.jugador_id = j.id_jugador
       LEFT JOIN users u ON j.user_id = u.id_user
       WHERE s.partido_id = $1
       ORDER BY s.minuto ASC`,
      [partido_id]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTAS DE USUARIOS/LOGIN
// ============================================

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const result = await pool.query(
      `SELECT u.*, r.rol_name 
       FROM users u 
       LEFT JOIN roles r ON u.role_id = r.id_rol
       WHERE u.correo = $1`,
      [email]
    );
    
    if (result.rows.length === 0) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    
    // TODO: Agregar verificación de password hasheada
    res.json({ success: true, user: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTAS DE TABLA DE CLASIFICACIÓN
// ============================================

app.get('/clasificacion/:torneo_id', async (req, res) => {
  try {
    const { torneo_id } = req.params;
    const { grupo } = req.query;
    
    let query = `
      SELECT 
        t.id_team,
        t.nombre_team,
        t.url_logo,
        COUNT(DISTINCT p.id_partido) as pj,
        SUM(CASE 
          WHEN (p.equipo_local_id = t.id_team AND p.marcador_local > p.marcador_visitante) 
            OR (p.equipo_visitante_id = t.id_team AND p.marcador_visitante > p.marcador_local)
          THEN 1 ELSE 0 END) as pg,
        SUM(CASE 
          WHEN p.marcador_local = p.marcador_visitante THEN 1 ELSE 0 END) as pe,
        SUM(CASE 
          WHEN (p.equipo_local_id = t.id_team AND p.marcador_local < p.marcador_visitante)
            OR (p.equipo_visitante_id = t.id_team AND p.marcador_visitante < p.marcador_local)
          THEN 1 ELSE 0 END) as pp,
        SUM(CASE 
          WHEN p.equipo_local_id = t.id_team THEN p.marcador_local
          WHEN p.equipo_visitante_id = t.id_team THEN p.marcador_visitante
          ELSE 0 END) as gf,
        SUM(CASE 
          WHEN p.equipo_local_id = t.id_team THEN p.marcador_visitante
          WHEN p.equipo_visitante_id = t.id_team THEN p.marcador_local
          ELSE 0 END) as gc,
        (SUM(CASE 
          WHEN (p.equipo_local_id = t.id_team AND p.marcador_local > p.marcador_visitante)
            OR (p.equipo_visitante_id = t.id_team AND p.marcador_visitante > p.marcador_local)
          THEN 3
          WHEN p.marcador_local = p.marcador_visitante THEN 1
          ELSE 0 END)) as pts
      FROM team t
      LEFT JOIN partidos p ON (p.equipo_local_id = t.id_team OR p.equipo_visitante_id = t.id_team)
        AND p.estado = 'FINALIZADO'
      WHERE t.torneo_id = $1
    `;
    
    let params = [torneo_id];
    
    if (grupo) {
      query += ' AND t.grupo = $2';
      params.push(grupo);
    }
    
    query += ` 
      GROUP BY t.id_team, t.nombre_team, t.url_logo
      ORDER BY pts DESC, (gf - gc) DESC, gf DESC
    `;
    
    const result = await pool.query(query, params);
    
    // Agregar diferencia de goles y posición
    const equipos = result.rows.map((equipo, index) => ({
      ...equipo,
      pos: index + 1,
      dif: equipo.gf - equipo.gc
    }));
    
    res.json(equipos);
  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: err.message });
  }
});

// ============================================
// RUTA DE SALUD
// ============================================

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// ============================================
// INICIAR SERVIDOR
// ============================================

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  console.log(`📊 Base de datos: ${process.env.DB_NAME}`);
});