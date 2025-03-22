const User = require('../models/User');
const Monster = require('../models/Monster');
const Weapon = require('../models/Weapon');

// Obtener lista de monstruos disponibles
exports.getMonsters = async (req, res) => {
    try {
        const monsters = await Monster.find({ level: { $lte: req.user.character.level } });
        res.json(monsters);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener monstruos', error: error.message });
    }
};

// Iniciar una cacería
exports.startHunt = async (req, res) => {
    try {
        const { monsterId } = req.body;
        const monster = await Monster.findById(monsterId);
        
        if (!monster) {
            return res.status(404).json({ message: 'Monstruo no encontrado' });
        }

        // Verificar nivel del jugador
        if (monster.level > req.user.character.level) {
            return res.status(400).json({ message: 'Nivel insuficiente para cazar este monstruo' });
        }

        // Inicializar estado de la cacería
        const huntState = {
            monster: {
                ...monster.toObject(),
                health: monster.health.base
            },
            player: {
                health: req.user.character.stats.health,
                stamina: 100
            },
            startTime: new Date()
        };

        res.json(huntState);
    } catch (error) {
        res.status(500).json({ message: 'Error al iniciar cacería', error: error.message });
    }
};

// Realizar un ataque
exports.performAttack = async (req, res) => {
    try {
        const { attackType, combo } = req.body;
        const user = await User.findById(req.user.id);
        const weapon = await Weapon.findOne({ type: user.character.weapon });

        if (!weapon) {
            return res.status(404).json({ message: 'Arma no encontrada' });
        }

        // Calcular daño del ataque
        let damage = 0;
        let staminaCost = 0;

        if (attackType === 'light') {
            damage = weapon.attacks.light.damage;
            staminaCost = weapon.attacks.light.stamina;
        } else if (attackType === 'heavy') {
            damage = weapon.attacks.heavy.damage;
            staminaCost = weapon.attacks.heavy.stamina;
        }

        // Verificar si hay suficiente stamina
        if (staminaCost > user.character.stats.stamina) {
            return res.status(400).json({ message: 'Stamina insuficiente' });
        }

        // Aplicar daño y reducir stamina
        const attackResult = {
            damage,
            staminaCost,
            timestamp: new Date()
        };

        res.json(attackResult);
    } catch (error) {
        res.status(500).json({ message: 'Error al realizar ataque', error: error.message });
    }
};

// Obtener recompensas de la cacería
exports.getHuntRewards = async (req, res) => {
    try {
        const { monsterId } = req.params;
        const monster = await Monster.findById(monsterId);

        if (!monster) {
            return res.status(404).json({ message: 'Monstruo no encontrado' });
        }

        // Calcular recompensas basadas en el monstruo
        const rewards = {
            experience: monster.level * 100,
            items: monster.drops.map(drop => ({
                item: drop.item,
                quantity: Math.floor(Math.random() * (drop.quantity.max - drop.quantity.min + 1)) + drop.quantity.min,
                chance: drop.chance
            }))
        };

        res.json(rewards);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener recompensas', error: error.message });
    }
};

// Subir de nivel
exports.levelUp = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const currentLevel = user.character.level;
        const experienceNeeded = currentLevel * 1000;

        if (user.character.experience >= experienceNeeded) {
            // Subir de nivel
            user.character.level += 1;
            user.character.experience -= experienceNeeded;

            // Mejorar estadísticas
            user.character.stats.health += 10;
            user.character.stats.attack += 2;
            user.character.stats.defense += 1;
            user.character.stats.speed += 1;

            await user.save();

            res.json({
                message: '¡Subiste de nivel!',
                newLevel: user.character.level,
                stats: user.character.stats
            });
        } else {
            res.status(400).json({ message: 'No hay suficiente experiencia para subir de nivel' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error al subir de nivel', error: error.message });
    }
}; 