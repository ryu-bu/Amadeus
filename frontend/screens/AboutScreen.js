import * as React from 'react';
import { Text, View, SafeAreaView, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';

export default function AboutScreen() {
    return (
      <SafeAreaView style={{ flex: 1}}>
        <Image source={require('../src/images/tutor.png')} style={styles.image} resizeMode="cover"></Image>
        <View style={{ flex: .5, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.title}>Our Mission. {'\n'}</Text>
        <Text style={styles.body}>We are designed for musicians to connect and self-promote. Focused
on the Boston area, We aim to allow users to create a profile in order to showcase
themselves playing, tether those profiles to a musical group, and network with other musicians.
Through this platform, it can simplify communication with others and promote events to their network.</Text>
        </View>
      </SafeAreaView>
    )
  }

  const styles = StyleSheet.create({
  image: {
    flex: 1,
    alignItems: 'center',
    height: undefined,
    width: undefined
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    letterSpacing: 2,
  },
  body: {
    textAlign: 'auto',
    fontSize: 15,
    letterSpacing: 1,
  }
  });