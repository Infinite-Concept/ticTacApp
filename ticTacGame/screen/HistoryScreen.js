import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { DARK_THEME, NEUTRAL, LIGHT_THEME } from '../common/color'
import Calender from "../common/image/Calendar"
import BackArrow from "../common/image/BackArrow"
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';
import axios from 'axios'
import { useLogin } from '../context/LoginProvider'
import { envValue } from '../env'

const HistoryScreen = () => {

    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const navigation = useNavigation();
    const {profile } = useLogin();
    const[history, setHistory] = useState([])
    const [filteredHistory, setFilteredHistory] = useState([]);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };
    
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };
    
    const handleConfirm = (date) => {
        hideDatePicker();
        setSelectedDate(date);
        filterHistory(date);
    };

    const filterHistory = (date) => {
        if (date) {
            const formattedDate = moment(date).format('DD.MM.YYYY');
            const filtered = history.filter(item => moment(item.date).format('DD.MM.YYYY') === formattedDate);
            setFilteredHistory(filtered);
            
        } else {
            setFilteredHistory(history); // If no date is selected, show all data
        }
    };

    const fetchData = async () => {
        try {
            let url = `${envValue}/history/get-history/${profile._id}`
            
            let response = await axios.get(url)
            let data = await response.data

            if(data.success){
                setHistory(data.message)
                setFilteredHistory(data.message);
            }
            
        } catch (error) {
            console.log(error);
            
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const showHistory = (item) => {

        const{date, playerTwoName, scored} = item.item

        const getColor = () => {
            if(scored == 'won'){
                return LIGHT_THEME.green
            }else if(scored == 'lost'){
                return LIGHT_THEME.red
            }else{
                return NEUTRAL.gray
            }
        }
        return (
        <View style={styles.historyItem}>
            <View style={styles.historyItemSec1}>
                <Text style={styles.historyItemText1}>{playerTwoName}</Text>
                <Text style={styles.historyItemText2}>{moment(date).format('DD.MM.YYYY')}</Text>
            </View>

            <Text style={[styles.historyItemText3, {color: getColor()}]}>{scored}</Text>
        </View>)
        
    }

  return (
    <View style={styles.homeScreen}>
        <View style={styles.historyTextCon}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
                <BackArrow color={NEUTRAL.gray}  />
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
        {
            filteredHistory.length > 0 ?
            <FlatList
                data={filteredHistory}
                keyExtractor={item => item.id}
                renderItem={showHistory}
                contentContainerStyle={{ paddingVertical: 20 }}
            />
            :
            <View style={{alignItems: "center", marginTop: 150}}>
                <Text style={styles.historyItemText1}>Empty</Text>
                <Text style={styles.historyItemText2}>Play some game.</Text>
            </View>
        }
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
        color: NEUTRAL.gray,
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
    },
    historyItem: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingBottom: 20,
        alignItems: "center"
    },
    historyItemSec1: {
        gap: 3
    },
    historyItemText1: {
        color: NEUTRAL.gray,
        fontSize: 16,
        fontFamily: "Roboto-Medium"
    },
    historyItemText2: {
        color: NEUTRAL.dark_gray,
        fontFamily: "Roboto-Regular"
    },
    historyItemText3: {
        fontSize: 14,
        textTransform: "uppercase",
        fontFamily: "Roboto-Bold"
    }
})