import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AttractionData from '../../data/attractions.json';
import styles from './styles';
import { IAttraction } from '../../types/Attraction';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParams';
import { RouteProp } from '@react-navigation/native';
import Title from '../../components/Title';
import InfoCard from '../../components/InfoCard';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'AttractionDetail'>;
  route: RouteProp<RootStackParamList, 'AttractionDetail'>;
};

const AttractionDetail = ({ navigation, route }: Props) => {
  const attractionId = route?.params?.attractionId;
  const [attraction, setAttraction] = useState<IAttraction>();
  // const [mainImage, setMainImage] = useState<string>();
  // const [slicedImages, setSliceImages] = useState<string[] | undefined>([]);
  // const [diffImages, setDiffImages] = useState<number>(0);

  const location = {
    latitude: attraction?.coordinates.lat ?? 0,
    longitude: attraction?.coordinates.lon ?? 0,
  };

  const mainImage = attraction?.images[0];
  const slicedImages = attraction?.images.slice(0, 5);
  const diffImages =
    attraction?.images && slicedImages?.length
      ? attraction?.images.length - slicedImages?.length
      : 0;

  useEffect(() => {
    const result = AttractionData.find(
      (item) => item.id == parseInt(attractionId)
    );
    setAttraction(result);
    // setMainImage(result?.images[0]);

    // sliced images
    // const slice = result?.images && result?.images.slice(0, 5);
    // setSliceImages(slice);

    // diff images
    // const diff =
    //   result?.images && slice?.length
    //     ? result?.images.length - slice?.length
    //     : 0;
    // setDiffImages(diff);
  }, []);

  const navigateToGallery = () => {
    navigation.navigate('Gallery', { images: attraction?.images });
  };

  const onBack = () => {
    navigation.goBack();
  };

  const downloadImage = async () => {
    if (mainImage) {
      const directory = `${FileSystem.documentDirectory}images/`;
      const fileUri = `${directory}image.jpg`;

      try {
        // Ensure the directory exists
        await FileSystem.makeDirectoryAsync(directory, { intermediates: true });

        // Download the image
        const { uri: downloadedUri } = await FileSystem.downloadAsync(
          mainImage,
          fileUri
        );
        console.log('Image downloaded to:', downloadedUri);

        return downloadedUri;
      } catch (error) {
        console.error('Error downloading image:', error);
        return null;
      }
    }
  };

  const onShare = async () => {
    try {
      const downloadedUri = await downloadImage();

      if (downloadedUri) {
        await Sharing.shareAsync(downloadedUri, {
          dialogTitle: `I wanted to share beautiful image of ${attraction?.name}`,
        });
      } else {
        console.error('Error downloading image.');
      }
    } catch (error) {
      console.error('Error sharing image:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          imageStyle={{ borderRadius: 20 }}
          style={styles.mainImage}
          source={{ uri: mainImage }}
        >
          <View style={styles.innerImage}>
            <View style={styles.header}>
              <Pressable onPress={onBack} hitSlop={8}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/back.png')}
                />
              </Pressable>
              <Pressable onPress={onShare} hitSlop={8}>
                <Image
                  style={styles.icon}
                  source={require('../../assets/share.png')}
                />
              </Pressable>
            </View>
            <Pressable style={styles.footer} onPress={navigateToGallery}>
              {slicedImages?.map((image, index) => (
                <View key={image}>
                  <Image style={styles.miniImage} source={{ uri: image }} />
                  {diffImages > 0 && slicedImages.length - 1 === index ? (
                    <Text style={styles.moreImages}>+{diffImages}</Text>
                  ) : null}
                </View>
              ))}
            </Pressable>
          </View>
        </ImageBackground>
        <View style={styles.headerContainer}>
          <View>
            <Title style={styles.title} title={attraction?.name} />
            <Text style={styles.city}>{attraction?.city}</Text>
          </View>
          <Title style={styles.price} title={attraction?.entry_price} />
        </View>

        <InfoCard title={attraction?.address} type='address' />
        <InfoCard
          title={`OPEN
${attraction?.opening_time} - ${attraction?.closing_time}`}
          type='clock'
        />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('Map', {
              coordinates: attraction?.coordinates,
              name: attraction?.name,
              city: attraction?.city,
            })
          }
          style={styles.mapContainer}
        >
          {attraction?.coordinates && (
            <MapView
              style={styles.map}
              initialRegion={{
                latitudeDelta: 0.009,
                longitudeDelta: 0.009,
                ...location,
              }}
            >
              <Marker
                coordinate={{
                  ...location,
                }}
                title={attraction?.name}
              />
            </MapView>
          )}
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default React.memo(AttractionDetail);
