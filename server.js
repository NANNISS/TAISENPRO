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


  // Agregar después de las rutas existentes en server.js

  // REGISTRO DE EQUIPO
  app.post('/equipos', async (req, res) => {
    const { nombreEquipo, logoEquipo, nombreCapitan, emailCapitan, telefonoCapitan, torneoId } = req.body;
    
    try {
      // 1. Verificar si el email del capitán ya existe
      const usuarioExistente = await pool.query(
        'SELECT * FROM users WHERE correo = $1',
        [emailCapitan]
      );

      let capitanId;

      if (usuarioExistente.rows.length > 0) {
        // Usuario ya existe
        capitanId = usuarioExistente.rows[0].id_user;
      } else {
        // Crear nuevo usuario (capitán)
        const nuevoUsuario = await pool.query(
          'INSERT INTO users (user_name, correo, role_id) VALUES ($1, $2, 3) RETURNING id_user',
          [nombreCapitan, emailCapitan]
        );
        capitanId = nuevoUsuario.rows[0].id_user;
      }

      // 2. Generar código único de invitación
      const codigoInvitacion = 'TEAM-' + Math.random().toString(36).substr(2, 9).toUpperCase();

      // 3. Crear el equipo
      const nuevoEquipo = await pool.query(
        `INSERT INTO team 
        (nombre_team, url_logo, torneo_id, capitan_user_id, codigo_invitacion, estado_cupos, telefono_capitan) 
        VALUES ($1, $2, $3, $4, $5, $6, $7) 
        RETURNING *`,
        [nombreEquipo, logoEquipo || 'default-logo.png', torneoId, capitanId, codigoInvitacion, '0/11', telefonoCapitan]
      );

      // 4. Agregar al capitán a la plantilla
      await pool.query(
        'INSERT INTO plantilla (jugador_id, team_id, es_capitan) VALUES ($1, $2, true)',
        [capitanId, nuevoEquipo.rows[0].id_team]
      );

      res.json({
        success: true,
        equipo: nuevoEquipo.rows[0],
        codigoInvitacion: codigoInvitacion
      });

    } catch (err) {
      console.error('Error al registrar equipo:', err);
      res.status(500).json({ 
        success: false,
        error: err.message 
      });
    }
  });

  // Obtener equipo por código de invitación
  app.get('/equipos/codigo/:codigo', async (req, res) => {
    const { codigo } = req.params;
    try {
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