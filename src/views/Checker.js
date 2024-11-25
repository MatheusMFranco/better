import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

export default class Checker extends Component {

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Checker</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
  },
});
