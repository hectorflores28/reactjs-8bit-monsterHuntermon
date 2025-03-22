import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useAuthStore } from '../stores/authStore';

const RegisterContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
  background: linear-gradient(135deg, ${props => props.theme.colors.background} 0%, ${props => props.theme.colors.surface} 100%);
`;

const RegisterCard = styled.div`
  background-color: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: 8px;
  border: 2px solid ${props => props.theme.colors.border};
  width: 100%;
  max-width: 400px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.md};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.xs};
`;

const Label = styled.label`
  color: ${props => props.theme.colors.text};
  font-size: 0.9rem;
`;

const Input = styled.input`
  background-color: ${props => props.theme.colors.background};
  border: 2px solid ${props => props.theme.colors.border};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.sm};
  font-family: ${props => props.theme.fonts.main};
  font-size: 0.9rem;
  transition: border-color 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.text};
  padding: ${props => props.theme.spacing.md};
  border: none;
  border-radius: 4px;
  font-family: ${props => props.theme.fonts.main};
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  margin-top: ${props => props.theme.spacing.md};

  &:hover {
    background-color: ${props => props.theme.colors.secondary};
    transform: scale(1.02);
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.div`
  color: ${props => props.theme.colors.error};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.md};
  font-size: 0.9rem;
`;

const LinkText = styled(Link)`
  color: ${props => props.theme.colors.primary};
  text-align: center;
  margin-top: ${props => props.theme.spacing.md};
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuthStore();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    characterName: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        formData.characterName
      );
      navigate('/game');
    } catch (error) {
      console.error('Error al registrarse:', error);
    }
  };

  return (
    <RegisterContainer>
      <RegisterCard>
        <Title>Crear Cuenta</Title>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="username">Nombre de Usuario</Label>
            <Input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="password">Contraseña</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <FormGroup>
            <Label htmlFor="characterName">Nombre del Personaje</Label>
            <Input
              type="text"
              id="characterName"
              name="characterName"
              value={formData.characterName}
              onChange={handleChange}
              required
            />
          </FormGroup>
          <Button type="submit" disabled={loading}>
            {loading ? 'Creando Cuenta...' : 'Crear Cuenta'}
          </Button>
        </Form>
        <LinkText to="/login">
          ¿Ya tienes una cuenta? ¡Inicia sesión aquí!
        </LinkText>
      </RegisterCard>
    </RegisterContainer>
  );
};

export default Register; 