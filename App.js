import React, { useState } from 'react';
import { StyleSheet, TextInput, Image, View, Text, TouchableOpacity, Linking, useEffect } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import detailScreen from './loginDetail';
import { useDispatch } from 'react-redux';
import { setDarkmode } from './settingAction';
const lastStateKey = 'LAST_STATE';

const getLastState = async (value) => {
  try {
    const lastSate = await AsyncStorage.getItem(value)
    return lastSate != null ? JSON.parse(lastSate) : null;
  } catch (e) {
    console.log(e)
  }
}

const Stack = createNativeStackNavigator();
const App = () => {
  const dispatcher = useDispatch();

  getLastState(lastStateKey).then(value => {
    dispatcher(setDarkmode(value.lastStateValue));
  })
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='LoginScr'>
        <Stack.Screen name='LoginScr' component={LoginScreen} options={{ title: 'Log In' }} />
        <Stack.Screen name='RegisterScr' component={RegisterScreen} options={{ title: 'Register' }} />
        <Stack.Screen name='LoginDetailScr' component={detailScreen} options={{ title: 'Detail' }, { headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

/////////////////////
///Register Screen///
/////////////////////

const storage = async (user, pass) => {
  try {
    const JsonObject = JSON.stringify({ userName: user, Password: pass })
    console.log(JsonObject)
    await AsyncStorage.setItem(user, JsonObject)
  } catch (e) {
    console.log(e)
  }
}

const getUserAndPass = async (value) => {
  try {
    const userInfor = await AsyncStorage.getItem(value)
    return userInfor != null ? JSON.parse(userInfor) : null;
  } catch (e) {
    console.log(e)
  }
}

const RegisterScreen = ({ navigation }) => {
  const [regPass, setRegPass] = useState('');
  const [regEmail, setRegMail] = useState('');

  const checkInforRegister = () => {
    if (regEmail === '') {
      console.log('email is not empty!');
      return false;
    }
    if (regEmail.match(/\s/)) {
      console.log('email is not contain any space!');
      return false;
    }
    if (regPass === '') {
      console.log('password is not empty!');
      return false;
    }
    if (regPass.length < 8) {
      console.log("password's length must bigger than 8");
      return false;
    }
    return true;
  }

  const registerSuccess = () => {
    if (checkInforRegister()) {
      alert('Register successful!');
      storage(regEmail, regPass);
      navigation.replace('LoginScr');
    }
  }
  return (<View style={{ flex: 1 }}>
    <Image source={{ uri: 'https://isoftglobe.com/wp-content/uploads/2021/02/react-native.png', flex: 1, height: 250 }} />
    <View>
      <Text style={styles.headertext}>Sign In</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity>
        <View style={styles.socialLoginItem}>
          <Icon name='logo-google' size={30} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.socialLoginItem}>
          <Icon name='logo-facebook' size={30} />
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.socialLoginItem}>
          <Icon name='logo-apple' size={30} />
        </View>
      </TouchableOpacity>
    </View>
    <View style={{ alignItems: 'center' }}>
      <Text >Or register with Email...</Text>
    </View>
    <View>
      <View style={styles.inputContainerStyle}>
        <Icon style={styles.iconStyle} name='at' color='grey' size={20} />
        <TextInput
          placeholder="Email ID"
          onChangeText={mail => setRegMail(mail)}
        />
      </View>
      <View style={styles.inputContainerStyle}>
        <Icon style={styles.iconStyle} name='lock-closed-outline' size={20} color='grey' />
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={pass => setRegPass(pass)}
        />
      </View>
    </View>
    <TouchableOpacity onPress={registerSuccess}>
      <View style={styles.button}>
        <Text>Register</Text>
      </View>
    </TouchableOpacity>
  </View>);
}
//////////////////
///login Screen///
//////////////////

const LoginScreen = ({ navigation }) => {
  const [mail, setMail] = useState('');
  const [pass, setPass] = useState('');

  const loginFunction = () => {
    getUserAndPass(mail).then(userInfor => {
      console.log(1);
      if (userInfor !== null) {
        if (pass == userInfor.Password) {
          navigation.replace('LoginDetailScr');
        }
      }
    });
  };

  const socialLoginFunc = async () => {
    alert('Login!');
    var user = await getUserAndPass('test');
    console.log(user);
  };

  return (
    <View style={{ flex: 1 }}>
      <Image source={{
        uri: 'https://isoftglobe.com/wp-content/uploads/2021/02/react-native.png', flex: 1, height: 250,
      }}
      />
      <Text style={styles.headertext}>Login</Text>
      <View style={styles.inputContainerStyle}>
        <Icon style={styles.iconStyle} name='at' color='grey' size={20} />
        <TextInput
          placeholder="Email ID"
          onChangeText={mail => setMail(mail)}
        />
      </View>
      <View style={styles.inputContainerStyle}>
        <Icon style={styles.iconStyle} name='lock-closed-outline' size={20} color='grey' />
        <TextInput
          secureTextEntry
          placeholder="Password"
          onChangeText={pass => setPass(pass)}
        />
        <Text style={{ color: 'blue', marginTop: 13, marginLeft: '60%' }}
          onPress={() => Linking.openURL('#')}>Forgot?</Text>
      </View>
      <TouchableOpacity style={styles.button} onPress={loginFunction}><Text>Login</Text></TouchableOpacity>

      <View >
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Or, Login with...</Text>
      </View>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity onPress={socialLoginFunc} >
          <View style={styles.socialLoginItem} >
            <Icon name='logo-google' size={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={socialLoginFunc}>
          <View style={styles.socialLoginItem}>
            <Icon name='logo-facebook' size={30} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={socialLoginFunc}>
          <View style={styles.socialLoginItem}>
            <Icon name='logo-apple' size={30} />
          </View>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
        <Text>New to iThingLogistics? <Text style={{ color: 'blue' }} onPress={() => { navigation.navigate('RegisterScr') }}>Register</Text></Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headertext: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 30
  },
  inputContainerStyle: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: "grey",
    marginLeft: 10,
    marginRight: 10
  },
  iconStyle: {
    marginTop: 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#89CFF0',
    borderRadius: 10,
    padding: 10,
    marginTop: 25,
    marginLeft: 10,
    marginRight: 10
  },
  socialLoginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 50
  },
  socialLoginItem: {
    padding: 15,
    borderWidth: 1,
    borderRadius: 10,
    margin: 10
  }
});


export default App;
