import React from 'react';
import { Image, Text, View, TouchableOpacity } from 'react-native';
import styles from './styles';

interface CardProps {
  title: string;
  image: string;
  subtitle: string;
  onPress: () => void;
}

const AttractionCard = ({ title, image, subtitle, onPress }: CardProps) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.card}>
      <Image style={styles.image} source={{ uri: image }}></Image>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <Image
          style={styles.icon}
          source={require('../../assets/locaction.png')}
        />
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default React.memo(AttractionCard);
