import { FlatList, SafeAreaView, StyleSheet, Text, View, Dimensions, Image, TouchableOpacity } from 'react-native'
import { SvgXml } from 'react-native-svg';
import React, { useRef, useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import OnboardingOne from "../common/image/OnboardingOne.js"
import OnboardingTwo from "../common/image/OnboardingTwo.js"
import OnboardingThree from "../common/image/OnboardingThree.js"
import { DARK_THEME, NEUTRAL } from '../common/color'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
  {
    id : 1,
    title : "Welcome",
    desc: "One of the oldest world games now available on your smartphone device!",
    img: <OnboardingOne   />
  },
  {
    id : 2,
    title : "Compete",
    desc: "Play the game with your friends, and prove that you’re a worthy opponent!",
    img: <OnboardingTwo  />
  },
  {
    id : 3,
    title : "Scoreboard",
    desc: "Earn points and make your own way to the top of the scoreboard!",
    img: <OnboardingThree  />
  }
]

const OnboardingScreen = () => {

  const flatlistRef = useRef()
  const screenWidth = Dimensions.get("window").width
  const[activeIndex, setActiveIndex] = useState(0)
  const navigation = useNavigation();

  const getItemLayout = (data, index) => ({
    length: screenWidth,
    offset: screenWidth * index,
    index: index
  })

  // Handle Scroll 
  const handleScroll = (event) => {
    const scrollPosition = event.nativeEvent.contentOffset.x
    let index = scrollPosition / screenWidth;
    index = Math.ceil(index)
    setActiveIndex(index)
  }

  const handleNext = async() => {
    if (activeIndex < DATA.length - 1) {
      setActiveIndex(activeIndex + 1);
      flatlistRef.current.scrollToIndex({ animated: true, index: activeIndex + 1 });
    }else {
      // Navigate to the login screen when reaching the end of the onboarding
      // Replace 'LoginScreen' with the name of your login screen component
      try {
        await AsyncStorage.setItem('@has_seen_onboarding', 'true');
        navigation.navigate('register');
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
      flatlistRef.current.scrollToIndex({ animated: true, index: activeIndex - 1 });
    }
  };

  // display data 
  const renderItem = ({item, index}) => {
    return(
        <View style={{width: screenWidth, alignItems: 'center', top: 180}}>
            <View style={{marginBottom: 40}}>
              {item.img}
            </View>
            
            <Text style={{color: NEUTRAL.gray, fontSize: 24, marginTop: 38, fontFamily: "Roboto-Medium"}}>{item.title}</Text>
            <Text style={{color: NEUTRAL.gray, marginTop: 15, textAlign: 'center', paddingHorizontal: 20, lineHeight: 15, fontSize: 16, fontFamily: "Roboto-Regular"}}>{item.desc}</Text>
        </View>
    )
  }

  //render Dot Indicators
  const renderDotIndicators = () => {
    return DATA.map((dot, index) => {
        // if the active index === index 
        if(activeIndex === index){
            return(
                <View style={{backgroundColor: DARK_THEME.blue, height: 12, width: 12, borderRadius: 5, marginHorizontal: 6}}>
                </View>
            )
        }
        else{
            return(
                <View key={index} style={{backgroundColor: DARK_THEME.bark_blue, height: 12, width: 12, borderRadius: 5, marginHorizontal: 6}}>         
                </View>
            )
        }
    })
  }

  return (
    <View style={styles.onboard}>
      <SafeAreaView style={styles.onboardArea}>

        <FlatList
          data={DATA}
          ref={flatlistRef}
          getItemLayout={getItemLayout}
          renderItem={renderItem} 
          horizontal={true}
          pagingEnabled={true}
          onScroll={handleScroll}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />

        <View style={styles.boardNav}>
          <View>
            {activeIndex !== 0 && (
              <TouchableOpacity onPress={handleBack} >
                <Text style={[styles.nextButtonText, {color: NEUTRAL.darker_gray}]}>Back</Text>
              </TouchableOpacity>
            )}
          </View>
          
          <View style={{flexDirection: 'row', justifyContent: 'center', marginVertical: 50}}>
            {renderDotIndicators()}
          </View>

          <View>
            {activeIndex !== DATA.length && (
              <TouchableOpacity onPress={handleNext} >
                <Text style={styles.nextButtonText}>{activeIndex === DATA.length - 1 ? 'Login' : 'Next'}</Text>
              </TouchableOpacity>
            )}
          </View>

        </View>

      </SafeAreaView>
      
    </View>
  )
}

export default OnboardingScreen

const styles = StyleSheet.create({
  onboard: {
    flex: 1,
    backgroundColor: DARK_THEME.dark
  },
  onboardArea: {
    flex: 1,
    alignItems: "center"
  },
  boardNav: {
    width: "100%",
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  nextButtonText: {
    fontSize: 14,
    fontFamily: "Roboto-Medium",
    color: NEUTRAL.gray,
  }
})