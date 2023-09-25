import styled from 'styled-components/native';
import React from 'react';
import PhotoGallery from '../components/PhotoGallery';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;

const Title = styled.Text`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: left;
  width: 100%;
  margin-left: 20px;
`;

const HomeScreen: React.FC = () => {
  return (
    <Container>
      <Title>Gallery</Title>
      <PhotoGallery />
    </Container>
  );
}

export default HomeScreen;