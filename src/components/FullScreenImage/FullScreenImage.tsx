import React from 'react'
import styled from 'styled-components/native'
import FastImage from 'react-native-fast-image'

interface FullScreenImageProps {
  uri: string;
}

const StyledImage = styled(FastImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const FullScreenImage: React.FC<FullScreenImageProps> = ({ uri }) => {
  return <StyledImage source={{ uri }} resizeMode="cover" />
};

export default FullScreenImage