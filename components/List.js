import React from 'react';
import {Text, View, StyleSheet, FlatList} from 'react-native';
import Card from './Card';
import PropTypes from 'prop-types';

const propTypes = {
  title: PropTypes.string,
  content: PropTypes.array,
};

const List = props => {
  const {navigation, title, content} = props;

  return (
    <View style={styles.list}>
      <View>
        <Text style={styles.text}>{title}</Text>
      </View>
      <View>
        <FlatList
          data={content}
          renderItem={({item}) => <Card navigation={navigation} item={item} />}
          horizontal={true}></FlatList>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  list: {
    marginTop: 25,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    padding: 10,
    paddingBottom: 20,
  },
});

List.propTypes = propTypes;

export default List;
