const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Conexión a la BD
const pool = new Pool({
  user: 'postgres',
  password: '76812511', // CAMBIA ESTO
  host: 'localhost',
  port: 5433, // TU PUERTO
  database: 'taikenpro'
});

// RUTAS
app.get('/torneos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM torneos');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/partidos', async (req, res) => {
  try {
    const result = await pool.query(`
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
      ORDER BY p.fecha_hora DESC
    `);
    res.json(result.rows);
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

app.get('/equipos', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM team');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Agregar gol
app.post('/eventos-gol', async (req, res) => {
  const { partido_id, equipo_id, minuto_juego, tipo_gol, estado } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO eventos_gol (partido_id, equipo_id, minuto_juego, tipo_gol, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [partido_id, equipo_id, minuto_juego, tipo_gol, estado]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Actualizar marcador
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

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`🚀 Servidor en http://localhost:${PORT}`);
});