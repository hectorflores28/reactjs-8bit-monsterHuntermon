-- Creación de la tabla de armas
CREATE TABLE weapons (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    damage INT NOT NULL,
    speed INT NOT NULL,
    range INT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Inserción de las 14 armas
INSERT INTO weapons (name, damage, speed, range, description) VALUES
('ESPADA GRANDE', 100, 50, 1, 'Un arma poderosa pero lenta'),
('ESPADA LARGA', 80, 70, 2, 'Versátil y equilibrada'),
('ESPADA Y ESCUDO', 70, 80, 1, 'Equilibrio entre ataque y defensa'),
('MARTILLO', 120, 40, 1, 'Daño masivo pero muy lento'),
('HACHA DE GUERRA', 110, 60, 2, 'Poderosa y versátil'),
('LANZA', 80, 60, 2, 'Alcance medio con buen daño'),
('LANZA DE PISTÓN', 90, 50, 2, 'Combina ataque y explosiones'),
('ESPADA DOBLE', 60, 90, 1, 'Ataques rápidos y furiosos'),
('CUERNO DE CAZA', 70, 70, 1, 'Apoya al equipo con melodías'),
('ARCO', 60, 90, 3, 'Ataques rápidos a distancia'),
('BALLESTA LIGERA', 50, 100, 3, 'Rápida y versátil'),
('BALLESTA PESADA', 90, 70, 3, 'Potente arma de proyectiles'),
('KATANA', 85, 75, 2, 'Elegante y letal'),
('MARTILLO DE PISTÓN', 105, 55, 2, 'Transformable y poderosa');

-- Creación de índices para búsquedas rápidas
CREATE INDEX idx_weapon_name ON weapons(name);
CREATE INDEX idx_weapon_damage ON weapons(damage);
CREATE INDEX idx_weapon_speed ON weapons(speed);
CREATE INDEX idx_weapon_range ON weapons(range); 