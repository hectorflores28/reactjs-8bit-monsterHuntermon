import { Howl } from 'howler';

export const SOUNDS = {
  COMBAT: {
    ATTACK: new Howl({
      src: ['/assets/sounds/combat/attack.mp3'],
      volume: 0.7
    }),
    HIT: new Howl({
      src: ['/assets/sounds/combat/hit.mp3'],
      volume: 0.6
    }),
    DEFEND: new Howl({
      src: ['/assets/sounds/combat/defend.mp3'],
      volume: 0.5
    }),
    CRITICAL: new Howl({
      src: ['/assets/sounds/combat/critical.mp3'],
      volume: 0.8
    }),
    VICTORY: new Howl({
      src: ['/assets/sounds/combat/victory.mp3'],
      volume: 0.7
    }),
    DEFEAT: new Howl({
      src: ['/assets/sounds/combat/defeat.mp3'],
      volume: 0.7
    })
  },
  UI: {
    CLICK: new Howl({
      src: ['/assets/sounds/ui/click.mp3'],
      volume: 0.4
    }),
    HOVER: new Howl({
      src: ['/assets/sounds/ui/hover.mp3'],
      volume: 0.3
    }),
    SELECT: new Howl({
      src: ['/assets/sounds/ui/select.mp3'],
      volume: 0.5
    })
  },
  AMBIENT: {
    FOREST: new Howl({
      src: ['/assets/sounds/ambient/forest.mp3'],
      volume: 0.3,
      loop: true
    }),
    CAVE: new Howl({
      src: ['/assets/sounds/ambient/cave.mp3'],
      volume: 0.4,
      loop: true
    })
  }
};

export const playSound = (sound) => {
  if (sound && typeof sound.play === 'function') {
    try {
      sound.play();
    } catch (error) {
      console.warn('Error al reproducir el sonido:', error);
    }
  }
};

export const stopSound = (sound) => {
  if (sound && typeof sound.stop === 'function') {
    try {
      sound.stop();
    } catch (error) {
      console.warn('Error al detener el sonido:', error);
    }
  }
};

export const setVolume = (sound, volume) => {
  if (sound && typeof sound.volume === 'function') {
    try {
      sound.volume(volume);
    } catch (error) {
      console.warn('Error al ajustar el volumen:', error);
    }
  }
}; 