import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class HomeScreen extends React.Component {
    constructor() {
        super()
        this.state = {
            bookName: "",
            reason: "",
            description: "",
            userId: firebase.auth().currentUser.email
        }
    }
    requestBook = async () => {
      var rID = Math.random().toString(36).substring(7)
      db.collection("Requested_items").add({
        user_id: this.state.userId,
        itemName: this.state.bookName,
        description: this.state.description,
        reason: this.state.reason,
        request_id: rID
      })
      alert("Item was requested succesfully!")
    }
    render() {
        return (
            <View style={styles.container}>
                <MyHeader
                    title="Request"
                ></MyHeader>
                <View styles={styles.center}>
                    <TextInput
                        placeholder={'Name of the Item'}
                        style={styles.textInput1}
                        onChangeText={(text) => {
                        this.setState({
                            bookName: text
                        });}}>
                    </TextInput>
                    <TextInput
                        placeholder={'Description'}
                        style={styles.textInput2}
                        multiline={true}
                        onChangeText={(text) => {
                        this.setState({
                            description: text
                        });}}>
                    </TextInput>
                    <TextInput
                        placeholder={'Reason of Request'}
                        style={styles.textInput2}
                        multiline={true}
                        onChangeText={(text) => {
                        this.setState({
                            reason: text
                        });}}>
                    </TextInput>
                    <TouchableOpacity onPress={() => {
                      this.requestBook()
                    }} style={styles.RequestButton}>
                        <Text style={styles.login}>Request</Text>
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
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignText: 'center',
    alignSelf: 'center',
    alignContent: 'center'
  },
  textInput1: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    width: '30%',
    height: 50,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 200,
    marginLeft: 30,
  },
  textInput2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderWidth: 2,
    width: '30%',
    height: 70,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 30,
  },
  RequestButton: {
    marginTop: 10,
    backgroundColor: '#94ebaf',
    width: 100,
    height: 50,
    alignText: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  login: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Courier New',
    fontWeight: 'bold'
  },
});
