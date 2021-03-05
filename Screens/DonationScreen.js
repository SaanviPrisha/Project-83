import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler'
import { ListItem, Icon } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class DonationScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      donorId: firebase.auth().currentUser.email,
      donorName: '',
      allDonations: [],
    }
  }
  getAllDonations = () => {
    db.collection("All_Donations").where("donor_id", "==", this.state.donorId).onSnapshot((snapshot) => {
      var donations = []
      snapshot.docs.map((doc) => {
        var donate = doc.data()
        donate["Doc_Id"] = doc.id
        donations.push(donate)
      })
      this.setState({
        allDonations: donations
      })
      console.log(this.state.allDonations)
    })
  }
  getDonorDetails = () => {
    db.collection("Users").where("email_id","==",this.state.donorId).get()
      .then((snapshot) => {
        snapshot.forEach(doc => {
          var data = doc.data()
          this.setState({
            donorName: data.first_name + " " + data.last_name,
          })
        });
      })
  }
  componentDidMount() {
    this.getAllDonations()
    this.getDonorDetails()
  }
  sendBook = (item) => {
    var status = ""
    if(item.request_status == "Book Sent") {
      status = "Donor Interested"
      db.collection("All_Donations").doc(item.Doc_Id).update({
        request_status: status
      })
    } else {
      status = "Book Sent"
      db.collection("All_Donations").doc(item.Doc_Id).update({
        request_status: status
      })
    }
    this.sendNotification(item,status)
  }
  sendNotification = (item,status) => {
    db.collection("All_Notifications").where("request_id","==",item.request_id).where("donor_id","==",item.donor_id).get()
    .then((snapshot) => {
      snapshot.forEach(doc => {
        var message = ""
        if(status == "Book Sent") {
          message = this.state.donorName + " has sent you " + item.book_name + "."
        } else {
          message = this.state.donorName + " has shown interested in donating " + item.book_name + "."
        }
        db.collection("All_Notifications").doc(doc.id).update({
          message: message,
          notification_status: "unread",
          date: firebase.firestore.FieldValue.serverTimestamp()
        })
      })
    })
  }
  renderItem = ({item, i}) => (
    <ListItem 
      key={i}
      title={item.book_name}
      subtitle={"Requested by: " + item.requested_by + "\n Status: " + item.request_status}
      titleStyle= {{fontSize: 20, fontFamily: "Courier New"}}
      leftElement={<Icon 
        name="book"
        type="font-awesome"
        containerStyle={{marginRight: 20}}
      />}
      rightElement={<TouchableOpacity style={[styles.details, {
        backgroundColor: item.request_status == "Book Sent" ? "#f2817c" : "#94ebaf"
      }]}>
        <Text style={styles.textStyle}>{item.request_status == "Book sent" ? "Book Sent!" : "Send Book"}</Text>
      </TouchableOpacity>}
      bottomDivider
    />
  )

  keyExtractor = (item, index) => index.toString()
  render() {
    return (
      <View style={styles.container}>
        <MyHeader title={"Donations"}/>
        <View style={{flex: 1}}>
        {this.state.allDonations.length == 0 ? (
          <View style={{flex: 1}}>
            <Text style={styles.login}>No Donations Made</Text>
          </View>
        ): (
          <FlatList 
            data={this.state.allDonations}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          />
        )}
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
  login: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Courier New',
    fontWeight: 'bold'
  },
  details: {
    width: 100,
    height: 40,
    backgroundColor: "#94ebaf",
    borderRadius: 5,
  },
  textStyle: {
    fontSize: 15, 
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10
  }
});
