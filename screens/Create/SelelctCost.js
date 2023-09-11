import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, useColorScheme, Switch } from 'react-native';

export default function SelectCost({ route, navigation }) {
  const isDarkMode = useColorScheme() === 'dark';
  const initialNames = route.params.selectedNames;
  const [totalAmount, setTotalAmount] = useState('');
  const [isDollar, setIsDollar] = useState(true); // Switch between $ and %
  const [individualAmounts, setIndividualAmounts] = useState({});

  const handleAmountChange = (name, value) => {
    setIndividualAmounts(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (!isDollar) {
        const calculatedAmounts = {};
        for (let name in individualAmounts) {
            calculatedAmounts[name] = (parseFloat(totalAmount) * parseFloat(individualAmounts[name])) / 100;
        }
        console.log(totalAmount, calculatedAmounts);
    } else {
        console.log(totalAmount, individualAmounts);
    }
      // Pass the data to the next screen
      // navigation.navigate('NextScreenName', { totalAmount: totalAmount, ... });
  };
  useEffect(() => {
    // Force a re-render when the color scheme changes
    setTotalAmount(prev => prev);
  }, [isDarkMode]);

  return (
      <View style={isDarkMode ? styles.darkContainer : styles.lightContainer}>
          <Text style={isDarkMode ? styles.darkText : styles.lightText}>
              3. Enter the total bill amount
          </Text>

          <View style={styles.inputBar}>
              <TextInput 
                  style={[styles.amountInput, isDarkMode ? styles.darkText : styles.lightText]}
                  keyboardType="numeric"
                  value={totalAmount}
                  onChangeText={setTotalAmount}
                  placeholder="$0.00"
              />
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={isDarkMode ? styles.darkText : styles.lightText}>Please adjust the distribution accordingly</Text>
            <TouchableOpacity onPress={() => setIsDollar(!isDollar)}>
                <Text style={[isDarkMode ? styles.darkText : styles.lightText, { marginLeft: 10 }]}>{isDollar ? '$' : '%'}</Text>
            </TouchableOpacity>
        </View>
          <View style={styles.columnsContainer}>
            {initialNames.map((name, index) => (
                <View key={index} style={styles.column}>
                <View style={styles.greyCircle} />
                <Text style={[isDarkMode ? styles.darkText : styles.lightText, styles.nameText]}>{name}</Text>
                <TextInput 
                    //style={[styles.amountInput],style={isDarkMode ? styles.darkText : styles.lightText}}
                    style={[styles.amountInput, isDarkMode ? styles.darkText : styles.lightText]}
                    keyboardType="numeric"
                    value={individualAmounts[name] || ''}
                    onChangeText={(value) => handleAmountChange(name, value)}
                    placeholder={isDollar ? "$0.00" : "0.00%"}
                />
                </View>
            ))}
            </View>

          {totalAmount && (
              <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
                  <Text style={styles.buttonText}>Next</Text>
              </TouchableOpacity>
          )}
      </View>
  );
}




const styles = StyleSheet.create({
    lightContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#FFFFFF',
    },
    darkContainer: {
      flex: 1,
      padding: 20,
      backgroundColor: '#000000',
    },
    lightText: {
      color: '#000000',
      fontSize: 16,
      marginBottom: 10,
    },
    darkText: {
      color: '#FFFFFF',
      fontSize: 16,
      marginBottom: 10,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 25,
      paddingLeft: 15,
      paddingRight: 45, // to account for the icon
      marginBottom: 20,
    },
    searchInput: {
      flex: 1,
      height: 40,
    },
    searchIcon: {
      position: 'absolute',
      right: 15,
      width: 20,
      height: 20,
    },
    greyCircle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'grey',
      },
    
    columnsContainer: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: 20,
    },
    nameText: {
        marginLeft: 5, // This will give a 5px margin to the name from the grey circle
        flex: 1, // This will allow the name to take up the available space
    },

    column: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 3,
        height: 60,
        borderColor: 'grey',
        borderWidth: 1,
        borderRadius: 10,
        padding: 5,
        justifyContent: 'flex-start', // This will align items to the left
        width: '100%',
    },
    icon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    },
    checkbox: {
    marginLeft: 10,
    width: 24,
    height: 24,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    },
    checked: {
      width: 12,
      height: 12,
      borderRadius: 6,
      backgroundColor: '#000', // or any color you prefer
    },
    nextButton: {
      alignSelf: 'center',
      backgroundColor: 'blue',
      borderRadius: 25,
      paddingHorizontal: 100,
      paddingVertical: 20,
      position: 'absolute',
      bottom: 20,
    },
    buttonText: {
      color: 'white',
      fontSize: 16,
    },
  });