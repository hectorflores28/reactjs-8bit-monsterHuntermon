-- Eliminar la tabla si existe
DROP TABLE IF EXISTS monstruos;

-- Crear tabla de monstruos con la estructura correcta
CREATE TABLE IF NOT EXISTS monstruos (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('dragón', 'bestia', 'insecto', 'elemental') NOT NULL,
    nivel INT(11) NOT NULL,
    vida_maxima INT(11) NOT NULL,
    descripcion TEXT,
    recompensa_base INT(11) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar monstruos de ejemplo
INSERT INTO monstruos (nombre, tipo, nivel, vida_maxima, descripcion, recompensa_base) VALUES
('Rathalos', 'dragón', 5, 1000, 'Rey del cielo, dragón de fuego', 5000),
('Diablos', 'bestia', 4, 800, 'Monstruo subterráneo con cuernos', 4000),
('Kirin', 'dragón', 3, 800, 'Un dragón anciano que controla el rayo', 800),
('Nergigante', 'dragón', 4, 1500, 'Un dragón anciano que se regenera rápidamente', 1000),
('Zinogre', 'bestia', 5, 1300, 'Un wyvern que acumula energía eléctrica', 900);

-- Primero, actualizar los monstruos existentes
UPDATE monstruos 
SET 
    tipo = 'dragón',
    nivel = 5,
    vida_maxima = 1000,
    descripcion = 'Rey del cielo, dragón de fuego',
    recompensa_base = 5000
WHERE nombre = 'Rathalos';

UPDATE monstruos 
SET 
    tipo = 'bestia',
    nivel = 4,
    vida_maxima = 800,
    descripcion = 'Monstruo subterráneo con cuernos',
    recompensa_base = 4000
WHERE nombre = 'Diablos';

SELECT id, nombre, tipo, nivel, vida_maxima, descripcion, recompensa_base, fecha_registro 
FROM monstruos 
ORDER BY id; 