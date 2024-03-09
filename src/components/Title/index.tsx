import React from 'react';

import { Text } from 'react-native';
import styles from './styles';

interface TitleProps {
  title?: string;
  style?: object;
}

const Title = ({ title, style }: TitleProps) => {
  return <Text style={[styles.title, style]}>{title}</Text>;
};

export default React.memo(Title);
