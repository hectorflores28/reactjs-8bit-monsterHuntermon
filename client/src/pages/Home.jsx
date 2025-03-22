import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../stores/authStore';

const HomeContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  text-align: center;
  background: linear-gradient(135deg, ${props => props.theme.colors.background} 0%, ${props => props.theme.colors.surface} 100%);
`;

const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.primary};
  text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.3);
  animation: pixelate 0.5s steps(1) infinite;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  margin-bottom: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};
  max-width: 600px;
  line-height: 1.8;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.xl};

  @media (max-width: ${props => props.theme.breakpoints.mobile}) {
    flex-direction: column;
  }
`;

const Button = styled(Link)`
  background-color: ${props => props.variant === 'outline' ? 'transparent' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.variant === 'outline' ? props.theme.colors.primary : props.theme.colors.text};
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  text-decoration: none;
  font-size: 1rem;
  text-transform: uppercase;
  transition: all 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.variant === 'outline' ? props.theme.colors.primary : props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.lg};
  margin-top: ${props => props.theme.spacing.xl};
  width: 100%;
  max-width: 1200px;
`;

const FeatureCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.lg};
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.border};
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    border-color: ${props => props.theme.colors.primary};
  }
`;

const FeatureTitle = styled.h3`
  color: ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const FeatureDescription = styled.p`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
  line-height: 1.6;
`;

const Home = () => {
  const { user } = useAuthStore();

  return (
    <HomeContainer>
      <Title>Monster Hunter 8-bit</Title>
      <Subtitle>
        ¡Bienvenido al mundo de la cacería en 8 bits! Explora un mundo lleno de monstruos,
        mejora tus armas y conviértete en el mejor cazador.
      </Subtitle>
      
      <ButtonContainer>
        {user ? (
          <Button to="/game">¡Comenzar Aventura!</Button>
        ) : (
          <>
            <Button to="/register">¡Registrarse!</Button>
            <Button variant="outline" to="/login">Iniciar Sesión</Button>
          </>
        )}
      </ButtonContainer>

      <FeaturesGrid>
        <FeatureCard>
          <FeatureTitle>14 Armas Únicas</FeatureTitle>
          <FeatureDescription>
            Domina diferentes estilos de combate con armas únicas, cada una con sus propios combos y mecánicas.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Monstruos Gigantes</FeatureTitle>
          <FeatureDescription>
            Enfréntate a dragones y criaturas colosales con patrones de ataque únicos y comportamientos inteligentes.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Mundo Abierto</FeatureTitle>
          <FeatureDescription>
            Explora vastos territorios en busca de presas y recursos para mejorar tu equipo.
          </FeatureDescription>
        </FeatureCard>

        <FeatureCard>
          <FeatureTitle>Sistema de Progresión</FeatureTitle>
          <FeatureDescription>
            Mejora tu personaje, desbloquea nuevas armas y armaduras, y conviértete en un cazador legendario.
          </FeatureDescription>
        </FeatureCard>
      </FeaturesGrid>
    </HomeContainer>
  );
};

export default Home; 