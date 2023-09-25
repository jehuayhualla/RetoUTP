import React from 'react';
import { render, act, waitFor, screen } from '@testing-library/react-native';
import PhotoGallery from './PhotoGallery';
import { create } from 'react-test-renderer';
// Mocking external dependencies
jest.mock('@react-navigation/native');
jest.mock('react-native-fast-image', () => 'FastImage');
jest.mock('@react-native-camera-roll/camera-roll', () => ({
  CameraRoll: jest.fn(),  
  PhotoIdentifier: jest.fn(), 
}));

import fetchPhotos from '../../libs/fetchPhotos';

// Mocked data for fetchPhotos
const mockPhotos = [{
  node: {
    type: 'mockType1',
    group_name: 'mockGroupName1',
    image: {
      uri: 'mockImage1.jpg',
      height: 100,
      width: 100,
      fileSize: 1000,
      playableDuration: 0,
      orientation: 1,
      filename: 'mockFilename1',
      filepath: 'mockFilepath1',
      extension: 'jpg',
    },
    timestamp: 1234567890,
    modificationTimestamp: 1234567891,
    location: null,
  },
}, {
  node: {
    type: 'mockType2',
    group_name: 'mockGroupName2',
    image: {
      uri: 'mockImage2.jpg',
      height: 100,
      width: 100,
      fileSize: 1000,
      playableDuration: 0,
      orientation: 1,
      filename: 'mockFilename2',
      filepath: 'mockFilepath2',
      extension: 'jpg',
    },
    timestamp: 1234567892,
    modificationTimestamp: 1234567893,
    location: null,
  },
}];

jest.mock('../../libs/fetchPhotos');

describe('<PhotoGallery />', () => {
  it('renders without crashing', async () => {
    (fetchPhotos as jest.Mock).mockResolvedValueOnce(mockPhotos);
    await act(async () => {
        create(<PhotoGallery />);
    });
  });

  it('renders images from mocked data', async () => {
    (fetchPhotos as jest.Mock).mockResolvedValueOnce(mockPhotos);
    render(<PhotoGallery />);
    const images = await screen.findAllByTestId("image-item");
    expect(images).toHaveLength(mockPhotos.length);
  });

});
