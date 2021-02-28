import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { ListItem } from 'react-native-elements'
import db from '../config'
import firebase from 'firebase'
import MyHeader from '../components/MyHeader'

export default class ExchangeScreen extends React.Component {
  constructor() {
    super()
    this.state = {
      requestedItems: []
    }
  }
  getItems = () => {
    db.collection("Requested_items").onSnapshot((snapshot) => {
      var items = snapshot.docs.map((doc) => doc.data())
      this.setState({
        requestedItems: items
      })
    })
  }
  componentDidMount() {
    this.getItems()
  }
  renderItem = ({item,i}) => {
    return(
      <ListItem
        key = {i}
        title = {item.itemName}
        subtitle={item.description,item.reason}
        titleStyle= {{fontSize: 20, fontFamily: "Courier New"}}
        rightElement = {<TouchableOpacity onPress={() => {
          this.props.navigation.navigate("Details",{'Data':item})
        }} style={styles.details}>
          <Text style={styles.textStyle}>View Details</Text>
        </TouchableOpacity>}
          <Text style={styles.textStyle}>View Details</Text>
        </TouchableOpacity>}
        bottomDivider
      />
    )
  }
  keyExtractor = (item, index) => index.toString()
  render() {
    return (
      <View style={styles.container}>
        <MyHeader
            title="Donate"
        ></MyHeader>
        <View>
          {this.state.requestedBooks.length == 0 ? 
          (<Text>Loading...</Text>): 
          (<FlatList 
            data={this.state.requestedBooks}
            renderItem={this.renderItem}
            keyExtractor={this.keyExtractor}
          ></FlatList>)}
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
  details: {
    width: 100,
    height: 40,
    backgroundColor: "#94ebaf",
    borderRadius: 5,
    alignText: 'center'
  },
  textStyle: {
    fontSize: 15, 
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: 10
  }
});
