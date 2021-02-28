import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer'
import firebase from 'firebase'

export default class Sidebar extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.center}>
            <DrawerItems 
                {...this.props}
            />
        </View>
        <View style={{flex: 0.2}}>
            <TouchableOpacity style={styles.button} onPress={() => {
                firebase.auth().signOut()
                this.props.navigation.navigate("LoginScreen")
            }}>
                <Text style={styles.text}>Logout</Text>
            </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 0.8,
  },
  button: {
    width: '100%',
    height: 40,
    backgroundColor: "#94ebaf",
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 15, 
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
