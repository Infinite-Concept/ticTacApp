import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DARK_THEME, NEUTRAL } from '../common/color'
import Calender from "../common/image/Calendar"
import BackArrow from "../common/image/BackArrow"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios'
import { useLogin } from '../context/LoginProvider'

const HistoryScreen = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigation = useNavigation();
    const {profile } = useLogin();
    const[history, setHistory] = useState([])

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
    setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    };

    const fetchData = async () => {
        try {
            let response = await axios.get(`http://192.168.1.36:5678/history/get-history/${profile._id}`)
            let data = await response.data

            console.log(data);
            if(data.success){
                setHistory(data.message)
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const showHistory = (item) => {
        console.log(item.item);
        const{date, playerTwoName, scored} = item.item
        return (
        <View>

        </View>)
        
    }

  return (
    <View style={styles.homeScreen}>
        <View style={styles.historyTextCon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackArrow color={NEUTRAL.dark_gray}  />
            </TouchableOpacity>
            <Text style={styles.historyText}>Game History</Text>
        </View>

        <TouchableOpacity style={styles.calenderContainer} onPress={showDatePicker}>
            <Calender />
            <Text style={styles.calenderContainerText}> {selectedDate
          ? `${moment(selectedDate).format('MMMM Do YYYY hh:mm')}`
          : 'Choose Date'}</Text>
        </TouchableOpacity>

        <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
        />

        <ScrollView>
                {
                    history ?
                    <>
                        <FlatList
                            data={history}
                            keyExtractor={item => item.id}
                            renderItem={showHistory}
                        />
                    </>
                    :
                    <>
                    <Text>No data</Text>
                    </>
                }
        </ScrollView>
    </View>
  )
}

export default HistoryScreen

const styles = StyleSheet.create({
    homeScreen: {
        flex: 1,
        backgroundColor: DARK_THEME.dark,
        paddingTop: 20,
        paddingHorizontal: 20
    },
    historyTextCon: {
        marginBottom: 30,
        flexDirection: "row",
        alignItems: "center",
        gap: 20
    },
    historyText: {
        color: NEUTRAL.dark_gray,
        fontFamily: 'Roboto-Medium',
        fontSize: 24
    },
    calenderContainer: {
        borderWidth: 2,
        borderColor: DARK_THEME.bark_blue,
        flexDirection: "row",
        paddingHorizontal: 20,
        paddingVertical: 10,
        gap: 15,
        alignItems: "center"
    },
    calenderContainerText: {
        fontFamily: 'Roboto-Regular',
        fontSize: 14,
        color: NEUTRAL.darker_gray
    }
})