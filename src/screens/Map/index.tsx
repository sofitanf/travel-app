import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';

type MapScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Map'>;

type Props = {
  navigation: MapScreenNavigationProp;
  route: RouteProp<RootStackParamList, 'Map'>;
};

const Map = ({ route, navigation }: Props) => {
  const { coordinates, name, city } = route.params;
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {coordinates && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: coordinates?.lat,
            longitude: coordinates?.lon,
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
          }}
        >
          <Marker
            coordinate={{
              latitude: coordinates?.lat,
              longitude: coordinates?.lon,
            }}
            title={name}
          />
        </MapView>
      )}
      <View style={styles.titleContainer}>
        <TouchableOpacity onPress={onBack}>
          <Image
            style={styles.backIcon}
            source={require('../../assets/back.png')}
          />
        </TouchableOpacity>
        <Text style={styles.title}>{`${name}, ${city}`}</Text>
      </View>
    </View>
  );
};

export default React.memo(Map);
