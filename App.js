import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import quoteData from './components/quoteData.json'
import { StatusBar } from 'expo-status-bar'

const App = () => {

    <StatusBar />

    const [quote, setQuote] = useState(null)

    const getRandomQuote = () => {
        const random = quoteData[Math.floor(Math.random()*quoteData.length)]
        setQuote(random)
    }

    useEffect(() => {
        getRandomQuote();
    },[])

  return (
    <View style={styles.container}>
        {quote && (
            <>
                <Text style={styles.text}>"{quote.text}"</Text>
                <Text style={styles.author}>- {quote.author}</Text>
            </> 
        )}
        <TouchableOpacity style={styles.btn} onPress={getRandomQuote}>
            <Text style={styles.btnText}>New quote</Text>
        </TouchableOpacity>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text:{
        margin: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        fontFamily: 'TimesNewRoman',
        fontSize: 20,
    },
    author: {
        marginBottom: 10,
        fontWeight: '500',
        fontFamily: 'TimesNewRoman',
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#000',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
}


})