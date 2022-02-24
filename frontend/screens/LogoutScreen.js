import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function LogoutScreen() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>This should be the logout screen.</Text>
        </View>
      </SafeAreaView>
    )
  }