import React from 'react';
import { TouchableOpacity, View, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from './styles';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Map'>;
  route: RouteProp<RootStackParamList, 'Map'>;
};

const Map = ({ route, navigation }: Props) => {
  const { coordinates, name, city } = route.params;

  const location = {
    latitude: coordinates?.lat ?? 0,
    longitude: coordinates?.lon ?? 0,
  };

  const onBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {coordinates && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitudeDelta: 0.009,
            longitudeDelta: 0.009,
            ...location,
          }}
        >
          <Marker coordinate={{ ...location }} title={name} />
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
