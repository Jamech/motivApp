import { Button, StyleSheet, Text, TouchableOpacity, View, Animated, ImageBackground  } from 'react-native' 
import React, { useEffect, useState, useRef } from 'react'
import quoteData from './components/quoteData.json'
import { StatusBar } from 'expo-status-bar'

const App = () => {

    const [quote, setQuote] = useState(null)
    const fadeAnim = useRef(new Animated.Value(0)).current;

    const getRandomQuote = () => {
        const random = quoteData[Math.floor(Math.random() * quoteData.length)];
        setQuote(random);
        animateQuote(); // Trigger animation whenever new quote is fetched
    };

    const animateQuote = () => {
        fadeAnim.setValue(0);
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
        }).start();
    }
    useEffect(() => {
        getRandomQuote();
    },[])

  return (
     <>
        <ImageBackground
        source={require('./assets/background.jpg')}
        style={styles.background}
        >
        <StatusBar style="light" />
        <View style={styles.container}>
            
            {quote && (
                <Animated.View style={[styles.quoteCard, {opacity: fadeAnim}]}>
                    <Text style={styles.text}>"{quote.text}"</Text>
                    <Text style={styles.author}>- {quote.author}</Text>
                </Animated.View> 
            )}
            <TouchableOpacity style={styles.btn} onPress={getRandomQuote}>
                <Text style={styles.btnText}>New quote</Text>
            </TouchableOpacity>
        </View>
        </ImageBackground>
    </>

  )

}

export default App

const styles = StyleSheet.create({
      background: {
    flex: 1,
    resizeMode: 'cover',
  },
    container:{
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    quoteCard: {
        padding: 25,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.4,
        shadowRadius: 10,
        elevation: 8,
        width: '100%',
        alignItems: 'center',
        marginBottom: 30,
    },
    text: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        fontStyle: 'italic',
        lineHeight: 32,
    },
     author: {
        marginTop: 15,
        fontSize: 18,
        color: '#ccc',
        fontWeight: '400',
        textAlign: 'center',
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
        elevation: 5,
        width: '70%',
        alignItems: 'center'
    },
    btnText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center'
}


})