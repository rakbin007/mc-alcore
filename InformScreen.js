import React, { useState } from 'react';
import { View, ScrollView, Modal, TouchableOpacity, Text, StyleSheet, Image } from 'react-native';
import Alcohols from './alcoholDB';

export default function InformScreen({ navigation }) {
  return <VerticalScrollingView />;
}

const VerticalScrollingView = () => {
  const [selectedButton, setSelectedButton] = useState(null);

  const handleButtonPress = (button) => {
    setSelectedButton(button);
  };

  const closeModal = () => {
    setSelectedButton(null);
  };

  const CreateButton = () => {
    return Alcohols.data.map(function(alcohol) {
      return (
        <TouchableOpacity
          key={alcohol.name}
          onPress={() => handleButtonPress(alcohol)}
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
        <View style={{ height: 10 }}></View>
            <View>
            <Text style={styles.textView}>Monthly Achievements</Text>
            </View>
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
            {Alcohols.data.map((button) => (
            <TouchableOpacity
                key={button.name}
                style={styles.alcoholButtonContainer}
                onPress={() => handleButtonPress(button)}
            >
                <Image source={button.img} style={styles.buttonImage} />
                <Text style={styles.buttonTextB}>{button.name}</Text>
            </TouchableOpacity>
            ))}
        </ScrollView>
        
        <Modal style={styles.modal} visible={selectedButton !== null} presentationStyle="pageSheet" animationType="slide">
            <View style={styles.modalContainer}>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                </TouchableOpacity>
                <View style={{marginTop: 40, marginBottom: 10}}>
                    <Text style={styles.textView}>{selectedButton?.name}</Text>
                </View>
                <View style={styles.defaultView}>
                    <View style={{marginRight: 20}}>
                        <Image
                        style={{
                            alignSelf:'center',
                            width: 250,
                            height: 250,
                            borderRadius: 30,
                            overflow: 'visible',
                            borderWidth: 2,
                            borderColor: 'gray',
                            backgroundColor: 'white',
                        }}
                        source={selectedButton?.img}
                        />
                    </View>
                </View>
                <View style={{marginTop: 10, marginBottom: 10}}>
                    <Text style={styles.textView}>Calorie Information</Text>
                </View>
                <View style={styles.roundView}>
                    <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center',}}>100 ml </Text>
                    <View style={styles.divider} />
                    <Text style={{fontSize: 30, fontWeight: 'bold', textAlign: 'center',}}>{selectedButton?.calorie} kcal</Text>
                </View>
                <View>
                <Text style={styles.textView}>Other Alcohols</Text>
                </View>
                <View style={styles.scrollViewContainer}>
                <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={styles.scrollViewContent}>
                    <CreateButton />
                </ScrollView>
                </View>
            </View>
            
        </Modal>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  alcoholButtonContainer: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  modal: {
    justifyContent: 'center',
    margin: 0,
  },
  scrollViewContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  button: {
    width: '30%',
    height: 160,
    backgroundColor: 'lightblue',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  numberText: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonImage: {
    width: 80,
    height: 80,
    marginBottom: 10,
  },
  buttonTextB: {
    fontSize: 8,
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContainer: {
    height: '90%',
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  modalContent: {
    
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  closeButton: {
    alignSelf: 'center',
    height: 7,
    width: 70,
    backgroundColor: 'gray',
    opacity: 0.5,
    padding: 1,
    borderRadius: 100,
    marginTop: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
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
  textView: {
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'left',
    color: 'black',
    fontWeight: 'bold',
  },
  defaultView: {
    alignItems: 'center',
    alignSelf: 'center',
    height: 300,
    width: '90%',
    padding: 20,
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
  divider: {
    width: 2,
    height: '100%',
    backgroundColor: '#ccc',
    marginHorizontal: 20,
    opacity: 0.3,
  },
  roundView: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    
    height: 100,
    width: '90%',
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
});
