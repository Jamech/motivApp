import { Button, StyleSheet, Text, TouchableOpacity, View, Animated, ImageBackground  } from 'react-native' 
import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { useEffect, useState, useRef } from 'react'
import quoteData from './components/quoteData.json'
import { StatusBar } from 'expo-status-bar'
import { Modal, FlatList } from 'react-native'

const App = () => {

    const [quote, setQuote] = useState(null)
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const [favorites, setFavorites] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);
    const FAVORITES_KEY = '@favorite_quotes';

    const loadFavorites = async () => {
        try {
        const saved = await AsyncStorage.getItem(FAVORITES_KEY);
        if (saved) {
            setFavorites(JSON.parse(saved));
        }
        } catch (e) {
        console.log('Failed to load favorites:', e);
        }
    };

        const saveFavorites = async (newFavorites) => {
    try {
        await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(newFavorites));
    } catch (e) {
        console.log('Failed to save favorites:', e);
    }
    };

    const toggleFavorite = () => {
    if (!quote) return;

    const exists = favorites.find((q) => q.text === quote.text);
    let updatedFavorites;

    if (exists) {
        // Remove it
        updatedFavorites = favorites.filter((q) => q.text !== quote.text);
    } else {
        // Add it
        updatedFavorites = [...favorites, quote];
    }

    setFavorites(updatedFavorites);
    saveFavorites(updatedFavorites);
    };


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
        loadFavorites();
        getRandomQuote();
    },[])

  return (
     <>
        <ImageBackground
        source={require('./assets/background1.jpg')}
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
            <TouchableOpacity
            style={[
                styles.btn,
                { backgroundColor: favorites.find((q) => q.text === quote?.text) ? '#e74c3c' : '#000' },
            ]}
            onPress={toggleFavorite}
            >
                <Text style={styles.btnText}>
                    {favorites.find((q) => q.text === quote?.text) ? 'Remove Favorite' : 'Add to Favorites'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.btn, { backgroundColor: '#2980b9', marginTop: 10 }]}
                        onPress={() => setModalVisible(true)}>
        <Text style={styles.btnText}>View Favorites ({favorites.length})</Text>
            </TouchableOpacity>


        </View>
        </ImageBackground>

        <Modal visible={modalVisible} animationType="slide"onRequestClose={() => setModalVisible(false)}>
            <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Favorite Quotes</Text>

                {favorites.length === 0 ? (
            <Text style={styles.noFavoritesText}>No favorite quotes yet.</Text>
            ) : (
            <FlatList data={favorites} keyExtractor={(item) => item.text}renderItem={({ item }) => (
          <View style={styles.favoriteItem}>
            <Text style={styles.text}>"{item.text}"</Text>
            <Text style={styles.author}>- {item.author}</Text>
          </View>
        )}
      />
    )}

    <TouchableOpacity
      style={[styles.btn, { marginTop: 20 }]}
      onPress={() => setModalVisible(false)}
    >
      <Text style={styles.btnText}>Close</Text>
    </TouchableOpacity>
  </View>
</Modal>

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
    },
    modalContainer: {
    flex: 1,
    backgroundColor: '#111',
    padding: 20,
    paddingTop: 50,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#fff',
        textAlign: 'center',
    },
    noFavoritesText: {
        color: '#aaa',
        fontSize: 18,
        textAlign: 'center',
        marginTop: 40,
    },
    favoriteItem: {
        backgroundColor: 'rgba(255,255,255,0.05)',
        padding: 16,
        borderRadius: 15,
        marginBottom: 12,
    },



})