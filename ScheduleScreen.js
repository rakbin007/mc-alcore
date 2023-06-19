import React, { useState, useRef, useEffect, settiem } from 'react';
import { View, TouchableOpacity, Text, Button, StyleSheet, ScrollView, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Calendar , CalendarList } from 'react-native-calendars';
import Modal from 'react-native-modal';
import Alcohols from './alcoholDB';
import Schedules from './ScheduleDB';
import { StaticMonthly } from './MainScreen';


const ScheduleScreen = ({ navigation }) => {
  return <ScheduleCalendar />;
};

const ScheduleCalendar = () => {
  
  const [selectedDate, setSelectedDate] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [scheduleName, setScheduleName] = useState('');
  const [pastEventVisible, setPastEventVisible] = useState(false);
  const [pastEventName, setPastEventName] = useState('');
  const [markedDates, setMarkedDates] = useState([]);
  const [markedDatesObj, setMarkedDatesObj] = useState(null);
  const [selectedImg, setselectedImg] = useState(null);
  const [selectedName, setselectedName] = useState('');
  const [calorie, setcalorie] = useState(0);
  const [capacity, setCapacity] = useState(100);
  const [totalCalorie, setTotalCalorie] = useState(0);
  const [yesButtonColor, setYesButtonColor] = useState('white');
  const [noButtonColor, setNoButtonColor] = useState('white');
  const [buttonsDisabled, setButtonsDisabled] = useState(false);

  

  const getScheduleDate = () => {
    const markedDates = [];
    const obj = {};

    Schedules.data.forEach((schedule) => {
      markedDates.push(schedule.date);
      obj[schedule.date] = { selected: true, selectedColor: schedule.check };
    });

    const markedDatesObj = Object.assign({}, obj);

    setMarkedDates(markedDates);
    setMarkedDatesObj(markedDatesObj);
  };

  useEffect(() => {
    getScheduleDate();
  }, []);

  useEffect(() => {
    if (calorie) {
      console.log(calorie);
    }
    else {
      console.log('No')
    }    
  }, [calorie]);
 

  

  

  const handleDatePress = (date) => {
    const currentDate = new Date().getTime();

    let isDate = false;

    Schedules.data.map(function(schedule) {
      if (date.dateString === schedule.date && date.timestamp < currentDate)
      {
        
        setSelectedDate(date.dateString);
        setPastEventVisible(true);
        checkPast(date.dateString);

        isDate = true;
      }
      else if (date.dateString === schedule.date && date.timestamp >= currentDate)
      {
        setSelectedDate(date.dateString);
        restoreParam(date.dateString);
        setModalVisible(true);  
        
        isDate = true;
      }
    })

    if (!isDate)
    {
      if (date.timestamp < currentDate ){

      }
      else if (date.timestamp >= currentDate) {
        console.log(typeof(date.dateString))
        initParam();
        setSelectedDate(date.dateString);
        setModalVisible(true);
      }
    }
  };

  const initParam = () => {
    console.log('init');
    setselectedImg(null);
    setselectedName('');
    setCapacity(100);
    setcalorie(0);
    setTotalCalorie(0);
    console.log(selectedName);
    console.log(capacity);
    console.log(calorie);
  }

  const restoreParam = (date) => {
    Schedules.data.map(function(schedule) {
      if (schedule.date === date)
      {
        
        setselectedImg((seletedImg) => schedule.img);
        setselectedName(schedule.alcohol);
        setCapacity(schedule.capacity);
        setcalorie(schedule.calorie);
        let tot = calorie * capacity / 100;
        setTotalCalorie(tot);
        console.log(schedule.alcohol);
        console.log(selectedName);
        console.log(schedule.capacity);
        console.log(capacity);
        console.log(schedule.calorie);
        console.log(calorie);
      }
    })
  }

  const checkPast = (date) => {
    Schedules.data.map(function(schedule) {
      if (schedule.date === date)
      {
        setselectedImg(schedule.img);
        setselectedName(schedule.alcohol);
        setCapacity(schedule.capacity);
        setcalorie(schedule.calorie);
        let tot = calorie * capacity / 100;
        setTotalCalorie(tot);
        if (schedule.check == 'blue'){
          setYesButtonColor('blue');
          setNoButtonColor('gray');
          setButtonsDisabled(true);
        }
        else if (schedule.check == 'red'){
          setYesButtonColor('gray');
          setNoButtonColor('red');
          setButtonsDisabled(true);
        }
        else if (schedule.check == 'black'){
          setYesButtonColor('white');
          setNoButtonColor('white');
          setButtonsDisabled(false);
        }
      }
    })
  };
  

  const handleSchedulePress = (name) => {
    StaticMonthly();
    // addDates('black');
    let pushingData = { date: selectedDate,
      alcohol: selectedName,
      calorie: calorie,
      capacity: capacity,
      img: selectedImg,
      check: 'black', //true, false, none
    }
    let isData = false;
    Schedules.data.map(function(schedule) {
      if (schedule.date === pushingData.date)
      {
        schedule.alcohol = pushingData.alcohol;
        schedule.calorie = pushingData.calorie;
        schedule.capacity = pushingData.capacity;
        schedule.img = pushingData.img;
        schedule.check = pushingData.check;
        isData = true;
      }
    })

    if (!isData)
    {
      Schedules.data.push(pushingData);
    }
    getScheduleDate();
    console.log(Schedules);
    
    setModalVisible(false);
  };


  const handleSelectAlcohol = (img, name, calorie) => {
    setselectedImg(img);
    setselectedName(name);
    setcalorie(calorie);
    let tot = calorie * capacity / 100;
    setTotalCalorie(tot)
    console.log(calorie);
  };

  const handleNumberChange = (number) => {
    setCapacity(number);
  };

  const handleSelect = () => {
    let tot = calorie * capacity / 100;
    setTotalCalorie(tot);
    
  };

  const handleYesButtonPress = () => {
    setYesButtonColor('blue');
    setNoButtonColor('gray');
    setButtonsDisabled(true);
    
    Schedules.data.map(function(schedule) {
      if (schedule.date === selectedDate)
      {
        schedule.check = 'blue';
      }
    })
    getScheduleDate('blue');
    StaticMonthly();
    setPastEventVisible(false);
    // console.log(Schedules.data);
  };

  const handleNoButtonPress = () => {
    setYesButtonColor('gray');
    setNoButtonColor('red');
    setButtonsDisabled(true);
    
    Schedules.data.map(function(schedule) {
      if (schedule.date === selectedDate)
      {
        schedule.check = 'red';
      }
    })
    getScheduleDate('red');
    StaticMonthly();
    setPastEventVisible(false);
  };

  

  const CreateButton = () => {
    return Alcohols.data.map(function(alcohol) {
      return (
        <TouchableOpacity
          key={alcohol.name}
          onPress={() => handleSelectAlcohol(alcohol.img, alcohol.name, alcohol.calorie)}
          style={styles.alcoholButtonContainer}
        >
          <Image
            style={{
              width: 100,
              height: 100,
              borderRadius: 30,
              overflow: 'visible',
              borderWidth: 2,
              borderColor: 'gray',
              backgroundColor: 'white'
            }}
            source={alcohol.img}
          />
          <Text style={styles.buttonTextB}>{alcohol.name}</Text>
        </TouchableOpacity>
      );
    });
  };
  

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <View style={{ backgroundColor: 'white', flex: 1, margin: 15 }}>
      <View>
            <Text style={styles.mainText}>Alcore</Text>
      </View>
      <View style={{alignItems: 'center'}}>
      <CalendarList onDayPress={handleDatePress} markedDates={markedDatesObj} style={{ height: '100%', width: '100%'}} />
      </View>
      

      <CustomModal isVisible={modalVisible} onClose={() => {setModalVisible(false) } } >
        <View>
          <Text style={styles.textView}>Select Alcohol</Text>
        </View>
        <View style={styles.scrollViewContainer}>
          <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.scrollViewContent}>
            <CreateButton />
          </ScrollView>
        </View>
        <View>
          <Text style={styles.textView}>Selected Alcohol</Text>
        </View>
        <View style={styles.defaultView}>
          <View style={{marginRight: 20}}>
            <Image
              style={{
                width: 100,
                height: 100,
                borderRadius: 30,
                overflow: 'visible',
                borderWidth: 2,
                borderColor: 'gray',
                backgroundColor: 'white',
              }}
              source={selectedImg}
            />
            <Text style={styles.textStyleB}>{selectedName}</Text>
          </View>
          <View style={styles.container}>
            <Text style={styles.label}>Select Capacity:</Text>
            <Picker
              style={styles.picker}
              selectedValue={capacity}
              onValueChange={handleNumberChange}
            >
              <Picker.Item label="100ml" value={100} />
              <Picker.Item label="50ml" value={50} />
              <Picker.Item label="150ml" value={150} />
              <Picker.Item label="200ml" value={200} />
              <Picker.Item label="300ml" value={300} />
              <Picker.Item label="400ml" value={400} />
              <Picker.Item label="500ml" value={500} />
              <Picker.Item label="600ml" value={600} />
              <Picker.Item label="700ml" value={700} />
              <Picker.Item label="800ml" value={800} />
              <Picker.Item label="900ml" value={900} />
              <Picker.Item label="1000ml" value={1000} />
            </Picker>
            <Button title="Select" onPress={handleSelect} />
          </View>
          
        </View>
        <View>
          <Text style={styles.textView}>Total Calorie Counting</Text>
        </View>
        <View style={styles.roundView}>
          <Text style={styles.numberText}>{totalCalorie}</Text>
        </View>
        <View style={styles.noneView}>
            <Button title='Add Schedule' onPress={() => handleSchedulePress()}>
            </Button>
        </View>
      </CustomModal>

      <CustomModal isVisible={pastEventVisible} onClose={() => {setPastEventVisible(false)}}>
        <View>
          <Text style={styles.textView}>Selected Alcohol</Text>
        </View>
        <View style={styles.modalContent}>
          <View style={styles.profileView}>
              <Image
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 30,
                  alignItems: 'center',
                  overflow: 'visible',
                  borderWidth: 2,
                  borderColor: 'gray',
                  backgroundColor: 'white',
                }}
                source={selectedImg}
              />
              <Text style={{textAlign: 'center', fontSize: 16, fontWeight: 'bold'}}>{selectedName}</Text>
            
          </View>
          
        </View>
        <View>
          <Text style={styles.textView}>Capacity & Total Calorie</Text>
        </View>
        <View style={styles.roundView}>
          <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center',}}>{capacity} ml</Text>
          <View style={styles.divider} />
          <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center',}}>{totalCalorie} kcal</Text>
        </View>
        <View>
          <Text style={styles.textView}>Did you drink on schedule?</Text>
        </View>
        <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: yesButtonColor }]}
          onPress={handleYesButtonPress}
          disabled={buttonsDisabled}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: noButtonColor }]}
          onPress={handleNoButtonPress}
          disabled={buttonsDisabled}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
        </View>
      </CustomModal>
      </View>
      
    </View>
  );
};

const CustomModal = ({ isVisible, onClose, onShow, children }) => {
  try {
    return (
      <Modal style={styles.modal} isVisible={isVisible} onBackdropPress={onClose} onShow={onShow} presentationStyle="overFullScreen" transparent animationType="slide">
        <View style={styles.modalContent}>{children}</View>
      </Modal>
    );
  } catch (err) {
    return null
  }
  
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingVertical: 20,
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  mainText: {
    fontSize: 40,
    marginBottom: 15,
    marginTop: 30,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  noneView: {
    height: 100,
    alignItems:'center',
    justifyContent: 'center'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  scrollViewContainer: {
    height: 170,
    width: '100%',
    padding: 10,
    margin: 0,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  scrollViewContentContainer: {
    padding: 10,
    alignItems: 'center',
  },
  alcoholButtonContainer: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  calendarContainer: {
    marginBottom: 20,
  },
  modalView: {
    flex: 1,
    margin: 0,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonTextB: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pastEventsText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  defaultView: {
    alignItems: 'center',
    height: 150,
    width: '100%',
    padding: 10,
    margin: 0,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
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
  roundView: {
    alignItems: 'center',
    justifyContent: 'center',
    
    height: 150,
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
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 25,
  },
  profileView: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 300,
    width: '100%',
    padding: 10,
    margin: 0,
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  textView: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  numberText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonContainer: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  button: {
    width: "50%",
    borderRadius: 20,
    padding: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  
});


export default ScheduleScreen;
