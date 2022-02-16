import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

const NestScreens = ({route}) => {
    return (
        <View style={styles.screen}>
            <Text style={styles.text}>falala</Text>
        </View>
    )
}


//            <Text style={styles.text}>{route.params.msg}</Text>

export default NestScreens

const styles = StyleSheet.create({
    screen:{
        flex:1,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#00000025',
    },
    text:{
        color:'#000',
        fontWeight:'700',
        fontSize:30
    },
})