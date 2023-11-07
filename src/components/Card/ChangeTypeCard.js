import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker';

import Colors from '../../constants/Colors'

export default function ChangeTypeCard({unit, todayDate, buyerName, category, product, size, amount, onPress, disabled, plot, changedItem}) {
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'Apple', value: 'apple'},
        {label: 'Banana', value: 'banana'}
    ]);
    const [open, setOpen] = useState(false);

    return (
        <View style={styles.screen}>
            <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.7} disabled={disabled}>
                <View style={styles.leftContainer}>
                    <Text style={styles.type}>{unit}</Text>
                    <Text style={styles.date}>{todayDate}</Text>
                </View>
                <View style={styles.rightContainer}>
                    <View style={{alignItems:'flex-start'}}>
                        <View style={styles.content}>
                            <Icon
                                name = "person-outline"
                                size = {RFValue(25)}
                                color = {Colors.card}
                            />
                            <Text style={styles.name}>{buyerName}</Text>
                        </View>
                        <View style={styles.content1}>
                            <Icon
                                name = "home-outline"
                                size = {RFValue(25)}
                                color = {Colors.card}
                            />
                            <Text style={styles.name}>{category}</Text>
                        </View>
                        <View style={styles.content1}>
                            <Icon
                                name = "cash-outline"
                                size = {RFValue(25)}
                                color = {Colors.card}
                            />
                            <Text style={styles.name}>{amount}</Text>
                        </View>
                    </View>
                    <View style={styles.bottomContainer}>
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <Text style={styles.heading}>PRODUCT</Text>
                            <Text style={styles.text}>{product}</Text>
                        </View>
                        
                        <View style={{flexDirection:'column', alignItems:'center'}}>
                            <Text style={styles.heading}>SIZE</Text>
                            <Text style={styles.text}>{size}</Text>
                        </View>
                    </View>
                    <View style={{alignSelf:'center'}}>
                        {/* <Text style={styles.heading}>TYPE</Text> */}
                        <DropDownPicker
                            items={items}
                            // controller={instance => controller = instance}
                            placeholderStyle={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color:'gray',
                                width:20
                            }}
                            defaultValue={value}
                            placeholder="Type"
                            containerStyle={{height: 20, width:'100%'}}
                            style={styles.inputText}
                            itemStyle={{
                                justifyContent: 'center',
                                width:20
                            }}
                            searchable={true}
                            searchablePlaceholder="Search.."
                            searchablePlaceholderTextColor="gray"
                            searchableError={() => <Text>Not Found</Text>}
                            dropDownStyle={{backgroundColor: '#fafafa',width:'10%'}}
                            // onChangeItem={changedItem}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            open={open}
                        />
                    </View>
                </View>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        // backgroundColor: '#597e87'
    },
    card: {
        // borderColor: 'black',
        // borderWidth: 1,
        marginVertical: 10,
        // padding: 10,
        width: '90%',
        alignSelf:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        // shadowColor:'black',
        // shadowOffset:{
        //     width:0, height:2
        // },
        // shadowRadius:6,
        // shadowOpacity:0.26,
        // elevation:8,
        // backgroundColor:'white',
        // // padding:20,
        // borderRadius:10,
        // overflow:'hidden',

    },
    leftContainer: {
        // borderColor: 'blue',
        // borderWidth: 1,
        padding: 10,
        width: '26%',
        justifyContent:'space-between',
        alignItems:'center',
        backgroundColor: Colors.card,
        borderRadius:30,
        shadowColor:'black',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        backgroundColor: Colors.card,
        // padding:20,
        marginVertical:40
    },
    rightContainer: {
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 8,
        width: '73%',
        marginLeft: 5,
        borderRadius:30,
        shadowColor:'black',
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
        backgroundColor:'#F9F9F9',
        // padding:20,
        marginVertical:40
    },
    bottomContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical:10,
        // alignItems:'flex-start'
    },
    content: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical:10
    },
    content1: {
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
        marginVertical:10,
        // alignContent:'center',
        // alignSelf:'center'
    },
    heading:{
        fontSize: RFValue(15),
        fontWeight: 'bold',
        color: '#828181'
    },
    text: {
        fontSize: RFValue(18),
        fontWeight:'900',
        color: '#333333'
    },
    name: {
        marginLeft: 15,
        fontWeight:'600',
        fontSize: RFValue(18),
        fontFamily: "Roboto-Light",
        color: Colors.textColor
    },
    type: {
        fontSize: RFValue(20),
        fontWeight:'bold',
        color:'white',
        fontFamily: "Raleway-lightItalic"
    },
    date:{
        fontSize: RFValue(15),
        fontWeight:'bold',
        color:'white',
        fontFamily: "Raleway-lightItalic",
    },
    inputText: {
        // borderColor: 'gold',
        borderWidth: 1,
        // marginBottom: 5,
        height: 25,
        width: '80%',
        marginLeft:10
    },  
})
