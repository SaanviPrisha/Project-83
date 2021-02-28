import React from 'react';
import { StyleSheet } from 'react-native';
import { Header } from 'react-native-elements'

export default class MyHeader extends React.Component {
  render() {
    return (
      <Header 
        centerComponent={{
            text: this.props.title,
            style: {fontSize: 28, fontFamily: "Fantasy"}
        }}
        backgroundColor="#94ebaf"
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
