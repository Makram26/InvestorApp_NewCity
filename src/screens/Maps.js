
import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, ScrollView, FlatList, TextInput, TouchableOpacity, Dimensions, Alert, Image, ActivityIndicator } from 'react-native'

import SectorCard from '../components/Card/SectorCard'
import AppText from '../components/Text/AppText'
// import Colors from '../constants/Colors'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';
import SectorApi from '../api/charges';
import { ProgressBar, Colors } from 'react-native-paper';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

import axiosInstance from '../api/index';
var db = openDatabase({ name: 'InvoicesDatabase.db' });

const sectorArray = [
    {
        id: 1,
        secId: 1,
        Name: 'A',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 2,
        secId: 25,
        Name: 'B',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 3,
        secId: 26,
        Name: 'C',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 4,
        secId: 27,
        Name: 'D',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 5,
        secId: 28,
        Name: 'E',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 6,
        secId: 30,
        Name: 'F',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 7,
        secId: 31,
        Name: 'G',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 8,
        secId: 32,
        Name: 'H',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 9,
        secId: 33,
        Name: 'I',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 10,
        secId: 34,
        Name: 'J',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 11,
        secId: 29,
        Name: 'EXEC',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 12,
        secId: 35,
        Name: 'L',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 13,
        secId: 36,
        Name: 'M',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 14,
        secId: 37,
        Name: 'N',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 15,
        secId: 38,
        Name: 'O',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 16,
        secId: 39,
        Name: 'P',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 17,
        secId: 40,
        Name: 'Q',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 18,
        secId: 54,
        Name: 'Q Exec',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 19,
        secId: 41,
        Name: 'R',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 20,
        secId: 42,
        Name: 'S',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 21,
        secId: 55,
        Name: 'ABC',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 22,
        secId: 43,
        Name: 'U',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 23,
        secId: 44,
        Name: 'V',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 24,
        secId: 45,
        Name: 'W',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 25,
        secId: 46,
        Name: 'Y',
        move: 'Maintenance Charges Payment',
    },
    {
        id: 26,
        secId: 47,
        Name: 'Z',
        move: 'Maintenance Charges Payment',
    },
];

export default function SectorSelection({ navigation }) {
    const [filteredData, setFilteredData] = useState(sectorArray)
    const [search, setSearch] = useState('')
    const [showSynButton, setShowSynButton] = useState(false)
    const [progress, setProgress] = useState()
    const [showProgress, setShowProgress] = useState(false)
    const [postData, setPostData] = useState([])
    const [userId, setUserId] = useState(null)
    const [isloading, setIsLoading] = useState(false);
   


    const searchFilter = (text) => {
        if (text) {
            const newData = sectorArray.filter((item) => {
                const itemData = item.Name ? item.Name.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
            setSearch(text)
        } else {
            setFilteredData(sectorArray)
            setSearch(text)
        }
    }

    useEffect(async () => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='get_invoices_and_files'",
                [],
                function (tx, res) {
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS get_invoices_and_files', []);
                        viewStudent()
                        //  setShowSynButton(true)
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS get_invoices_and_files(file_id INT(50), street_id VARCHAR(225), file_name VARCHAR(225) , plot_id INT(20), inventory_id VARCHAR(256), membership_id VARCHAR(256), sector_id VARCHAR(256), category_id VARCHAR(256), unit_category_type_id VARCHAR(256), unit_class_id VARCHAR(256), size_id VARCHAR(256), plot_status VARCHAR(256), total_due_amount INT(30),invoice_id INT(256),invoice_number VARCHAR(256),invoice_date_due VARCHAR(256),amount_total_signed INT(256),amount_residual_signed INT(256),invoice_payment_state VARCHAR(256),invoice_month VARCHAR(256),street_db_id INT(256),sector_db_id INT(256))',
                            []
                        );
                    }
                    else if ((res.rows.length == 1)) {
                        viewStudent()
                    }
                }
            );
        })

    }, []);

    const viewStudent = async () => {
        const id = await AsyncStorage.getItem("@user_ID");
        let tempArray = []
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM get_invoices_and_files WHERE invoice_payment_state="paid" AND total_paid_amount > 0 AND maintenance_agent_id=${id}`,
                [],
                (tx, results) => {
                    for (let i = 0; i < results.rows.length; ++i) {
                        console.log("total_paid_amount", results.rows.item(i).amount_total_signed)
                        tempArray.push({ "payment_amount": results.rows.item(i).total_paid_amount, "invoice_id": results.rows.item(i).invoice_id, "file_id": results.rows.item(i).file_id, "uid": id });
                    }
                    console.log(tempArray)
                    setPostData(tempArray)
                }
            );
        });
    }

    const getUserDataHandler = async () => {
        const id = await AsyncStorage.getItem("@user_ID");
        console.log("map id", id)
        setUserId(id)
    }

    const insertData = async () => {
        const id = await AsyncStorage.getItem("@user_ID");
        setShowProgress(true)
        setIsLoading(true)
        const config = {
            onDownloadProgress: function (progressEvent) {
                var percentCompleted = parseFloat((progressEvent.loaded * 1) / progressEvent.total)
                setProgress(percentCompleted)
            }
        }
        let data = {
            "jsonrpc": "2.0",
            "params": {
                "args": [],
                "kwargs": {
                    "invoice_ids": postData
                }
            }
        }
        console.log(`object/maintenance.charges.payment/receive_payment_from_app`)
        axiosInstance.post(`object/maintenance.charges.payment/receive_payment_from_app`, data, config, {
            header: {
                "Accept": "application/json"
            },
        })
        // .then((res) => {
        //     console.log(res)
        // })
        .then((res) => {
            if (res.data && res.data.length > 0) {
                setDataLeng(res.data.length);
                res.data.map((item, index) => {
                    db.transaction(function (tx) {
                        // tx.executeSql(
                        //     'INSERT INTO get_invoices_and_files(file_id,street_id,file_name,plot_id,inventory_id,membership_id,sector_id,category_id,unit_category_type_id,unit_class_id,size_id,plot_status,total_due_amount,invoice_id,invoice_number,invoice_date_due,amount_total_signed,amount_residual_signed,invoice_payment_state,invoice_month,sector_db_id,street_db_id,total_paid_amount,maintenance_agent_id,date_amount_paid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
                        //     [item.file_id, item.street_id, item.file_name, item.plot_id, item.inventory_id, item.membership_id, item.sector_id, item.category_id, item.unit_category_type_id, item.unit_class_id, item.size_id, item.plot_status, item.total_due_amount, item.invoice_id, item.invoice_number, item.invoice_date_due, item.amount_total_signed, item.amount_residual_signed, item.invoice_payment_state, item.invoice_month, item.sector_db_id, item.street_db_id, 0, item.maintenance_agent_id, item.date_amount_paid],
                        //     (tx, results) => {
                        //         if (results.rowsAffected > 0) {
                        //             viewStudent();
                        //         } else Alert.alert('Failed....');
                        //     }
                        // );
                        tx.executeSql(
                            `DELETE FROM get_invoices_and_files WHERE maintenance_agent_id = ${id}`,
                            [],
                            (tx, results) => {
                                  setPostData([])
                                  setShowProgress(false)   
                              Alert.alert(json.Success) 
  
                            }
                        );
                    });
                })
            }
            //   setShowProgress(false)    
        })
        .catch(error => {
            console.log("errsssor", error)
            Alert.alert("Error", "Please Check you internet Connection")
            setShowProgress(false)
            setIsLoading(false)
        })
        //   .then((res) => {
        //          let json=JSON.parse(res.data.result)
        //           if(json.Success){
        //             db.transaction((tx) => {
        //                 tx.executeSql(
        //                   `DELETE FROM get_invoices_and_files WHERE maintenance_agent_id = ${id}`,
        //                   [],
        //                   (tx, results) => {
        //                         setPostData([])
        //                         setShowProgress(false)   
        //                     Alert.alert(json.Success) 

        //                   }
        //                 );
        //               });

        //           }
        //       })
        //         .catch(error => {
        //             console.log(error)
        //             Alert.alert("Error", "Please Check you internet Connection")
        //             setShowProgress(false)
        //             setIsLoading(false)
        //         })
    }

    
    // const insertData = async () => {
    //     const userID = await AsyncStorage.getItem("@user_ID");
    //     if (postData.length > 0) {
    //         setShowProgress(true)
    //         const config = {
    //             onDownloadProgress: function (progressEvent) {
    //                 var percentCompleted = parseFloat((progressEvent.loaded * 1) / progressEvent.total)
    //                 setProgress(percentCompleted)
    //             }
    //         }
    //         let data = {
    //             "jsonrpc": "2.0",
    //             "params": {
    //                 "args": [],
    //                 "kwargs": {
    //                     "invoice_ids": postData
    //                 }
    //             }
    //         }

    //         //   axiosInstance.post("object/maintenance.charges.payment/receive_payment_from_app",data,config, {
    //         //       header:{
    //         //         "Accept": "application/json"
    //         //       },
    //         //   })
    //         //   .then((res) => {
    //         //      let json=JSON.parse(res.data.result)
    //         //       if(json.Success){
    //         //         db.transaction((tx) => {
    //         //             tx.executeSql(
    //         //               `DELETE FROM get_invoices_and_files WHERE maintenance_agent_id = ${userID}`,
    //         //               [],
    //         //               (tx, results) => {
    //         //                   setPostData([])
    //         //                 setShowProgress(false)   
    //         //                 Alert.alert(json.Success) 

    //         //               }
    //         //             );
    //         //           });

    //         //       }
    //         //   })
    //         //     .catch(error => {
    //         //         console.log(error)
    //         //       setShowProgress(false)
    //         //     })

    //     }
    //     else {
    //         Alert.alert("Sorry", "No Paid Invoice Found..")
    //     }

    // }


    return (
        <LinearGradient colors={['#054749', '#40E5EF', '#14B5BF']} style={styles.screen}>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "white" }}>
                <View>
                    <ProgressBar progress={progress} color="#1A8388" style={{ width: 100 }} visible={showProgress} />
                </View>
                {!showProgress ?
                    <TouchableOpacity
                        onPress={() => insertData()}
                        style={{ backgroundColor: "#1A8388", width: "50%", height: 50, justifyContent: "center", alignItems: "center", marginTop: 20, borderRadius: 10 }}>
                        <View style={{ flexDirection: "row", alignItems: "center" }}>
                            <Image source={require('../assets/images/syn.png')} style={{ tintColor: "white", width: 30, height: 30 }} />
                            <Text style={{ color: "white", fontSize: 14, marginLeft: 5 }}>DATA SYNC</Text>
                        </View>
                    </TouchableOpacity>
                    :
                    <View style={{ marginTop: 20, justifyContent: "center", alignItems: "center" }}>
                        <ActivityIndicator color={"green"} size={'large'} />
                    </View>
                }

            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20
    },
    headerText: {
        color: 'white',
        // alignSelf:'center',
        fontWeight: 'bold',
        fontSize: RFValue(18),
        marginHorizontal: 10
    },
    headerIcon: {
        marginHorizontal: 15,
        fontWeight: 'bold'
    },
    selectText: {
        color: '#333333',
        marginLeft: RFValue(45),
        marginVertical: 15,
        fontWeight: 'bold',
        fontSize: RFValue(20),
        fontFamily: 'Poppins'
    },
    cardContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // borderColor:'red',
        // borderWidth:1,
        width: '70%',
        // width: Dimensions.width * 0.7,
        alignSelf: 'center',
        marginBottom: 50
    },
    search: {
        borderColor: '#707070',
        borderWidth: 1,
        width: '80%',
        alignSelf: 'center',
        marginVertical: 20,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,

    },
    searchHolder: {
        paddingLeft: 15,
        fontSize: RFValue(15),
        // borderColor:'red',
        // borderWidth:1,
        width: '90%',
        // overflow:'hidden'
        color: '#C3C3C3'
    },
    bottomContainer: {
        backgroundColor: 'white',
        marginTop: RFValue(15),
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55
    }
})
