import React from 'react';
import { Image, Text, View } from 'react-native';
import styles from './styles';

interface CardProps {
  title?: string;
  style?: object;
  type: string;
}

const InfoCard = ({ title, style, type }: CardProps) => {
  const icon =
    type === 'address'
      ? require('../../assets/place.png')
      : require('../../assets/clock.png');
  return (
    <View style={styles.container}>
      <Image style={styles.icon} source={icon}></Image>
      <Text style={[styles.title, style]}>{title}</Text>
    </View>
  );
};

export default React.memo(InfoCard);
