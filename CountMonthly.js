import {View, Text, StyleSheet} from "react-native";
import { useState, useEffect } from "react";
import Schedules from "./ScheduleDB";

function StaticMonthly (){
    const [countTot, setCountTot] = useState(0);
    const [countBlue, setCountBlue] = useState(0);
    const [countRed, setCountRed] = useState(0);
    const [countBlack, setCountBlack] = useState(0);

    let tmpTot = 0;
    let tmpBlue = 0;
    let tmpRed = 0;
    let tmpBlack = 0;
    let currentMonth = new Date().getMonth();
    console.log(currentMonth);
    console.log(typeof(currentMonth));
    Schedules.data.map(function(schedule) {
        let scheduleMonth = schedule.date.split('-')[1];
        if (currentMonth === scheduleMonth){
            if (schedule.check === 'blue'){
                tmpBlue += 1;
            }
            else if (schedule.check === 'red'){
                tmpRed += 1;
            }
            else if (schedule.check === 'black'){
                tmpBlack += 1;
            }
            tmpTot += 1;
        }
    })
    setCountTot(tmpTot);
    setCountBlue(tmpBlue);
    setCountRed(tmpRed);
    setCountBlack(tmpBlack);
    // console.log(countBlack);
    return (
        <View>
            <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'black'}}>{countTot}</Text>
            <View style={styles.divider} />
            <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'blue'}}>{countBlue}</Text>
            <View style={styles.divider} />
            <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'red'}}>{countRed}</Text>
            <View style={styles.divider} />
            <Text style={{fontSize: 17, fontWeight: 'bold', textAlign: 'center', color: 'gray'}}>{countBlack}</Text>
        </View>
    );
}



const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      paddingVertical: 20,
    },
    monthAchiveView: {
      alignItems: 'center',
      justifyContent: 'center',
      height: 75,
      width: '100%',
      padding: 10,
      margin: 0,
      marginBottom: 20,
      backgroundColor: 'white',
      borderRadius: 100,
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      flexDirection: 'row',
    },
    textView: {
        fontSize: 20,
        marginBottom: 15,
        textAlign: 'left',
        color: 'black',
        fontWeight: 'bold',
    },
    divider: {
        width: 1,
        height: '100%',
        backgroundColor: '#ccc',
        marginHorizontal: 20,
        opacity: 0.5,
    },
  });

export default StaticMonthly