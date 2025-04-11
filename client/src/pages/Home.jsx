import React from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: ${props => props.theme.colors.background};
    color: ${props => props.theme.colors.text};
`;

const Title = styled.h1`
    font-size: 3rem;
    margin-bottom: 2rem;
    text-align: center;
`;

const Home = () => {
    return (
        <HomeContainer>
            <Title>Monster Hanter</Title>
        </HomeContainer>
    );
};

export default Home; 