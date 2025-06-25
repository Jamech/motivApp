import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import quoteData from './components/quoteData.json'

const App = () => {

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
                <Text>{quote.text}</Text>
                <Text>{quote.author}</Text>
            </> 
        )}
        <Button title='click' onPress={getRandomQuote}/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})