import { CameraRoll, PhotoIdentifier } from "@react-native-camera-roll/camera-roll"
import { PermissionsAndroid, Platform } from "react-native";

const fetchPhotos = async (): Promise<PhotoIdentifier[]> => {
  try {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      throw new Error("Android permission error")
    }
    const data = await CameraRoll.getPhotos({
      first: 50, 
      assetType: 'Photos',
    });
    console.log(data)
    return data.edges;
  } catch (error) {
    console.error("Error fetching photos", error)
    return []
  }
}

async function hasAndroidPermission() {
  const version = parseInt(Platform.Version as string, 10);
  const getCheckPermissionPromise = () => {
    if (version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO),
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission,
      );
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO,
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED,
      );
    } else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then((status) => status === PermissionsAndroid.RESULTS.GRANTED);
    }
  };

  return await getRequestPermissionPromise();
}

export default fetchPhotos