import React from 'react';
import { FlatList, SafeAreaView, Text, View } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import Title from '../../components/Title';
import styles from './styles';
import Categories from '../../components/Categories';
import { useEffect, useState } from 'react';
import AttractionCard from '../../components/AttractionCard';
import attractionsData from '../../data/attractions.json';
import categoriesData from '../../data/categories.json';
import { RootStackParamList } from '../../types/RootStackParams';
import { IAttraction } from '../../types/Attraction';

type Props = {
  navigation: StackNavigationProp<RootStackParamList, 'Home'>;
};

const All = 'All';

const Home = ({ navigation }: Props) => {
  const [selectedCategory, setSelectedCategory] = useState(All);
  const [data, setData] = useState<IAttraction[]>([]);

  useEffect(() => {
    setData(attractionsData);
  }, []);

  useEffect(() => {
    if (selectedCategory === All) {
      setData(attractionsData);
    } else {
      const result = attractionsData.filter((item) =>
        item.categories.includes(selectedCategory)
      );
      setData(result);
    }
  }, [selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={data}
        style={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items found.</Text>
        }
        ListHeaderComponent={
          <>
            <View style={{ marginHorizontal: 32 }}>
              <Title title='Where do' style={{ fontWeight: 'normal' }} />
              <Title title='you want to go?' />
              <Title title='Explore Attractions' style={styles.subtitle} />
            </View>
            <Categories
              selectedCategory={selectedCategory}
              onCategoryPress={setSelectedCategory}
              categories={[All, ...categoriesData]}
            />
          </>
        }
        columnWrapperStyle={styles.list}
        numColumns={2}
        keyExtractor={(item) => String(item?.id)}
        renderItem={({ item }) => {
          return (
            <AttractionCard
              subtitle={item.city}
              title={item.name}
              image={item.images[0]}
              onPress={() =>
                navigation.navigate('AttractionDetail', {
                  attractionId: String(item.id),
                })
              }
            />
          );
        }}
      />
    </SafeAreaView>
  );
};

export default React.memo(Home);
