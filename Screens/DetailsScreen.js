import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
import { TouchableOpacity } from 'react-native';

export default class RecieverDetails extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        recieverID: this.props.navigation.getParam('Data')['user_id'],
        bookName: this.props.navigation.getParam('Data')['book_name'],
        reason: this.props.navigation.getParam('Data')['reason'],
        requestID: this.props.navigation.getParam('Data')['request_id'],
        recieverName: '',
        recieverContact: '',
        recieverAddress: '',
        requestDocId: '',
        userId: firebase.auth().currentUser.email,
        username: '',
    }
  }
  getDetails = () => {
    db.collection("Users").where("email_id","==",this.state.recieverID).get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        var data = doc.data()
        this.setState({
          rName: data.first_name,
          rAddress: data.address,
          rContact: data.contact_Info,
        })
      });
    })
    db.collection("Requested_items").where("request_id","==",this.state.requestID).get()
    .then(snapshot => {
        snapshot.forEach(doc => {
            this.setState({
                rDocId: doc.id
            })
        })
    })
  }
  getUserDetails = () => {
    db.collection("Users").where("email_id","==",this.state.userId).get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        var data = doc.data()
        this.setState({
          username: data.first_name + " " + data.last_name
        })
      });
    })
  }
  componentDidMount() {
        this.getDetails()
        this.getUserDetails()
  }
  notification = () => {
    db.collection("All_Notifications").add({
      target_user_id: this.state.recieverID,
      donor_id: this.state.userId,
      request_id: this.state.requestID, 
      book_name: this.state.bookName, 
      date: firebase.firestore.FieldValue.serverTimestamp(),
      notification_status: "unread",
      message: this.state.username + " has shown interested in donating " + this.state.bookName + "."
    })
  }
  updateStatus = () => {
    db.collection("All_Donations").add({
      book_name: this.state.bookName,
      request_id: this.state.requestID,
      requested_by: this.state.rName,
      donor_id: this.state.userId,
      request_status: "Donor Interested"
    })
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{flex: 0.3}}>
            <Card
                title={"Book Information"}
                titleStyle={{fontSize: 20, fontWeight: 'bold'}}
            >
                <Card>
                    <Text>Name: {this.state.bookName}</Text>
                </Card>
                <Card>
                    <Text>Reason: {this.state.reason}</Text>
                </Card>
            </Card>
        </View>
        <View style={{flex: 0.3}}>
            <Card
                title={"Reciever Information"}
                titleStyle={{fontSize: 20, fontWeight: 'bold'}}
            >
                <Card>
                    <Text>Name: {this.state.recieverName}</Text>
                </Card>
                <Card>
                    <Text>Address: {this.state.recieverAddress}</Text>
                </Card>
                <Card>
                    <Text>Contact Information: {this.state.recieverContact}</Text>
                </Card>
            </Card>
        </View>
        <View style={{flex: 0.3}}>
            {this.state.recieverID != this.state.userId ? (
                <TouchableOpacity onPress={() => {
                  this.notification()
                  this.updateStatus()
                  this.props.navigation.navigate("Donations")
                }} style={styles.button}>
                    <Text style={styles.text}>I want to donate!</Text>
                </TouchableOpacity>
            ): null}
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
  button: {
    backgroundColor: '#94ebaf',
    width: 200,
    height: 50,
    alignText: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginTop: 120,
    marginLeft: 650
  },
  text: {
    fontSize: 15, 
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});
