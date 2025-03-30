-- Crear tabla de armas
CREATE TABLE IF NOT EXISTS armas (
    id INT(11) PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100) NOT NULL,
    tipo ENUM('espada', 'hacha', 'lanza', 'arco', 'martillo', 'escudo', 'dual', 'ballesta') NOT NULL,
    nivel INT(11) NOT NULL,
    daño_base INT(11) NOT NULL,
    elemento VARCHAR(50),
    descripcion TEXT,
    precio INT(11) NOT NULL,
    fecha_registro TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insertar armas de ejemplo
INSERT INTO armas (nombre, tipo, nivel, daño_base, elemento, descripcion, precio) VALUES
('Espada Hierro', 'espada', 1, 100, NULL, 'Espada básica de hierro', 500),
('Hacha de Bronce', 'hacha', 1, 120, NULL, 'Hacha pesada de bronce', 600),
('Lanza de Cobre', 'lanza', 1, 90, NULL, 'Lanza de cobre con buen alcance', 450),
('Arco Corto', 'arco', 1, 80, NULL, 'Arco básico para principiantes', 400),
('Martillo de Hierro', 'martillo', 1, 130, NULL, 'Martillo pesado de hierro', 650),
('Escudo de Madera', 'escudo', 1, 50, NULL, 'Escudo básico de madera', 250),
('Espadas Duales', 'dual', 1, 70, NULL, 'Par de espadas cortas', 350),
('Ballesta Simple', 'ballesta', 1, 85, NULL, 'Ballesta básica', 425);