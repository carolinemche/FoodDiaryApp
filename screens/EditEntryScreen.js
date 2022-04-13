import React, { Component } from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';

export default class EditEntry extends Component {
  render() {
    const { navigation, route } = this.props;
    return (
      <View style={styles.body}>
        <Text>Edit Entry</Text>
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
