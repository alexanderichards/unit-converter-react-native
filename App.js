import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Dimensions, TextInput} from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view'; 
import convert from 'convert-units';
import Constants from 'expo-constants';
import { Picker } from '@react-native-community/picker';
import { SimpleLineIcons } from '@expo/vector-icons';

const measures = convert().measures()
const mainColor = '#052f5f'

const MeasureView = ({measure, value, setValue}) => {
  const units = convert().possibilities(measure) 
  const [fromUnit, setFromUnit] = useState(units[0])
  const [toUnit, setToUnit] = useState(units[1])
  const [valueConverted, setValueConverted] = useState(0)

  useEffect(() => {
    setValueConverted(convert(+value).from(fromUnit).to(toUnit).toFixed(2))
  }, [value, fromUnit, toUnit])

  return (
    <View style={styles.scene}>
      <View style={styles.row}>
        <Picker style={styles.column} selectedValue={fromUnit} onValueChange={setFromUnit}>
          {units.map((unit, index) => (
            <Picker.Item label={unit} value={unit} key={index}/>
          ))}
        </Picker>
        <View style={styles.column}>
            <TextInput value={value} onChangeText={setValue} keyboardType='numeric' style={styles.input}></TextInput>
        </View>
      </View>
      <SimpleLineIcons name='arrow-down-circle'
        size={35}
        color={mainColor}
        style={{alignSelf: 'center'}} />
      <View style={styles.row}>
        <Picker style={styles.column} selectedValue={toUnit} onValueChange={setToUnit}>
          {units.map((unit, index) => (
            <Picker.Item label={unit} value={unit} key={index}/>
          ))}
        </Picker>
        <View style={styles.column}>
          <Text style={[styles.text, {fontSize: 40, fontWeight: 'bold'}]}>{valueConverted}</Text>
        </View>
      </View>
    </View>
  )
}
  

function unCamelCase(value){
  return value.replace(/([A-Z])/g, ' $1')
}

export default function App() {
  const [index, setIndex] = useState(0)
  const [routes] = useState(measures.map((m) => ({key: m, title: unCamelCase(m)})))
  const [value, setValue] = useState('0');


  const renderScene = ({route}) => {
    return <MeasureView measure={route.key} value={value} setValue={setValue}></MeasureView>
  }

  return (
    <View style={[styles.scene, {marginTop: Constants.statusBarHeight}]}>
      <Text style={styles.title}>Unit converter</Text>
      <TabView navigationState={{index, routes}} 
        renderScene={renderScene} 
        onIndexChange={setIndex} 
        initialLayout={{width: Dimensions.get('window').width }}
        renderTabBar={(props) => (
          <TabBar {...props} scrollEnabled 
            tabStyle={{width: 'auto'}} 
            style={{backgroundColor: mainColor}}
            indicatorStyle={{ backgroundColor: 'white'}}></TabBar>
        )}>
      </TabView>
      <Text style={styles.title}>Unit converter</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1
  },
  title: {
    padding: 15,
    fontWeight: 'bold',
    color: mainColor,
    fontSize: 20,
    textAlign: 'center',
    textTransform: "uppercase"
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  column: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20
  },
  input: {
    height: 40,
    borderColor: mainColor,
    borderBottomWidth: 1, 
    fontSize: 30,
    textAlign: 'center'
  },
  text: {
    height: 40,
    fontSize: 30,
    textAlign: 'center'
  }
});
