import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../stores/authStore';

const Nav = styled.nav`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.md};
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
`;

const Logo = styled(Link)`
  font-size: 1.5rem;
  font-weight: bold;
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const NavLinks = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.md};
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  padding: ${props => props.theme.spacing.sm};
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.primary};
  }
`;

const AuthButtons = styled.div`
  display: flex;
  gap: ${props => props.theme.spacing.sm};
`;

const Button = styled.button`
  background-color: ${props => props.variant === 'outline' ? 'transparent' : props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  color: ${props => props.variant === 'outline' ? props.theme.colors.primary : props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.variant === 'outline' ? props.theme.colors.primary : props.theme.colors.secondary};
    color: ${props => props.theme.colors.text};
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Nav>
      <Logo to="/">Monster Hunter 8-bit</Logo>
      <NavLinks>
        <NavLink to="/game">Jugar</NavLink>
        <NavLink to="/profile">Perfil</NavLink>
      </NavLinks>
      <AuthButtons>
        {user ? (
          <>
            <Button variant="outline" onClick={handleLogout}>
              Cerrar Sesión
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" as={Link} to="/login">
              Iniciar Sesión
            </Button>
            <Button as={Link} to="/register">
              Registrarse
            </Button>
          </>
        )}
      </AuthButtons>
    </Nav>
  );
};

export default Navbar; 