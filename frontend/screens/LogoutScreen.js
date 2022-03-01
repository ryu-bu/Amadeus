import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView, Button, Alert } from 'react-native';

export default function LogoutScreen() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Image source={require('../src/images/logout.png')} style={styles.image} resizeMode="cover"></Image>
        <View style={{ flex: .4, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.title}>Are you sure you want to logout? {'\n'}</Text>
          <View style={styles.ButtonAlign}>
          <Button title="Cancel"
          onPress={() => Alert.alert('Cancel is pressed')} />
          <Button title="Yes"
          onPress={() => Alert.alert('Logout')} />
          </View>
        </View>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
    image: {
      flex: .5,
      alignItems: 'center',
      height: undefined,
      width: undefined
  },
    title: {
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 20,
    },
    ButtonAlign: {
      flexDirection:'row',
      justifyContent: 'space-between'
    }
    });