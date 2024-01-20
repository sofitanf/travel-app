import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import styles from './styles';

interface CategoriesProps {
  categories: string[];
  selectedCategory: string;
  onCategoryPress: (category: string) => void;
}

const Categories = ({
  categories,
  selectedCategory,
  onCategoryPress,
}: CategoriesProps) => {
  return (
    <FlatList
      showsHorizontalScrollIndicator={false}
      horizontal
      data={categories}
      renderItem={({ item, index }) => {
        const selected = selectedCategory === item;

        return (
          <TouchableOpacity
            onPress={() => onCategoryPress(item)}
            style={[
              styles.itemContainer,
              selected ? styles.selectedItemContainer : {},
              index === 0 ? { marginLeft: 32 } : {},
            ]}
          >
            <Text style={[styles.item, selected ? styles.selectedItem : {}]}>
              {item}
            </Text>
          </TouchableOpacity>
        );
      }}
    ></FlatList>
  );
};

export default React.memo(Categories);
