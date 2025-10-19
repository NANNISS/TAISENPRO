create database Taikenpro 
-- TABLA ROLES
CREATE TABLE ROLES (
    id_rol SERIAL PRIMARY KEY,
    nombre_rol VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO ROLES (nombre_rol) VALUES ('ADMIN'), ('PLAYER'), ('ARBITRO'), ('VISIT');

-- TABLA NIVELES
CREATE TABLE NIVELES (
    id_nvl SERIAL PRIMARY KEY,
    nombre_nvl VARCHAR(20) UNIQUE NOT NULL
);
INSERT INTO NIVELES (nombre_nvl) VALUES ('INICIACIÓN'), ('INTERMEDIO'), ('AVANZADO'), ('PROFESIONAL');

-- TABLA USERS (Login principal para todos los tipos de usuario)
CREATE TABLE USERS (
    id_user SERIAL PRIMARY KEY,
    user_name VARCHAR(100) NOT NULL,
    -- NOTA: Almacenar siempre contraseñas con HASHING (ej. bcrypt) en el Backend.
    user_passw VARCHAR(100) NOT NULL, 
    correo VARCHAR(150) UNIQUE NOT NULL,
    id_rol INTEGER NOT NULL REFERENCES ROLES(id_rol)
);

-- TABLA CANCHAS (Gestión de logística)
CREATE TABLE CANCHAS (
    id_cancha SERIAL PRIMARY KEY,
    nombre_sede VARCHAR(100) NOT NULL,
    numero_identificador VARCHAR(100) NOT NULL,
    ubicacion VARCHAR(255),
    tipo_superficie VARCHAR(50)
);

-- TABLA TORNEOS (Ajustada con las reglas de juego)
CREATE TABLE TORNEOS (
    id_torneo SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    fecha_inicio DATE NOT NULL,
    fecha_fin DATE NOT NULL,
    monto_inscripcion INTEGER NOT NULL,
    
    -- CONFIGURACIÓN DEL JUEGO
    modalidad VARCHAR(2) NOT NULL,         -- F5, F7, F11
    duracion_partido_min INTEGER NOT NULL, -- Total de minutos por partido
    jugadores_min INTEGER NOT NULL,        -- Mínimo de jugadores para "COMPLETO"
    reglas_desempate VARCHAR(50)           -- Penales, Tiempo_Extra, etc.
);

-- TABLA JUGADORES (Ajustada con perfil de seguridad y juego)
CREATE TABLE JUGADORES (
    id_jugador SERIAL PRIMARY KEY,
    user_id INTEGER UNIQUE NOT NULL REFERENCES USERS(id_user),
    nombre VARCHAR(50) NOT NULL,
    apellido VARCHAR(50) NOT NULL,
    edad INTEGER NOT NULL,
    CI VARCHAR(20) UNIQUE NOT NULL,
    URL_FOTO VARCHAR(500),
    id_nvl INTEGER REFERENCES NIVELES(id_nvl),
    
    -- DATOS DE PERFIL Y SEGURIDAD (Módulo Jugador)
    nro_camiseta INTEGER,
    posicion VARCHAR(50),
    tipo_sangre VARCHAR(5),
    alergias TEXT
);

-- TABLA TEAM (Ajustada para gestión de cupos)
CREATE TABLE TEAM (
    id_team SERIAL PRIMARY KEY,
    nombre_team VARCHAR(100) UNIQUE NOT NULL,
    url_logo VARCHAR(500),
    torneo_id INTEGER NOT NULL REFERENCES TORNEOS(id_torneo),
    
    -- GESTIÓN DE EQUIPOS
    capitan_user_id INTEGER REFERENCES USERS(id_user),
    estado_cupos VARCHAR(20) DEFAULT 'INCOMPLETO', -- Para el Dashboard de Equipos
    modalidad VARCHAR(2) 
);

-- TABLA PLANTILLA (Relación Jugador <-> Equipo)
-- Un jugador pertenece a un equipo.
CREATE TABLE PLANTILLA (
    jugador_id INTEGER REFERENCES JUGADORES(id_jugador),
    team_id INTEGER REFERENCES TEAM(id_team),
    es_capitan BOOLEAN DEFAULT FALSE,
    fecha_ingreso DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (jugador_id, team_id)
);

-- TABLA INSCRIPCIONES (Registro de pago inicial)
CREATE TABLE INSCRIPCIONES (
    id_inscripcion SERIAL PRIMARY KEY,
    jugador_id INTEGER NOT NULL REFERENCES JUGADORES(id_jugador),
    torneo_id INTEGER NOT NULL REFERENCES TORNEOS(id_torneo),
    Team_id INTEGER REFERENCES TEAM(id_team),
    monto_pagado INTEGER NOT NULL,
    fecha_pago TIMESTAMP DEFAULT NOW(),
    RUC VARCHAR(20),
    CONSTRAINT unique_incripcion UNIQUE (jugador_id, torneo_id)
);

-- TABLA PARTIDOS (El corazón de la logística y el seguimiento en vivo)
CREATE TABLE PARTIDOS (
    id_partido SERIAL PRIMARY KEY,
    torneo_id INTEGER REFERENCES TORNEOS(id_torneo) NOT NULL,
    cancha_id INTEGER REFERENCES CANCHAS(id_cancha) NOT NULL,
    arbitro_id INTEGER REFERENCES USERS(id_user), 
    
    equipo_local_id INTEGER REFERENCES TEAM(id_team) NOT NULL,
    equipo_visitante_id INTEGER REFERENCES TEAM(id_team) NOT NULL,
    
    fecha_hora TIMESTAMP NOT NULL,
    
    -- DATOS EN VIVO/RESULTADO
    marcador_local INTEGER DEFAULT 0,
    marcador_visitante INTEGER DEFAULT 0,
    
    -- CRONÓMETRO: Almacena el tiempo acumulado
    minuto_actual INTEGER DEFAULT 0,
    -- CRONÓMETRO: Marca de tiempo para el cálculo en vivo (vital para el cronómetro)
    timestamp_inicio_tiempo TIMESTAMP, 
    
    estado VARCHAR(20) DEFAULT 'PENDIENTE', -- PENDIENTE, EN_JUEGO, DESCANSO, FINALIZADO
    faltas_registradas INTEGER DEFAULT 0
);

-- TABLA EVENTOS_GOL (NUEVA: Para un contador de goles granular y con anulaciones)
CREATE TABLE EVENTOS_GOL (
    id_gol SERIAL PRIMARY KEY,
    partido_id INTEGER REFERENCES PARTIDOS(id_partido) NOT NULL,
    equipo_id INTEGER REFERENCES TEAM(id_team) NOT NULL,
    jugador_id INTEGER REFERENCES JUGADORES(id_jugador),
    minuto_juego INTEGER NOT NULL,
    
    tipo_gol VARCHAR(20) NOT NULL, -- JUEGO_NORMAL, PENAL, AUTOGOL
    estado VARCHAR(20) NOT NULL,    -- VALIDO, ANULADO
    motivo_anulacion TEXT,          -- Si está ANULADO, por qué
    fecha_registro TIMESTAMP DEFAULT NOW()
);

-- TABLA SANCIONES (Para el módulo del árbitro)
CREATE TABLE SANCIONES (
    id_sancion SERIAL PRIMARY KEY,
    partido_id INTEGER REFERENCES PARTIDOS(id_partido) NOT NULL,
    arbitro_user_id INTEGER REFERENCES USERS(id_user) NOT NULL,
    
    -- INFRACTOR
    infractor_jugador_id INTEGER REFERENCES JUGADORES(id_jugador),
    infractor_equipo_id INTEGER REFERENCES TEAM(id_team),
    
    motivo VARCHAR(100) NOT NULL,
    monto_multa INTEGER DEFAULT 0,
    detalles_incidente TEXT,
    fecha_registro TIMESTAMP DEFAULT NOW()
	
);
SELECT * FROM USERS WHERE user_name = 'admin';
