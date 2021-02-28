import * as React from 'react';
import {
  TouchableOpacity,
  TextInput,
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import db from '../Config';
import firebase from 'firebase';

export default class WelcomeScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      EmailId: '',
      Password: '',
      Adress: '',
      firstName: '',
      lastName: '',
      contactInfo: '',
      confirmPassword: '',
      isModalVisible: false
    };
  }
  showModal = () => {
    return(
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.isModalVisible}
      >
        <View style={styles.center}>
          <ScrollView>
            <KeyboardAvoidingView>
              <Text style={styles.text}>Registeration</Text>
              <TextInput
                placeholder={'First Name'}
                style={styles.textInput1}
                onChangeText={(text) => {
                  this.setState({
                    firstName: text,
                });}}>
                </TextInput>
                <TextInput
                placeholder={'Last Name'}
                style={styles.textInput1}
                onChangeText={(text) => {
                  this.setState({
                    lastName: text,
                });}}>
                </TextInput>
                <TextInput
                placeholder={'Address'}
                multiline={true}
                style={styles.textInput2}
                onChangeText={(text) => {
                  this.setState({
                    Adress: text,
                });}}>
                </TextInput>
                <TextInput
                placeholder={'Phone Number'}
                keyboardType={'numeric'}
                style={styles.textInput1}
                onChangeText={(text) => {
                  this.setState({
                    contactInfo: text,
                });}}>
                </TextInput>
                <TextInput
                  placeholder={'Email ID'}
                  style={styles.textInput1}
                  keyboardType="email-address"
                  onChangeText={(text) => {
                    this.setState({
                      EmailId: text,
                    });
                  }}>
                </TextInput>
                <TextInput
                  placeholder={'Password'}
                  style={styles.textInput1}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      Password: text,
                    });
                  }}>
                </TextInput>
                <TextInput
                  placeholder={'Confirm Password'}
                  style={styles.textInput1}
                  secureTextEntry={true}
                  onChangeText={(text) => {
                    this.setState({
                      confirmPassword: text,
                    });
                  }}>
                </TextInput>
                <TouchableOpacity style={styles.register} onPress={() => {this.userSignUp(this.state.EmailId,this.state.Password,this.state.confirmPassword)}}>
                  <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancel} onPress={() => {
                  this.setState({
                    isModalVisible: false
                  })
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
      </Modal>
    )
  }
  login = async (Id, Password) => {
    if (Id && Password) {
      try {
        var response = await firebase
          .auth()
          .signInWithEmailAndPassword(Id, Password);
        if (response) {
          alert("Signed In!")
          this.props.navigation.navigate('Donate')
        }
      } catch (error) {
        alert(error.code);
      }
    } else {
      alert("Enter a Email ID and the Password.")
    }
  }
  userSignUp = (Id,Password,Confirm) => {
    if(Confirm == Password) {
      firebase.auth().createUserWithEmailAndPassword(Id,Password)
      .then((item) => {
        db.collection("Users").add({
          first_name: this.state.firstName,
          last_name: this.state.lastName,
          address: this.state.Adress,
          contact_Info: this.state.contactInfo,
          email_id: this.state.EmailId,
        })
        alert("User was added succesfully")
      })
      .catch(function(error) {
        alert(error.message)
      })
    } else {
      alert("Both passwords don't match!")
    }
  }
  render() {
    if(this.state.isModalVisible) {
      return(
        <View style={styles.center1}>{this.showModal()}</View>
      )
    } else {
      return (
        <View style={styles.center}>
          <Text style={styles.login}>Login with your username and password</Text>
          <TextInput
            placeholder={'Email ID'}
            style={styles.textInput}
            keyboardType="email-address"
            onChangeText={(text) => {
              this.setState({
                EmailId: text,
              });
            }}></TextInput>
          <TextInput
            placeholder={'Password'}
            style={styles.textInput}
            secureTextEntry={true}
            onChangeText={(text) => {
              this.setState({
                Password: text,
              });
            }}></TextInput>
          <TouchableOpacity
            style={styles.LogInButton}
            onPress={() => {
              this.login(this.state.EmailId, this.state.Password);
            }}>
            <Text style={styles.ScanButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.SignUpButton}
            onPress={() => {
              this.setState({
                isModalVisible: true
              })
            }}>
            <Text style={styles.ScanButtonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 2,
    width: '30%',
    height: 50,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
  },
  center1: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center'
  },
  center: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  ScanButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  LogInButton: {
    marginTop: 10,
    backgroundColor: '#e89e99',
    width: 100,
    height: 50,
    alignText: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: -100
  },
  SignUpButton: {
    marginTop: -50,
    backgroundColor: '#e89e99',
    width: 100,
    height: 50,
    alignText: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 110
  },
  login: {
    fontSize: 16,
    marginTop: 20,
    fontFamily: 'Courier New',
    fontWeight: 'bold'
  },
  text: {
    fontSize: 16,
    marginTop: 20,
    marginLeft: 70,
    fontFamily: 'American Typewriter'
  },
  textInput1: {
    borderWidth: 2,
    width: '75%',
    height: 30,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 30,
  },
  textInput2: {
    borderWidth: 2,
    width: '75%',
    height: 50,
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 20,
    marginTop: 30,
    marginLeft: 30,
  },
  register: {
    marginTop: 10,
    marginLeft: -100,
    backgroundColor: '#e89e99',
    width: 60,
    height: 30,
    alignText: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5
  },
  cancel: {
    marginTop: -30,
    marginLeft: 100,
    backgroundColor: '#e89e99',
    width: 60,
    height: 30,
    alignText: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 5
  }
});
