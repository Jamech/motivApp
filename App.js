import { Button, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'

const quoteData = [
    {text:"hello I'm text 1", author:"Text1"},
    {text:"hello I'm text 2", author:"Text2"},
    {text:"hello I'm text 3", author:"Text3"}
]


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