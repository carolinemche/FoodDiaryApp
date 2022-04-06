import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default class Home extends Component {
  render() {
    const { navigation, route } = this.props;
    return (
      <View style={styles.body}>
        <Text>Activity Screen</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
});
