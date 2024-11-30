import React, { Component } from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface Props {}

interface State {}

export default class Checker extends Component<Props, State> {

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
  } as ViewStyle,
});
