import styled from 'styled-components/native';
import React from 'react';
import { RootStackParamList } from '../navigation/RootNavigation';
import type { StackScreenProps } from '@react-navigation/stack';
import FullScreenImage from '../components/FullScreenImage';

type Props = StackScreenProps<RootStackParamList, 'ImageDetail'>;

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;


const ImageDetailScreen: React.FC<Props> = ({ route }) => {
  const { uri } = route.params;
  return (
    <Container>
      <FullScreenImage uri={uri} />
    </Container>
  );
}


export default ImageDetailScreen