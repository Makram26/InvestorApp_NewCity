import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
    Image,
    Dimensions,
    FlatList,
    Platform,
    Alert,
    ActivityIndicator
} from 'react-native'

import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome5'

import Colors from '../constants/Colors'
import AppButton from '../components/Button/AppButton'
import ComponentLoader from '../components/Loader/ComponentLoader';
import AppLoader from '../components/Loader/AppLoader';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import paidAmountCharge from '../api/charges';

import DatePicker from 'react-native-datepicker';

var db = openDatabase({ name: 'InvoicesDatabase.db' });


export default function ChargesDetails({ route, navigation }) {
    const [currentDate, setCurrentDate] = useState('');
    const [currentMonth, setCurrentMonth] = useState('');
    const [chargesDetails, setChargesDetails] = useState([])
    const [invoiceDetails, setInvoiceDetails] = useState([])
    const [loading, setLoading] = useState(false)
    const [Invoices, setInvoices] = useState([])

    const [tempArray, setTempArray] = useState([]);
    const [arrayCheck, setArrayCheck] = useState([]);

   const [day, setDay] = useState('')
   const [month, setMonth] = useState('')
   const [year, setYear] = useState('')

    const charges = route.params
    const plot_id = parseInt(charges.plot_id);
    const files_ID = parseInt(charges.file_id);
    console.log("files_ID",files_ID)
    
    // const invoiceID = Invoice.id;
    // console.log("files id =>", files_ID)

    var values = [];
    const [paidAmount, setPaidAmount] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {

        db.transaction(function (txn) {
          txn.executeSql(
            `SELECT name FROM sqlite_master WHERE type='table' AND name='get_invoices_and_files'`,
            [],
            function (tx, res) {
              if (res.rows.length == 0) {
                txn.executeSql('DROP TABLE IF EXISTS get_invoices_and_files', []);
                txn.executeSql(
                    'CREATE TABLE IF NOT EXISTS get_invoices_and_files(file_id INT(50), street_id VARCHAR(225), file_name VARCHAR(225) , plot_id INT(20), inventory_id VARCHAR(256), membership_id VARCHAR(256), sector_id VARCHAR(256), category_id VARCHAR(256), unit_category_type_id VARCHAR(256), unit_class_id VARCHAR(256), size_id VARCHAR(256), plot_status VARCHAR(256), total_due_amount INT(30),invoice_id INT(256),invoice_number VARCHAR(256),invoice_date_due VARCHAR(256),amount_total_signed INT(256),amount_residual_signed INT(256),invoice_payment_state VARCHAR(256),invoice_month VARCHAR(256),street_db_id INT(256), sector_db_id INT(256), date_amount_paid VARCHAR(256))',
                  []
                );
              }
              else if((res.rows.length == 1)){
                  viewStudent()
               }
            }
          );
        })
     
      }, []);

      const viewStudent = async() => {
        const id = await AsyncStorage.getItem("@user_ID");
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM get_invoices_and_files WHERE file_id = ${files_ID} AND unit_class_id = 'House' AND maintenance_agent_id = ${id}`,
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i){
                  console.log("results.rows.ijjjtem(i)",results.rows.item(i))
                temp.push(results.rows.item(i));
              }
               setInvoices(temp)     
            }
          );
        });
      }


      useEffect(() => {
        var date = new Date(); //Current Date
        var day = new Date().getDate(); //Current Date
        console.log("date=>",date)
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setCurrentDate(
            day + '/' + month + '/' + year
        );
        setCurrentMonth(
            '01/'+ month + '/' + year
        )
        setYear(year)
        setMonth(month)
        setDay(day)
        setDate( day + '/' + month + '/' + year)
    }, []);

    const [date, setDate] = useState("");

    console.log("currentMonth",currentMonth)
    console.log("date1",date)
    

    console.log("dateType",typeof date)

    const postAmount = async () => {
        const delectedDate = day + "/" + month + "/" + year
        // console.log(arrayCheck)
        const string_date = date.toString();
        let paramsArray = [];
        let checkArray = [];
        paidAmount.map((item, index) => {
            if (item <= Invoices[index].amount_residual_signed)
                checkArray.push(true)
            else
                checkArray.push(false)
            paramsArray.push({ payment_amount: item,
                 invoice_id: Invoices[index].invoice_id,amount_residual_signed:Invoices[index].amount_residual_signed,
                    total_paid_amount:Invoices[index].total_paid_amount,date_amount_paid:string_date})
        })
        if (checkArray.includes(false)) {
            Alert.alert("Please Enter the Valid Amount", "Your paid amount is greater then due amount..")
        }
        else {
            console.log("paramsArray",paramsArray)
            // setLoading(true)
            paramsArray.map((item,index)=>{
                console.log(  `UPDATE get_invoices_and_files SET invoice_payment_state = "paid",
                    ${item.amount_residual_signed},
                    total_due_amount = ${item.amount_residual_signed-item.payment_amount},
                    amount_residual_signed = ${item.amount_residual_signed-item.payment_amount} ,
                    amount_total_signed = ${item.payment_amount},
                  date_amount_paid = '${item.date_amount_paid}',
                    total_paid_amount=${item.total_paid_amount+item.payment_amount}
                    WHERE file_id = ${files_ID} AND invoice_id=${item.invoice_id};`)
                db.transaction((tx) => {
                    tx.executeSql(
                  `UPDATE get_invoices_and_files SET invoice_payment_state = "paid", 
                  total_due_amount = ${item.amount_residual_signed-item.payment_amount},
                  amount_residual_signed = ${item.amount_residual_signed-item.payment_amount},
                  amount_total_signed = ${item.payment_amount},
                  date_amount_paid = "${item.date_amount_paid}",
                  total_paid_amount=${item.total_paid_amount+item.payment_amount} 
                  WHERE file_id = ${files_ID} AND invoice_id=${item.invoice_id};`,
                      [],
                      (tx, results) => {
                        navigation.navigate('Charges Invoice Details', {'order': charges, 'paid': paidAmount,"date":date})

                      }
                    );
                  });
              })
  

            // const response = await paidAmountCharge.sendPaidAmount(files_ID, paramsArray)
            // if (response.ok) {
            //     setLoading(false)
            //     navigation.navigate('Charges Invoice Details', { 'order': charges, 'paid': paidAmount, 'date': currentDate })
            // } 
            
            // else {
            //     setLoading(false)
            // }
        }

    }
    return (
        <View style={styles.screen}>

            <ScrollView>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <FontAwesome
                            name="user-alt"
                            size={RFValue(35)}
                            color="white"
                        />
                        {/* <View style={{borderColor:'red',borderWidth:1}}>
                            <Image 
                                source={require('../assets/images/user-male.png')}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View> */}
                        <View style={{ flexDirection: 'column', marginLeft: 15 }}>
                            <Text style={styles.name}>{charges.membership_id}</Text>
                            <Text style={styles.file}>{charges.file_name}</Text>
                            <DatePicker
                                style={styles.datePickerStyle}
                                date={date} // Initial date from state
                                mode="date" // The enum of date, datetime and time
                                placeholder="Select Date"
                                format="DD/MM/YYYY"
                                minDate={currentMonth}
                                maxDate={currentDate}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateTouchBody: {
                                        //display: 'none',
                                    //   position: 'absolute',
                                    //   left: 0,
                                    //   top: 4,
                                    //   marginLeft: 0,
                                    borderWidth:1,
                                    borderColor:'green'
                                    },
                                }}
                                onDateChange={(date) => {
                                    setDate(date);
                                }}
                            />
                        </View>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.contentContainer}>
                            <View style={styles.contentContainer2}>
                                <FontAwesome
                                    name="street-view"
                                    size={25}
                                    color={Colors.card}
                                />
                                <Text style={styles.date}>{charges.sector_id}</Text>
                            </View>

                            <View style={styles.contentContainer2}>
                                <FontAwesome
                                    name="road"
                                    size={25}
                                    color={Colors.card}
                                />
                                <Text style={styles.date}>{charges.street_id}</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.contentContainer2}>
                                <Icon
                                    name="ellipsis-vertical-outline"
                                    size={25}
                                    color={Colors.card}
                                />
                                <Text style={styles.date}>{charges.inventory_id}</Text>
                            </View>

                            <View style={styles.contentContainer2}>
                                <Icon
                                    name="calendar-outline"
                                    size={25}
                                    color={Colors.card}
                                />
                                <Text style={styles.date}>{date}</Text>
                                {/* <DatePicker
                                    style={styles.datePickerStyle}
                                    date={date} // Initial date from state
                                    mode="date" // The enum of date, datetime and time
                                    placeholder="Select Date"
                                    format="DD-MM-YYYY"
                                    minDate={currentMonth}
                                    maxDate={currentDate}
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateTouchBody: {
                                          //display: 'none',
                                        //   position: 'absolute',
                                        //   left: 0,
                                        //   top: 4,
                                        //   marginLeft: 0,
                                        borderWidth:1,
                                        borderColor:'green'
                                        },
                                    }}
                                    onDateChange={(date) => {
                                        setDate(date);
                                    }}
                                /> */}
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.contentContainer2}>
                                <Icon
                                    name="bookmark-outline"
                                    size={25}
                                    color={Colors.card}
                                />
                                <Text style={styles.date}>{charges.category_id}</Text>
                            </View>

                            <View style={styles.contentContainer2}>
                                <Icon
                                    name="expand-outline"
                                    size={25}
                                    color={Colors.card}
                                />
                                <Text style={styles.date}>{charges.size_id}</Text>
                            </View>
                        </View>
                        <View style={styles.contentContainer}>
                            <View style={styles.contentContainer2}>
                                <Icon
                                    name="home-outline"
                                    size={25}
                                    color={Colors.card}
                                />
                                <Text style={styles.date}>{charges.unit_category_type_id}</Text>
                            </View>
                            <View style={styles.contentContainer2}>
                                <Icon
                                    name="keypad-outline"
                                    size={25}
                                    color={Colors.card}
                                />
                                <Text style={styles.date}>{charges.unit_class_id}</Text>
                            </View>
                        </View>

                    </View>

                    <View style={styles.bottomContainer}>
                        {Invoices && Invoices.length > 0  ? (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', alignContent: 'center' }}>
                                <View style={styles.invoiceContainer}>
                                    <Text style={styles.invoiceContainerText}>INV#</Text>
                                    {
                                        Invoices.map((data) => (
                                            <View>
                                            {data.amount_residual_signed>0?
                                            <Text style={styles.invoiceText} key={data.id}>{data.invoice_number}</Text>
                                            :null}
                                            </View>
                                        ))
                                    }
                                    {/* <Text style={styles.invoiceText}>{Invoice.name}</Text> */}
                                </View>
                                <View style={styles.invoiceContainer}>
                                    <Text style={styles.invoiceContainerText}>Due Date</Text>
                                    {
                                        Invoices.map((data) => (
                                            <View>
                                                {data.amount_residual_signed>0?
                                            <Text style={styles.invoiceText} key={data.id}>{data.invoice_date_due}</Text>
                                            :null}
                                            </View>
                                        ))
                                    }
                                    {/* <Text style={styles.invoiceText}>{Invoice.invoice_date_due}</Text> */}

                                </View>
                                <View style={styles.invoiceContainer}>
                                    <Text style={styles.invoiceContainerText}>Due Amount</Text>
                                    {
                                        Invoices.map((data) => (
                                            <View>
                                            {data.amount_residual_signed>0?
                                            <Text style={styles.invoiceText} key={data.id}>{data.amount_residual_signed}</Text>
                                            :null}
                                            </View>
                                        ))
                                    }
                                    {/* <Text style={styles.invoiceText}>{Invoice.amount_residual_signed}</Text> */}

                                </View>
                                <View style={styles.invoiceContainer}>
                                    <Text style={styles.invoiceContainerText}>Paid Amount</Text>
                                    {
                                        Invoices.map((data, index) => (
                                            <View>
                                            {data.amount_residual_signed>0?
                                            <TextInput
                                            placeholderTextColor={Platform.OS == "ios" && "grey"}
                                                style={styles.invoiceTextInput}
                                                key={data.id}
                                                keyboardType="number-pad"
                                                value={values}
                                                numericvalue
                                                onChangeText={(text) => {
                                                    let inputValues = tempArray;
                                                    inputValues[index] = parseInt(text);
                                                    setTempArray(inputValues)
                                                    setPaidAmount(tempArray)
                                                }
                                                }
                                            />
                                            :null}
                                            </View>
                                        ))
                                    }

                                </View>
                            </View>
                        ) : (
                            <Text style={styles.recordsText}>Invoices Do Not Exists</Text>
                        )}
                    </View>
                </View>


                {Invoices.length > 0 && paidAmount.length > 0 ?
                    <TouchableOpacity
                        style={styles.buttonContainer}
                        // onPress={() => navigation.navigate('Charges Invoice Details', {'order': order, 'paid': paidAmount})}
                        onPress={() => postAmount()}
                    >
                        {loading ?
                            <ActivityIndicator size="large" color="white" /> :
                            <Text style={styles.buttonText}>Pay</Text>}
                    </TouchableOpacity> : null
                }

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    container: {
        flex:1,
        // borderColor: 'black',
        // borderWidth: 1,
        marginVertical: Dimensions.get('window').width * 0.1,
        // padding: 10,
        width: '97%',
        alignSelf: 'center',
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 10,
        shadowOpacity: 0.7,
        elevation: 5,
        backgroundColor: Colors.card,
        // padding:20,
        borderRadius: 10,
        overflow: 'hidden',
    },
    header: {
        // borderColor: 'blue',
        // borderWidth: 1,
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.card,
    },
    content: {
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 10,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        backgroundColor: 'white',
        // marginTop:20
    },
    contentContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    contentContainer2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '35%',
        marginVertical: 10
    },
    name: {
        fontWeight: 'bold',
        fontSize: RFValue(25),
        color: 'white',
        flex:1
    },
    file: {
        color: 'white',
        fontSize: RFValue(18),
        // marginLeft: 10
    },
    date: {
        // marginLeft: 15,
        fontWeight: '900',
        fontSize: RFValue(18),
        fontFamily: 'sans-serif',
        color: Colors.textColor,
        marginLeft: 15
    },
    bottomContainer: {
        padding: 10,

    },
    buttonContainer: {
        marginHorizontal: '8%',
        marginVertical: 3,
        width: '85%',
        alignSelf: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
        padding: 10,
        borderRadius: 25,
        backgroundColor: Colors.card,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        marginBottom: 10
    },
    buttonContainer1: {
        marginHorizontal: '8%',
        marginVertical: 3,
        width: '85%',
        alignSelf: 'center',
        // borderColor: 'black',
        // borderWidth: 1,
        padding: 10,
        borderRadius: 25,
        backgroundColor: 'red',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        marginBottom: 10
    },
    buttonText: {
        alignSelf: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: RFValue(20)
    },
    buttonStyle: {
        borderWidth: 5,
        borderColor: Colors.card,
        borderRadius: 5,
        padding: 2,
        backgroundColor: Colors.card,
    },
    bottomTextContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        marginVertical: 12,
        // borderColor:'red',
        // borderWidth:1,
        width: '65%',
        // justifyContent:'space-between'
    },
    image: {
        width: '80%',
        height: '80%',
    },
    invoiceContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    invoiceContainerText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: RFValue(14)
    },
    invoiceText: {
        color: 'white',
        marginVertical: 18,
        fontSize: RFValue(12)
    },
    invoiceTextInput: {
        color: 'white',
        borderBottomColor: 'white',
        borderBottomWidth: 1,
        textAlign: 'center',
        fontSize: RFValue(12),
        marginTop: 1,
    },
    recordsText: {
        fontSize: RFValue(20),
        color: 'red',
        alignSelf: 'center'
    },
    datePickerStyle:{
        // borderColor:'red',
        // borderWidth:1,
        // flex:1,
        marginTop:7,
        backgroundColor:'white',
        // marginLeft: 15,
        width:'80%'
    }
})
