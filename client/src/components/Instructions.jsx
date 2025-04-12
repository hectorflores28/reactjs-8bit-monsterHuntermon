import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const InstructionsContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background: #000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: 'Press Start 2P', cursive;
  color: white;
`;

const Title = styled.h1`
  color: #ffd700;
  text-align: center;
  margin-bottom: 2rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
`;

const InstructionsBox = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid #ffd700;
  width: 80%;
  max-width: 800px;
  overflow-y: auto;
  max-height: 70vh;
`;

const Section = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  color: #ffd700;
  font-size: 1.2rem;
  margin-bottom: 1rem;
`;

const InstructionText = styled.p`
  font-size: 0.8rem;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const Button = styled(motion.button)`
  background: #ffd700;
  color: black;
  border: none;
  padding: 0.5rem 1rem;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8rem;
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 5px;

  &:hover {
    background: #ffed4a;
  }
`;

const Instructions = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/menu');
  };

  return (
    <InstructionsContainer>
      <Title>INSTRUCCIONES</Title>
      <InstructionsBox>
        <Section>
          <SectionTitle>CONTROLES BÁSICOS</SectionTitle>
          <InstructionText>
            - Usa las teclas de dirección para moverte<br />
            - Presiona ESPACIO para interactuar<br />
            - Usa ESC para abrir el menú
          </InstructionText>
        </Section>

        <Section>
          <SectionTitle>COMBATE</SectionTitle>
          <InstructionText>
            - Botón ATAQUE: Realiza un ataque básico (consume stamina)<br />
            - Botón DEFENSA: Bloquea ataques enemigos (consume stamina)<br />
            - Observa tu barra de vida y stamina<br />
            - Los monstruos tienen patrones de ataque únicos
          </InstructionText>
        </Section>

        <Section>
          <SectionTitle>PROGRESIÓN</SectionTitle>
          <InstructionText>
            - Gana experiencia derrotando monstruos<br />
            - Sube de nivel para mejorar tus estadísticas<br />
            - Recolecta materiales para craftear equipo<br />
            - Completa misiones para obtener recompensas
          </InstructionText>
        </Section>

        <Section>
          <SectionTitle>INVENTARIO</SectionTitle>
          <InstructionText>
            - Gestiona tus objetos y equipamiento<br />
            - Usa pociones para recuperar vida<br />
            - Equipa diferentes armas y armaduras<br />
            - Recolecta materiales para crafteo
          </InstructionText>
        </Section>

        <Section>
          <SectionTitle>CONSEJOS</SectionTitle>
          <InstructionText>
            - Observa el clima, afecta al combate<br />
            - Mantén tu stamina para emergencias<br />
            - Aprende los patrones de los monstruos<br />
            - Completa misiones diarias para progresar más rápido
          </InstructionText>
        </Section>

        <Button
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          VOLVER
        </Button>
      </InstructionsBox>
    </InstructionsContainer>
  );
};

export default Instructions; 