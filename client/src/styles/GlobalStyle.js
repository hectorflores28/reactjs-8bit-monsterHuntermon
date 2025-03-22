import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    primary: '#FF6B6B',
    secondary: '#4ECDC4',
    background: '#2C3E50',
    surface: '#34495E',
    text: '#ECF0F1',
    error: '#E74C3C',
    success: '#2ECC71',
    warning: '#F1C40F',
    border: '#95A5A6'
  },
  fonts: {
    main: "'Press Start 2P', cursive",
    pixel: "'VT323', monospace"
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px'
  },
  breakpoints: {
    mobile: '320px',
    tablet: '768px',
    desktop: '1024px'
  }
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${props => props.theme.fonts.main};
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
  }

  button {
    font-family: ${props => props.theme.fonts.main};
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
    border: 2px solid ${props => props.theme.colors.border};
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    cursor: pointer;
    transition: all 0.2s ease;
    text-transform: uppercase;
    font-size: 0.8rem;

    &:hover {
      background-color: ${props => props.theme.colors.secondary};
      transform: scale(1.05);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  input {
    font-family: ${props => props.theme.fonts.main};
    background-color: ${props => props.theme.colors.surface};
    border: 2px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
    padding: ${props => props.theme.spacing.sm};
    width: 100%;
    max-width: 300px;
  }

  a {
    color: ${props => props.theme.colors.primary};
    text-decoration: none;
    transition: color 0.2s ease;

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }

  /* Estilos para scrollbar */
  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-track {
    background: ${props => props.theme.colors.background};
  }

  ::-webkit-scrollbar-thumb {
    background: ${props => props.theme.colors.primary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: ${props => props.theme.colors.secondary};
  }

  /* Estilos para selección de texto */
  ::selection {
    background-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.text};
  }
`; 