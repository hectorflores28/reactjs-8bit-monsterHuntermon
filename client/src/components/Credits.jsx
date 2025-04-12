import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const CreditsContainer = styled.div`
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

const CreditsBox = styled.div`
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  border: 2px solid #ffd700;
  width: 80%;
  max-width: 600px;
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

const CreditText = styled.p`
  font-size: 0.8rem;
  line-height: 1.6;
  margin-bottom: 0.5rem;
  text-align: center;
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

const Credits = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/menu');
  };

  return (
    <CreditsContainer>
      <Title>CRÉDITOS</Title>
      <CreditsBox>
        <Section>
          <SectionTitle>DESARROLLO</SectionTitle>
          <CreditText>Héctor Flores</CreditText>
          <CreditText>Desarrollador Principal</CreditText>
        </Section>

        <Section>
          <SectionTitle>DISEÑO</SectionTitle>
          <CreditText>Inspirado en Monster Hunter</CreditText>
          <CreditText>Diseño de Interfaz: Héctor Flores</CreditText>
          <CreditText>Diseño de Personajes: Héctor Flores</CreditText>
        </Section>

        <Section>
          <SectionTitle>TECNOLOGÍAS</SectionTitle>
          <CreditText>React</CreditText>
          <CreditText>Styled Components</CreditText>
          <CreditText>Framer Motion</CreditText>
          <CreditText>LocalStorage</CreditText>
        </Section>

        <Section>
          <SectionTitle>AGRADECIMIENTOS</SectionTitle>
          <CreditText>A todos los jugadores</CreditText>
          <CreditText>A la comunidad de desarrollo</CreditText>
          <CreditText>A los fans de Monster Hunter</CreditText>
        </Section>

        <Button
          onClick={handleBack}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          VOLVER
        </Button>
      </CreditsBox>
    </CreditsContainer>
  );
};

export default Credits; 