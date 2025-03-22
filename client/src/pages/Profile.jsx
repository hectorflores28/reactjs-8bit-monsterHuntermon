import React from 'react';
import styled from 'styled-components';

const ProfileContainer = styled.div`
  padding: 2rem;
  color: #fff;
`;

const ProfileTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
`;

const ProfileContent = styled.div`
  max-width: 800px;
  margin: 0 auto;
`;

const Profile = () => {
  return (
    <ProfileContainer>
      <ProfileTitle>Perfil del Cazador</ProfileTitle>
      <ProfileContent>
        <p>Contenido del perfil en desarrollo...</p>
      </ProfileContent>
    </ProfileContainer>
  );
};

export default Profile; 