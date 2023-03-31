import React, {useEffect} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {FoodCard, Gap, HomeProfile, HomeTabSection} from '../../components';
import {getFoodData} from '../../redux/action';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const {food} = useSelector(state => state.homeReducer);

  useEffect(() => {
    dispatch(getFoodData());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.page}>
      <HomeProfile />
      <View>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.foodContainer}>
            <Gap width={24} />
            {food.map(itemFood => {
              return (
                <FoodCard
                  key={itemFood.id}
                  name={itemFood.name}
                  image={{uri: itemFood.picturePath}}
                  rating={itemFood.rate}
                  onPress={() => navigation.navigate('FoodDetail', itemFood)}
                />
              );
            })}
            <Gap width={24} />
          </View>
        </ScrollView>
      </View>
      <View style={styles.tabContainer}>
        <HomeTabSection />
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  foodContainer: {
    flexDirection: 'row',
    marginVertical: 24,
  },
  tabContainer: {
    flex: 1,
  },
});
