import React from 'react';
import styled from 'styled-components';

const InstructionsContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const InstructionsBox = styled.div`
  background-color: #1a1a1a;
  border: 4px solid #4a4a4a;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 600px;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
  max-height: 80vh;
  overflow-y: auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #ffd700;
  text-shadow: 2px 2px #000;
`;

const Section = styled.div`
  margin-bottom: 20px;
`;

const Subtitle = styled.h3`
  color: #ffd700;
  margin-bottom: 15px;
  font-size: 0.9em;
`;

const Text = styled.p`
  font-size: 0.7em;
  line-height: 1.5;
  margin-bottom: 15px;
`;

const List = styled.ul`
  list-style-type: none;
  padding-left: 0;
  font-size: 0.7em;
  line-height: 1.5;
`;

const ListItem = styled.li`
  margin-bottom: 10px;
  padding-left: 20px;
  position: relative;

  &:before {
    content: "•";
    color: #ffd700;
    position: absolute;
    left: 0;
  }
`;

const Button = styled.button`
  background-color: #4a4a4a;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
  transition: all 0.3s ease;
  display: block;
  margin: 20px auto 0;

  &:hover {
    background-color: #ffd700;
    color: #000;
  }
`;

const Instructions = ({ onClose }) => {
  return (
    <InstructionsContainer>
      <InstructionsBox>
        <Title>INSTRUCCIONES</Title>

        <Section>
          <Subtitle>CONTROLES BÁSICOS</Subtitle>
          <List>
            <ListItem>Usa las flechas del teclado para navegar por el menú</ListItem>
            <ListItem>Presiona ENTER para seleccionar opciones</ListItem>
            <ListItem>Usa ESPACIO para atacar en combate</ListItem>
            <ListItem>Usa SHIFT para defender</ListItem>
          </List>
        </Section>

        <Section>
          <Subtitle>SISTEMA DE COMBATE</Subtitle>
          <Text>
            El combate se basa en un sistema de turnos donde debes gestionar tu estamina
            y vida mientras intentas derrotar al monstruo.
          </Text>
          <List>
            <ListItem>Atacar consume estamina pero inflige daño</ListItem>
            <ListItem>Defender reduce el daño recibido y recupera estamina</ListItem>
            <ListItem>La estamina se recupera gradualmente cada turno</ListItem>
          </List>
        </Section>

        <Section>
          <Subtitle>ESTADÍSTICAS</Subtitle>
          <List>
            <ListItem>Vida: Determina cuánto daño puedes recibir</ListItem>
            <ListItem>Estamina: Necesaria para realizar acciones</ListItem>
            <ListItem>Daño: Afecta el daño que infliges</ListItem>
            <ListItem>Defensa: Reduce el daño recibido</ListItem>
          </List>
        </Section>

        <Section>
          <Subtitle>CONSEJOS</Subtitle>
          <List>
            <ListItem>Mantén un ojo en tu estamina durante el combate</ListItem>
            <ListItem>Usa la defensa estratégicamente para recuperar estamina</ListItem>
            <ListItem>Los diferentes monstruos tienen diferentes patrones de ataque</ListItem>
            <ListItem>El clima puede afectar tu rendimiento en combate</ListItem>
          </List>
        </Section>

        <Button onClick={onClose}>VOLVER</Button>
      </InstructionsBox>
    </InstructionsContainer>
  );
};

export default Instructions; 