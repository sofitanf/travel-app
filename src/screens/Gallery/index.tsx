import React from 'react';
import {
  TouchableOpacity,
  View,
  SafeAreaView,
  FlatList,
  Image,
} from 'react-native';
import styles from './styles';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/RootStackParams';
import { StackNavigationProp } from '@react-navigation/stack';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Gallery'>;
  route: RouteProp<RootStackParamList, 'Gallery'>;
};

const Gallery = ({ route, navigation }: Props) => {
  const { images } = route.params;
  const onBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <FlatList
          style={{ paddingHorizontal: 24 }}
          showsVerticalScrollIndicator={false}
          data={images}
          renderItem={({ item }) => (
            <Image style={styles.image} source={{ uri: String(item) }} />
          )}
        />
        <TouchableOpacity onPress={onBack} style={styles.backContainer}>
          <Image
            style={styles.backIcon}
            source={require('../../assets/back.png')}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default React.memo(Gallery);
