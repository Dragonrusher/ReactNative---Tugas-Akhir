/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import ItemListFood from '../ItemListFood';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {getInProgress, getPastOrders} from '../../../redux/action';

const renderTabBar = props => (
  <TabBar
    {...props}
    indicatorStyle={{
      backgroundColor: '#020202',
      height: 3,
    }}
    style={{
      backgroundColor: 'white',
      elevation: 0,
      shadowOpacity: 0,
      borderBottomColor: '#F2F2F2',
      borderBottomWidth: 1,
    }}
    tabStyle={{width: 'auto'}}
    renderLabel={({route, focused, color}) => (
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: focused ? '#020202' : '#8D92A3',
        }}>
        {route.title}
      </Text>
    )}
  />
);

const InProgress = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {inProgress} = useSelector(state => state.orderReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getInProgress());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getInProgress());
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.containerInProgress}>
        {inProgress.map(order => {
          return (
            <ItemListFood
              key={order.id}
              image={{uri: order.food.picturePath}}
              onPress={() => navigation.navigate('OrderDetail', order)}
              type="in-progress"
              items={order.quantity}
              price={order.total}
              name={order.food.name}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const PastOrders = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {pastOrders} = useSelector(state => state.orderReducer);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    dispatch(getPastOrders());
  }, []);

  const onRefresh = () => {
    setRefreshing(true);
    dispatch(getPastOrders());
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }>
      <View style={styles.containerPastOrders}>
        {pastOrders.map(order => {
          return (
            <ItemListFood
              key={order.id}
              image={{uri: order.food.picturePath}}
              onPress={() => navigation.navigate('OrderDetail', order)}
              type="past-orders"
              items={order.quantity}
              price={order.total}
              name={order.food.name}
              date={order.created_at}
              status={order.status}
            />
          );
        })}
      </View>
    </ScrollView>
  );
};

const OrderTabSection = () => {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: '1', title: 'In Progress'},
    {key: '2', title: 'Past Orders'},
  ]);

  const renderScene = SceneMap({
    1: InProgress,
    2: PastOrders,
  });
  return (
    <TabView
      renderTabBar={renderTabBar}
      navigationState={{index, routes}}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{width: layout.width}}
      style={{backgroundColor: 'white'}}
    />
  );
};

export default OrderTabSection;

const styles = StyleSheet.create({
  containerInProgress: {paddingTop: 8, paddingHorizontal: 24},
  containerPastOrders: {paddingTop: 8, paddingHorizontal: 24},
});
