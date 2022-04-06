import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";

export default class Account extends Component {
  render() {
    const { navigation, route } = this.props;
    return (
      <View style={styles.body}>
        <Text>New Entry</Text>
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
