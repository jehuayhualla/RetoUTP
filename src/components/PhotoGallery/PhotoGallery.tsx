import React, { useState, useEffect } from 'react';
import { FlatList, Dimensions, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import fetchPhotos from '../../libs/fetchPhotos';
import { PhotoIdentifier } from "@react-native-camera-roll/camera-roll";
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../navigation/RootNavigation';

const screenWidth = Dimensions.get('window').width;
const numColumns = 4;
const gap = 5;
const imageSize = (screenWidth - (gap * (numColumns - 1))) / numColumns;

const Container = styled.View`
  flex: 1;
  background-color: #f5f5f5;
`;

interface ImageProps {
  isLastColumn: boolean
}

const ImageItem = styled(FastImage)<ImageProps>`
  width: ${imageSize}px;
  height: ${imageSize}px;
  margin-right: ${(props) => (props.isLastColumn ? 0 : gap)}px;
  margin-bottom: ${gap}px;
`;

const PhotoGallery: React.FC = () => {
  const [photos, setPhotos] = useState<PhotoIdentifier[]>([])
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>()

  useEffect(() => {
    (async () => {
      const fetchedPhotos = await fetchPhotos();
      setPhotos(fetchedPhotos);
    })();
  }, []);

  return (
    <Container>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.node.image.uri}
        numColumns={4}
        renderItem={({ item, index }) => (
          <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate('ImageDetail', { uri: item.node.image.uri })}>
              <ImageItem 
                testID={`image-item`} 
                source={{ uri: item.node.image.uri }} 
                isLastColumn={(index + 1) % numColumns === 0}
              />
          </TouchableOpacity>
      )}
      />
    </Container>
  );
};

export default PhotoGallery;
