import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  FlatList,
  StyleSheet,
  View,
} from 'react-native';

export default class Favorites extends Component {

  data = [
    12345,
    7777,
    8888,
  ];

  renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.text}>{item}</Text>;
    </View>
  );

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={this.data}
          renderItem={this.renderItem}
          keyExtractor={item => `${item}`}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  text: {
    fontSize: 18,
  },
});
