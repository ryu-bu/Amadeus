import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function MapScreen() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Integrate Google Map with filtering here.</Text>
        </View>
      </SafeAreaView>
    )
  }