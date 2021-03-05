import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import MyHeader from '../components/MyHeader'
import db from '../Config'
import firebase from 'firebase'

export default class NotificationScreen extends React.Component {
    constructor() {
        super()
        this.state = {
          notifications: [],
          userId: firebase.auth().currentUser.email,
        }
    }
    getAllNotification = () => {
      db.collection("All_Notifications").where("notification_status","==","unread").where("target_user_id","==",this.state.userId)
      .onSnapshot(snapshot => {
      var count = []
      snapshot.docs.map(doc => {
        var data = doc.data()
        data["doc_id"] = doc.id
        count.push(data)
      })
      this.setState({
        notifications: count
      })
    })
    }
    componentDidMount() {
      this.getAllNotification()
    }
    renderItem({item}) => {
      <ListItem
        key = {i}
        title = {item.book_name}
        subtitle = {item.message}
        titleStyle= {{fontSize: 20, fontFamily: "Courier New"}}
        bottomDivider
      />
    }
    render() {
        return (
        <View style={styles.container}>
            <MyHeader title="Notifications"/>
            {this.state.notifications.length == 0 ? (<Text>You Have No Notifications.</Text>) : (
              <Flatlist 
                data={this.state.notification}
                renderItem={this.renderItem}
                keyExtractor={(item,index) => index.toString()}
            />
            )}
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
    alignItems: 'center',
    justifyContent: 'center',
  }
});
