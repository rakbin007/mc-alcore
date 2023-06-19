import React, { useState, useEffect, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';
import Schedules from './ScheduleDB';

let countTot = 0;
let countBlue = 0;
let countRed = 0;
let countBlack = 0;
let scheduleDataChanged = false;


export function StaticMonthly ()  {
    scheduleDataChanged = true
    console.log(scheduleDataChanged)
};

const MainContents = () => {
    const [ctTot, setCtTot] = useState(0);
    const [ctBlue, setCtBlue] = useState(0);
    const [ctRed, setCtRed] = useState(0);
    const [ctBlack, setCtBlack] = useState(0);
    const [weekCal, setWeekCal] = useState(0);
    const [calLimit, setCalLimit] = useState(2700);
    const [markedDates, setMarkedDates] = useState([]);
    const [markedDatesObj, setMarkedDatesObj] = useState(null);
    const [calLimitColor, setcalLimitColor] = useState('black');

    useEffect(() => {
        AnalysisMonth();
        getThisWeekDates();
        getScheduleDate();
    }, []);

    const refreshData = () => {
        AnalysisMonth();
        getThisWeekDates();
        getScheduleDate();
    }

    const getScheduleDate = () => {
        const markedDates = [];
        const obj = {};
    
        Schedules.data.forEach((schedule) => {
          markedDates.push(schedule.date);
          obj[schedule.date] = { marked: true, dotColor: schedule.check };
        });
    
        const markedDatesObj = Object.assign({}, obj);
    
        setMarkedDates(markedDates);
        setMarkedDatesObj(markedDatesObj);
      };
    
      

    useEffect(() => {
        console.log('w')
        if (scheduleDataChanged === true){

            AnalysisMonth();
            getThisWeekDates();
            console.log("Doit")
            scheduleDataChanged =false;
        }
        // Update the state variables with the new values
        
    }, [scheduleDataChanged]);

    

    const AnalysisMonth = () => {
        let tmpTot = 0;
        let tmpBlue = 0;
        let tmpRed = 0;
        let tmpBlack = 0;
        let currentMonth = new Date().getMonth() + 1;

        Schedules.data.forEach(schedule => {
            let scheduleMonth = parseInt(schedule.date.split('-')[1]);

            if (currentMonth === scheduleMonth) {
            if (schedule.check === 'blue') {
                tmpBlue += 1;
            } else if (schedule.check === 'red') {
                tmpRed += 1;
            } else if (schedule.check === 'black') {
                tmpBlack += 1;
            }
            tmpTot += 1;
            }
        });
        countTot = tmpTot;
        countBlue = tmpBlue;
        countRed = tmpRed;
        countBlack = tmpBlack;
        setCtTot(countTot);
        setCtBlue(countBlue);
        setCtRed(countRed);
        setCtBlack(countBlack);
        console.log(countTot);
        console.log(countBlue);
    };

    const getThisWeekDates = () => {
        const today = new Date();
        const currentDay = today.getDay(); // 0 (Sunday) to 6 (Saturday)
        const startDate = new Date(today); // Copy today's date
        startDate.setDate(startDate.getDate() - currentDay); // Set startDate to the beginning of the week
        const dates = [];

        let totalCalorie = 0;
    
        for (let i = 0; i < 7; i++) {
          const date = new Date(startDate);
          date.setDate(startDate.getDate() + i); // Add days to startDate to get each date of the week
          dates.push(date.toISOString().split('T')[0]);
        }
        
        Schedules.data.forEach(schedule => {
            dates.map(function(date) {
                if (date === schedule.date)
                {
                    totalCalorie += (schedule.calorie * schedule.capacity / 100);
                }
            })
        });

        setWeekCal(totalCalorie)
        console.log(weekCal)
        if (weekCal > calLimit)
        {
            setcalLimitColor('red')
        }
    };
    

    
        

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'white', flex: 1, margin: 15 }}>
        <View style={{flexDirection: 'row'}}>
            <Text style={styles.mainText}>Alcore</Text>
            <View style={{marginLeft: 100, marginTop: 25, justifyContent: 'center'}}>
            <TouchableOpacity onPress={() => refreshData()} style={styles.buttonStyle}>
                <Text>Refresh</Text>
            </TouchableOpacity>
            </View>
            
        </View>
        <View style={{ height: 10 }}></View>
        <View>
          <Text style={styles.textView}>Monthly Achievements</Text>
        </View>
        <View style={styles.monthAchiveView}>
            <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{ctTot}</Text>
            <Text style={styles.miniText}>total</Text>
            </View>
            
            <View style={styles.divider} />
            <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'blue' }}>{ctBlue}</Text>
            <Text style={styles.miniText}>keep</Text>
            </View>
            
            <View style={styles.divider} />
            <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'red' }}>{ctRed}</Text>
            <Text style={styles.miniText}>miss</Text>
            </View>
            
            <View style={styles.divider} />
            <View>
            <Text style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center', color: 'gray' }}>{ctBlack}</Text>
            <Text style={styles.miniText}>other</Text>
            </View>
            
        </View>
        <View>
          <Text style={styles.textView}>Weekly Calorie Intake</Text>
        </View>
        <View style={styles.monthAchiveView}>
            <View>
                <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: 'black' }}>{weekCal} kcal</Text>
                <Text style={styles.miniText}>weekly</Text>
            </View>
            
            <View style={styles.weekdivider} />
            <View>
            <Text style={{ fontSize: 22, fontWeight: 'bold', textAlign: 'center', color: calLimitColor }}>2700 kcal</Text>
            <Text style={styles.miniText}>recommended</Text>
            </View>
        </View>
        <View>
          <Text style={styles.textView}>Monthly Calendar Preview</Text>
        </View>
        <View style={styles.modalView}>
            <Calendar style={styles.calendar} markedDates={markedDatesObj}/>
        </View>
      </View>
    </View>
  );
}

export default function MainScreen({ navigation }) {
    return <MainContents />
}

const styles = StyleSheet.create({
    buttonStyle: {
        height: 50,
        width: 100,
        alignSelf: 'flex-end',
        marginHorizontal: 0,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        borderRadius: 30,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    },
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  calendar: {
    width: '100%',
    justifyContent: 'center'
  },
  monthAchiveView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 75,
    width: '100%',
    padding: 10,
    margin: 0,
    marginBottom: 40,
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
  mainText: {
    fontSize: 40,
    marginBottom: 15,
    marginTop: 30,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  divider: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 30,
    opacity: 0.5,
  },
  weekdivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 30,
    opacity: 0.5,
  },
  miniText: {
    fontSize: 8,
    textAlign: 'center', 
    color: 'black'
  },
  modalView: {
    flex: 1,
    margin: 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 0,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
