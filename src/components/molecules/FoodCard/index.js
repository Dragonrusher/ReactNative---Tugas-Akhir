import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Rating from '../Rating';

const FoodCard = ({image, name, rating, onPress}) => {
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View style={styles.container}>
        <Image source={image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.text}>{name}</Text>
          <Rating number={rating} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 200,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 14,
    marginRight: 24,
    overflow: 'hidden',
  },
  content: {
    padding: 12,
  },
  text: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
  },

  image: {
    width: 200,
    height: 140,
    resizeMode: 'cover',
  },
});
