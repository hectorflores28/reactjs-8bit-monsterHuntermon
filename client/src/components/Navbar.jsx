import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import useAuthStore from '../stores/authStore';

const Nav = styled.nav`
    background-color: ${props => props.theme.colors.surface};
    padding: ${props => props.theme.spacing.md};
    border-bottom: 2px solid ${props => props.theme.colors.primary};
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Logo = styled(motion.div)`
    font-size: 1.5rem;
    color: ${props => props.theme.colors.secondary};
    cursor: pointer;
    text-shadow: 0 0 5px ${props => props.theme.colors.primary};
`;

const NavLinks = styled.div`
    display: flex;
    gap: ${props => props.theme.spacing.md};
`;

const NavLink = styled(motion.button)`
    background: none;
    border: none;
    color: ${props => props.theme.colors.text};
    font-size: 1rem;
    padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
    cursor: pointer;
    font-family: ${props => props.theme.fonts.primary};
    
    &:hover {
        color: ${props => props.theme.colors.secondary};
    }
`;

const UserInfo = styled.div`
    display: flex;
    align-items: center;
    gap: ${props => props.theme.spacing.md};
    color: ${props => props.theme.colors.text};
`;

const Navbar = () => {
    const navigate = useNavigate();
    const { isAuthenticated, user, logout } = useAuthStore();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <Nav>
            <Logo
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate('/')}
            >
                Monster Hanter
            </Logo>
            
            <NavLinks>
                {isAuthenticated ? (
                    <>
                        <UserInfo>
                            <span>{user?.nombre}</span>
                            <NavLink
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleLogout}
                            >
                                Cerrar Sesión
                            </NavLink>
                        </UserInfo>
                    </>
                ) : (
                    <>
                        <NavLink
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/login')}
                        >
                            Iniciar Sesión
                        </NavLink>
                        <NavLink
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/register')}
                        >
                            Registrarse
                        </NavLink>
                    </>
                )}
            </NavLinks>
        </Nav>
    );
};

export default Navbar; 