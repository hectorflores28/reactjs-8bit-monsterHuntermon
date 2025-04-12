import React from 'react';
import styled from 'styled-components';

const CreditsContainer = styled.div`
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

const CreditsBox = styled.div`
  background-color: #1a1a1a;
  border: 4px solid #4a4a4a;
  border-radius: 8px;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  color: #fff;
  font-family: 'Press Start 2P', cursive;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  color: #ffd700;
  text-shadow: 2px 2px #000;
`;

const CreditSection = styled.div`
  margin-bottom: 20px;
`;

const Role = styled.h3`
  color: #ffd700;
  margin-bottom: 10px;
  font-size: 0.9em;
`;

const Name = styled.p`
  font-size: 0.7em;
  margin-bottom: 5px;
`;

const SpecialThanks = styled.div`
  margin-top: 30px;
  text-align: center;
`;

const ThanksTitle = styled.h3`
  color: #ffd700;
  margin-bottom: 15px;
  font-size: 0.9em;
`;

const ThanksText = styled.p`
  font-size: 0.7em;
  line-height: 1.5;
`;

const Button = styled.button`
  background-color: #4a4a4a;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin-top: 30px;
  cursor: pointer;
  font-family: 'Press Start 2P', cursive;
  font-size: 0.8em;
  transition: all 0.3s ease;
  display: block;
  margin: 0 auto;

  &:hover {
    background-color: #ffd700;
    color: #000;
  }
`;

const Credits = ({ onClose }) => {
  return (
    <CreditsContainer>
      <CreditsBox>
        <Title>CRÉDITOS</Title>

        <CreditSection>
          <Role>DESARROLLO</Role>
          <Name>Héctor Flores</Name>
        </CreditSection>

        <CreditSection>
          <Role>DISEÑO</Role>
          <Name>Héctor Flores</Name>
        </CreditSection>

        <CreditSection>
          <Role>MÚSICA Y SONIDOS</Role>
          <Name>Héctor Flores</Name>
        </CreditSection>

        <CreditSection>
          <Role>TESTING</Role>
          <Name>Héctor Flores</Name>
        </CreditSection>

        <SpecialThanks>
          <ThanksTitle>AGRADECIMIENTOS ESPECIALES</ThanksTitle>
          <ThanksText>
            A todos los que han apoyado este proyecto
            y han contribuido con sus ideas y sugerencias.
          </ThanksText>
        </SpecialThanks>

        <Button onClick={onClose}>VOLVER</Button>
      </CreditsBox>
    </CreditsContainer>
  );
};

export default Credits; 