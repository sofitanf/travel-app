import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  ImageBackground,
  Image,
  Pressable,
} from 'react-native';
import AttractionData from '../../data/attractions.json';
import styles from './styles';
import { IAttraction } from '../../types/Attraction';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/RootStackParams';
import { RouteProp } from '@react-navigation/native';
import Title from '../../components/Title';
import InfoCard from '../../components/InfoCard';

type AttractionDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AttractionDetail'
>;

type Props = {
  navigation: AttractionDetailScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'AttractionDetail'>;
};

const AttractionDetail = ({ navigation, route }: Props) => {
  const attractionId = route?.params?.attractionId;
  const [attraction, setAttraction] = useState<IAttraction>();
  const [mainImage, setMainImage] = useState<string>();
  const [slicedImages, setSliceImages] = useState<string[] | undefined>([]);
  const [diffImages, setDiffImages] = useState<number>(0);

  useEffect(() => {
    const result = AttractionData.find(
      (item) => item.id == parseInt(attractionId)
    );
    setAttraction(result);
    setMainImage(result?.images[0]);

    // sliced images
    const slice = result?.images && result?.images.slice(0, 5);
    setSliceImages(slice);

    // diff images
    const diff =
      result?.images && slice?.length
        ? result?.images.length - slice?.length
        : 0;
    setDiffImages(diff);
  }, []);

  const navigateToGallery = () => {
    navigation.navigate('Gallery', { images: attraction?.images });
  };

  const onBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={styles.container}>
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
            <Pressable hitSlop={8}>
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
    </SafeAreaView>
  );
};

export default React.memo(AttractionDetail);
