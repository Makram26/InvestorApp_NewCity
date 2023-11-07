// import React, { useEffect, useContext, useState } from 'react'
// import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, ActivityIndicator, RefreshControl, Alert } from 'react-native'

// import LinearGradient from 'react-native-linear-gradient';
// import { RFValue } from "react-native-responsive-fontsize";
// import Icon from 'react-native-vector-icons/FontAwesome5'
// import { openDatabase } from 'react-native-sqlite-storage';
// import StatusCard from '../components/Card/StatusCard';
// import ReloadButton from '../components/Button/ReloadButton';
// import AppLoader from '../components/Loader/AppLoader';
// import Colors from '../constants/Colors'
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";

// import collectionStatusApi from '../api/charges'

// var db = openDatabase({ name: 'InvoicesDatabase.db' });

// export default function CollectionStatus({ navigation }) {
//     const [invoiceInfo, setInvoiceInfo] = useState([]);
//     const [filteredData, setFilteredData] = useState([])
//     const [search, setSearch] = useState('')
//     const [loading, setLoading] = useState(false)
//     const [errors, setErrors] = useState(false)
//     const [offset, setOffset] = useState(0);
//     const [refreshing, setRefreshing] = useState(false);

//     const [footerButton, setFooterButton] = useState(false);
//     const [searchData, setSearchData] = useState(false)

//     useEffect(() => {
//         // loadStatus();
//         viewStudent();
//     }, [])

//     const loadStatus = async () => {
//         setLoading(true)
//         // setInvoiceInfo([]);
//         setRefreshing(true);
//         setFilteredData([]);
//         setFooterButton(false)
//         const response = await collectionStatusApi.getCollectionStatus(offset);
//         setLoading(false)
//         setFooterButton(false)
//         if (response.ok && response.data) {
//             let customer = (response.data)
//             setFilteredData([...filteredData, ...customer]);
//             setOffset(offset + 10);
//             setErrors(false)
//             setRefreshing(false)
//             setFooterButton(true)
//         } else {
//             // console.log('Error in getting Invoice Data');
//             setErrors(true)
//             setFooterButton(false)
//             setRefreshing(false)
//         }
//     }


//     const viewStudent = async () => {
//         const id = await AsyncStorage.getItem("@user_ID");
//         let tempArray = []
//         db.transaction((tx) => {
//             tx.executeSql(

//                 `SELECT sector_id as name ,sector_db_id as id , sector_db_id as sector_id , 
//                   amount_total_signed,(SELECT SUM(amount_total_signed) FROM get_invoices_and_files
//                                         WHERE invoice_payment_state="paid") as total_sector_amount_received,
//                   SUM(amount_residual_signed) as total_sector_receivable
//                     FROM get_invoices_and_files 
//                    WHERE  maintenance_agent_id=${id} `,
//                 [],
//                 (tx, results) => {
//                     for (let i = 0; i < results.rows.length; ++i) {
//                         tempArray.push(results.rows.item(i))
//                         console.log("results.rows.item(iiiii)", results.rows.item(i))

//                     }
//                     setFilteredData(tempArray)

//                 }
//             );
//         });
//     }

//     const loadSearchInventory = async (search) => {
//         setInvoiceInfo([]);
//         const response = await collectionStatusApi.getSearchedSector(search);
//         setLoading(false)
//         setRefreshing(false);
//         setSearchData(true)
//         if (response.ok && response.data) {
//             // setSectorInfo(response.data.result.slice(0, 10));
//             setInvoiceInfo(response.data.result);
//             console.log(response.data.result)
//             // setFilteredData([...filteredData, ...response.data.result]);
//             // setOffset(offset + 10);
//             setErrors(false)
//             setRefreshing(false);
//             // setFooterButton(true)
//         } else {
//             // console.log('Error in getting Invoice Data');
//             setErrors(true)
//             setRefreshing(false);
//             // setFooterButton(false)
//         }
//     }

//     // const searchFilter = (text) => {
//     //     if (text) {
//     //         const newData = invoiceInfo.filter((item) => {
//     //             const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
//     //             const textData = text.toUpperCase()
//     //             return itemData.indexOf(textData) > -1
//     //         })
//     //         setFilteredData(newData)
//     //         setSearch(text)
//     //     } else {
//     //         setFilteredData(filteredData)
//     //         setSearch(text)
//     //     }
//     // }

//     const renderFooter = () => {
//         return (
//             //Footer View with Load More button
//             <View style={styles.footer}>
//                 {
//                     (footerButton == true) ?
//                         <TouchableOpacity
//                             activeOpacity={0.9}
//                             onPress={loadStatus}
//                             //On Click of button load more data
//                             style={styles.loadMoreBtn}
//                         >
//                             <Icon
//                                 name="arrow-down"
//                                 size={30}
//                                 color="white"
//                             />
//                         </TouchableOpacity> : null
//                 }
//             </View>
//         );
//     };

//     return (
//         <LinearGradient colors={['#054749', '#40E5EF', '#14B5BF']} style={styles.screen}>
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
//                     <Icon name="chevron-left" color="white" size={RFValue(25)} />
//                 </TouchableOpacity>
//                 <Text style={styles.headerText}>Collection Status</Text>
//             </View>
//             <View style={styles.search}>
//                 {/* <Icon
//                     name="search"
//                     size={RFValue(15)}
//                     color="#006D6D"
//                 /> */}
//                 <TextInput
//                     placeholder="Search Sector... e.g: Block B"
//                     style={styles.searchHolder}
//                     value={search}
//                     onChangeText={(text) => setSearch(text)}
//                 />
//                 <TouchableOpacity onPress={() => loadSearchInventory(search)}>
//                     <Icon
//                         name="search"
//                         size={RFValue(15)}
//                         color={Colors.card}
//                     />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.bottomContainer}>
//                 {errors && (<>
//                     <Text style={styles.errorText}>Couldn't retrive collection</Text>
//                     <ReloadButton onPress={loadStatus} />
//                 </>)}
//                 {!loading ?
//                     <View style={styles.tableHead}>
//                         <View style={styles.tableCell}><Text style={styles.tableText}>Sector</Text></View>
//                         <View style={styles.tableCell}><Text style={styles.tableText}>Recievable</Text></View>
//                         <View style={styles.tableCell}><Text style={styles.tableText}>Recieved</Text></View>
//                         {/* <View style={styles.tableCell}><Text style={styles.tableText}>Balance</Text></View> */}
//                     </View> : null}
//                 {
//                     (searchData == false) ?
//                         <FlatList
//                             data={filteredData}
//                             keyExtractor={(stock) => stock.id}
//                             renderItem={({ item }) => (
//                                 <StatusCard
//                                     key={item.id}
//                                     Sector={item.name}
//                                     Recievable={item.total_sector_receivable && item.total_sector_receivable ? item.total_sector_receivable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
//                                     Recieved={item.total_sector_amount_received && item.total_sector_amount_received ? item.total_sector_amount_received.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
//                                     // Balance={item.total_sector_receivable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//                                     onPress={() => {
//                                         // if(item.total_plots>0)
//                                         navigation.navigate('Street Selection', item.sector_id)
//                                         // else
//                                         // Alert.alert("Sorry!","No plot Found")
//                                     }
//                                     }
//                                 />
//                             )

//                             }
//                             refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadStatus} />}
//                             ListFooterComponent={renderFooter}

//                         /> :
//                         <StatusCard
//                             key={invoiceInfo.id}
//                             Sector={invoiceInfo.name}
//                             Recievable={invoiceInfo.total_sector_receivable && invoiceInfo.total_sector_receivable ? invoiceInfo.total_sector_receivable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
//                             Recieved={invoiceInfo.total_sector_amount_received && invoiceInfo.total_sector_amount_received ? invoiceInfo.total_sector_amount_received.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
//                             // Balance={item.total_sector_receivable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
//                             onPress={() => {
//                                 // if(item.total_plots>0)
//                                 navigation.navigate('Street Selection', invoiceInfo.sector_id)
//                                 // else
//                                 // Alert.alert("Sorry!","No plot Found")
//                             }
//                             }
//                         />

//                 }
//                 <View>
//                     <ActivityIndicator />
//                 </View>
//             </View>
//         </LinearGradient>
//     )
// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         marginTop: 20
//     },
//     headerText: {
//         color: 'white',
//         // alignSelf:'center',
//         fontWeight: 'bold',
//         fontSize: RFValue(18),
//         marginHorizontal: 10
//     },
//     headerIcon: {
//         marginHorizontal: 15,
//         fontWeight: 'bold'
//     },
//     search: {
//         borderColor: '#707070',
//         borderWidth: 1,
//         width: '80%',
//         alignSelf: 'center',
//         marginVertical: 20,
//         flexDirection: 'row',
//         alignItems: 'center',
//         paddingLeft: 15,
//         backgroundColor: 'white',
//         borderRadius: 10,
//         shadowOffset: {
//             width: 0, height: 2
//         },
//         shadowRadius: 6,
//         shadowOpacity: 0.26,
//         elevation: 8,

//     },
//     searchHolder: {
//         paddingLeft: 15,
//         fontSize: RFValue(15),
//         // borderColor:'red',
//         // borderWidth:1,
//         width: '90%',
//         // overflow:'hidden'
//         color: '#C3C3C3'
//     },
//     bottomContainer: {
//         backgroundColor: 'white',
//         marginTop: RFValue(15),
//         borderTopLeftRadius: 55,
//         borderTopRightRadius: 55,
//         flex: 1
//     },
//     errorText: {
//         fontSize: RFValue(25),
//         color: Colors.card,
//         alignSelf: 'center',
//     },
//     tableHead: {
//         // borderColor:'black',
//         // borderWidth:1,
//         marginTop: 50,
//         // padding:2,
//         width: '95%',
//         alignSelf: 'center',
//         flexDirection: 'row',
//         justifyContent: 'space-evenly'
//     },
//     tableCell: {
//         borderWidth: 1,
//         borderColor: Colors.card,
//         padding: 5,
//         flex: 1,
//         textAlign: 'center',
//         alignItems: 'center',
//         backgroundColor: Colors.card
//     },
//     tableText: {
//         color: 'white',
//         fontWeight: 'bold',
//         fontSize: RFValue(14)
//     },
//     footer: {
//         padding: 10,
//         justifyContent: 'center',
//         alignItems: 'center',
//         flexDirection: 'row',
//         // borderColor:'red',
//         // borderWidth:1
//     },
//     loadMoreBtn: {
//         padding: 10,
//         backgroundColor: Colors.card,
//         borderRadius: 50,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     btnText: {
//         color: 'white',
//         fontSize: 15,
//         textAlign: 'center',
//     },
// })

import React, { Component } from 'react';
import {
    ActivityIndicator,
    Platform,
    StyleSheet,
    Text,
    View,
    Button,
    ScrollView,
    DeviceEventEmitter,
    NativeEventEmitter,
    Switch,
    TouchableOpacity,
    Dimensions,
    Alert,
    ToastAndroid,
    BackHandler,
    FlatList,
    TextInput
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome5'
import { openDatabase } from 'react-native-sqlite-storage';
import StatusCard from '../components/Card/StatusCard';
import ReloadButton from '../components/Button/ReloadButton';
import AppLoader from '../components/Loader/AppLoader';
import Colors from '../constants/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage';

import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";

var dateFormat = require('dateformat');

import collectionStatusApi from '../api/charges'
var { height, width } = Dimensions.get('window');

var db = openDatabase({ name: 'InvoicesDatabase.db' });

export default class Home extends Component {
    _listeners = [];

    constructor(props) {
        super(props);
        this.state = {
            devices: null,
            pairedDs: [],
            foundDs: [],
            bleOpend: false,
            loading: true,
            boundAddress: '',
            debugMsg: '',
            getData:[],
            filteredData:[],
            count:0,
            totalAmount:0,
            userName: "",
            currentDate:""
        }
    }

    backAction = () => {
    
        return true;
    };

    

    componentDidMount() {//alert(BluetoothManager)
       
        BluetoothManager.isBluetoothEnabled().then((enabled) => {
            this.setState({
                bleOpend: Boolean(enabled),
                loading: false
            })
        }, (err) => {
            err
        });

        if (Platform.OS === 'ios') {
            let bluetoothManagerEmitter = new NativeEventEmitter(BluetoothManager);
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED,
                (rsp) => {
                    this._deviceAlreadPaired(rsp)
                }));
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                this._deviceFoundEvent(rsp)
            }));
            this._listeners.push(bluetoothManagerEmitter.addListener(BluetoothManager.EVENT_CONNECTION_LOST, () => {
                this.setState({
                    name: '',
                    boundAddress: ''
                });
            }));
        } else if (Platform.OS === 'android') {
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_ALREADY_PAIRED, (rsp) => {
                    this._deviceAlreadPaired(rsp)
                }));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_DEVICE_FOUND, (rsp) => {
                    this._deviceFoundEvent(rsp)
                }));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_CONNECTION_LOST, () => {
                    this.setState({
                        name: '',
                        boundAddress: ''
                    });
                }
            ));
            this._listeners.push(DeviceEventEmitter.addListener(
                BluetoothManager.EVENT_BLUETOOTH_NOT_SUPPORT, () => {
                    ToastAndroid.show("Device Not Support Bluetooth !", ToastAndroid.LONG);
                }
            ))

            var date = new Date().getDate();
            var month = new Date().getMonth() + 1;
            var year = new Date().getFullYear();
            this.setState({currentDate:date + '/' + month + '/' + year})
        }
        this.viewStudent()
        this.getStatus()
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
        );
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    async getStatus(){
        const id = await AsyncStorage.getItem("@user_ID");
        const name = await AsyncStorage.getItem("@user_name");
        let tempArray = []
        db.transaction((tx) => {
            tx.executeSql(

                `SELECT sector_id as name ,sector_db_id as id , sector_db_id as sector_id , 
                  amount_total_signed,(SELECT SUM(amount_total_signed) FROM get_invoices_and_files
                                        WHERE invoice_payment_state="paid") as total_sector_amount_received,
                  SUM(amount_residual_signed) as total_sector_receivable
                    FROM get_invoices_and_files 
                   WHERE  maintenance_agent_id=${id} `,
                [],
                (tx, results) => {
                    for (let i = 0; i < results.rows.length; ++i) {
                        tempArray.push(results.rows.item(i))
                        console.log("results.rows.item(iiiii)", results.rows.item(i))

                    }
                    this.setState({filteredData:tempArray})
                    // setFilteredData(tempArray)

                }
            );
        });
        this.setState({userName:name})
    }

    async viewStudent(){
        const id = await AsyncStorage.getItem("@user_ID");
        console.log("id",id)
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM get_invoices_and_files WHERE invoice_payment_state = "paid" AND maintenance_agent_id = ${id}`,
            [],
            (tx, results) => {
              var temp = [];
              var totalArray = []
                for (let i = 0; i < results.rows.length; ++i){
                    console.log("sdsds",results.rows.item(i))
                    temp.push(results.rows.item(i));
                    totalArray.push(results.rows.item(i).amount_total_signed);
                }
                console.log("totalArray",totalArray)
                console.log("temp",temp)     
            //   results.rows.item(i).map((item,indexs) => {
            //     // item.products.map((items,index) => {
            //     totalArray.push(total_paid_amount);
            //     // })
            //   })
              var total = 0;
              for (var i in totalArray) {
                total += totalArray[i];
              }
              console.log("total",total) 
              
              this.setState({getData:temp})
              this.setState({totalAmount:total})
            }
          );
        });
    }

    _deviceAlreadPaired(rsp) {
        var ds = null;
        if (typeof (rsp.devices) == 'object') {
            ds = rsp.devices;
        } else {
            try {
                ds = JSON.parse(rsp.devices);
            } catch (e) {
            }
        }
        if (ds && ds.length) {
            let pared = this.state.pairedDs;
            pared = pared.concat(ds || []);
            this.setState({
                pairedDs: pared
            });
        }
    }

    _deviceFoundEvent(rsp) {//alert(JSON.stringify(rsp))
        var r = null;
        try {
            if (typeof (rsp.device) == "object") {
                r = rsp.device;
            } else {
                r = JSON.parse(rsp.device);
            }
        } catch (e) {//alert(e.message);
            //ignore
        }
        //alert('f')
        if (r) {
            let found = this.state.foundDs || [];
            if (found.findIndex) {
                let duplicated = found.findIndex(function (x) {
                    return x.address == r.address
                });
                //CHECK DEPLICATED HERE...
                if (duplicated == -1) {
                    found.push(r);
                    this.setState({
                        foundDs: found
                    });
                }
            }
        }
    }

    _renderRow(rows) {
        let items = [];
        for (let i in rows) {
            let row = rows[i];
            if (row.address) {
                items.push(
                    <TouchableOpacity key={new Date().getTime() + i} style={styles.wtf} onPress={() => {
                        this.setState({
                            loading: true
                        });
                        BluetoothManager.connect(row.address)
                            .then((s) => {
                                this.setState({
                                    loading: false,
                                    boundAddress: row.address,
                                    name: row.name || "UNKNOWN"
                                })
                            }, (e) => {
                                this.setState({
                                    loading: false
                                })
                                console.log(e);
                            })

                    }}><Text style={styles.name}>{row.name || "UNKNOWN"}</Text><Text
                        style={styles.address}>{row.address}</Text></TouchableOpacity>
                );
            }
        }
        return items;
    }

    render() {
        // const { order, paid, date } = this.props.route.params
    
        return (
            <ScrollView contentContainerStyle={styles.screen}>
                {/* <View style={styles.screen}> */}
                            <View style={styles.header}>
                 <TouchableOpacity style={styles.headerIcon} onPress={() => this.props.navigation.goBack()}>
                     <Icon name="chevron-left" color="white" size={RFValue(25)} />
                 </TouchableOpacity>
                 <Text style={styles.headerText}>Collection Status</Text>
             </View>
             <View style={styles.search}>
                 {/* <Icon
                     name="search"
                     size={RFValue(15)}
                     color="#006D6D"
                 /> */}
                 <TextInput
                   placeholderTextColor={Platform.OS == "ios" && "grey"}
                     placeholder="Search Sector... e.g: Block B"
                     style={styles.searchHolder}
                    //  value={search}
                    //  onChangeText={(text) => setSearch(text)}
                />
                 <TouchableOpacity>
                    <Icon
                         name="search"
                        size={RFValue(15)}
                         color={Colors.card}
                    />
                 </TouchableOpacity>
             </View>
                    {/* <View style={styles.invoiceContainer}>
                        <View style={styles.textContainer}>
                            <Text style={styles.invoiceText}>INVOICES</Text>
                        </View> */}
                        {/* <View style={styles.detailsContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '45%', alignSelf: 'flex-start', marginTop: 10 }}>
                                <AppText style={{ fontSize: RFValue(16), color: Colors.card, fontWeight: 'bold' }}>Date:</AppText>
                                <AppText style={{ fontSize: RFValue(16) }}>{date}</AppText>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 15 }}>
                                <AppText style={{ fontSize: RFValue(16), color: Colors.card, fontWeight: 'bold' }}>Name:</AppText>
                                <AppText style={{ fontSize: RFValue(16) }}>{order.membership_id}</AppText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 }}>
                                <AppText style={{ fontSize: RFValue(16), color: Colors.card, fontWeight: 'bold' }}>Unit No:</AppText>
                                <AppText style={{ fontSize: RFValue(16) }}>{order.inventory_id}</AppText>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', marginTop: 15 }}>
                                <AppText style={{ fontSize: RFValue(16), color: Colors.card, fontWeight: 'bold' }}>File:</AppText>
                                <AppText style={{ fontSize: RFValue(16) }}>{order.file_name}</AppText>
                            </View>
                           
                        </View>
                        <View style={{ width: '100%', borderColor: Colors.card, borderWidth: 1, marginVertical: 15 }}></View> */}

                        <View style={styles.bottomContainer}>
                            <View style={styles.tableHead}>
                                <View style={styles.tableCell}><Text style={styles.tableText}>Sector</Text></View>
                                <View style={styles.tableCell}><Text style={styles.tableText}>Recievable</Text></View>
                                <View style={styles.tableCell}><Text style={styles.tableText}>Recieved</Text></View>
                                {/* <View style={styles.tableCell}><Text style={styles.tableText}>Balance</Text></View> */}
                            </View> 
                        
                            <FlatList
                                data={this.state.filteredData}
                                keyExtractor={(stock) => stock.id}
                                renderItem={({ item }) => (
                                    <StatusCard
                                        key={item.id}
                                        Sector={item.name}
                                        Recievable={item.total_sector_receivable && item.total_sector_receivable ? item.total_sector_receivable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
                                        Recieved={item.total_sector_amount_received && item.total_sector_amount_received ? item.total_sector_amount_received.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0"}
                                        // Balance={item.total_sector_receivable.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                        onPress={() => {
                                            // if(item.total_plots>0)
                                            navigation.navigate('Street Selection', item.sector_id)
                                            // else
                                            // Alert.alert("Sorry!","No plot Found")
                                        }
                                        }
                                    />
                                )

                                }
                                // refreshControl={<RefreshControl refreshing={refreshing} onRefresh={loadStatus} />}
                                // ListFooterComponent={renderFooter}

                            /> 
                       

                        {/* <View style={{ width: '100%', borderColor: Colors.card, borderWidth: 1, marginVertical: 15 }}></View> */}


                    {/* </View> */}

                    <Text>{this.state.debugMsg}</Text>
                    {/* <Text>{JSON.stringify(this.state, null, 3)}</Text> */}
                    <Text style={styles.title}>Blutooth Opended:{this.state.bleOpend ? "true" : "false"} <Text>Open BLE Before Scanning</Text> </Text>
                    <View>
                        <Switch value={this.state.bleOpend} onValueChange={(v) => {
                            this.setState({
                                loading: true
                            })
                            if (!v) {
                                BluetoothManager.disableBluetooth().then(() => {
                                    this.setState({
                                        bleOpend: false,
                                        loading: false,
                                        foundDs: [],
                                        pairedDs: []
                                    });
                                }, (err) => { console.log(err) });

                            } else {
                                BluetoothManager.enableBluetooth().then((r) => {
                                    var paired = [];
                                    if (r && r.length > 0) {
                                        for (var i = 0; i < r.length; i++) {
                                            try {
                                                paired.push(JSON.parse(r[i]));
                                            } catch (e) {
                                                //ignore
                                            }
                                        }
                                    }
                                    this.setState({
                                        bleOpend: true,
                                        loading: false,
                                        pairedDs: paired
                                    })
                                }, (err) => {
                                    this.setState({
                                        loading: false
                                    })
                                    console.log(err)
                                });
                            }
                        }} />
                        <Button color="#054749" disabled={this.state.loading || !this.state.bleOpend} onPress={() => {
                            this._scan();
                        }} title="Scan" />
                    </View>
                    <Text style={styles.title}>Connected:<Text style={{ color: "blue" }}>{!this.state.name ? 'No Devices' : this.state.name}</Text></Text>
                    <Text style={styles.title}>Found(tap to connect):</Text>
                    {this.state.loading ? (<ActivityIndicator animating={true} />) : null}
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        {
                            this._renderRow(this.state.foundDs)
                        }
                    </View>
                    <Text style={styles.title}>Paired:</Text>
                    {this.state.loading ? (<ActivityIndicator animating={true} />) : null}
                    <View style={{ flex: 1, flexDirection: "column" }}>
                        {
                            this._renderRow(this.state.pairedDs)
                        }
                    </View>
                    <Text>{''}</Text>
                    <Button color="#054749" disabled={this.state.loading || this.state.boundAddress.length <= 0}
                        title="Print Receipt" onPress={async () => {
                            try {
                                 this.setState({count:this.state.count+1})
                                //  let count = this.state.count
                                // let nameArr = order.membership_id.split(':');
                                // let splitName = nameArr[1]
                                //  let invoicePrint = Invoice; 
                                await BluetoothEscposPrinter.printerInit();
                                await BluetoothEscposPrinter.printerLeftSpace(0);
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                await BluetoothEscposPrinter.setBlob(0);
                                await BluetoothEscposPrinter.printText("New City\r\n", {
                                    encoding: 'GBK',
                                    codepage: 0,
                                    widthtimes: 1,
                                    heigthtimes: 3,
                                    fonttype: 1
                                });
                                await BluetoothEscposPrinter.setBlob(0);
                                // await BluetoothEscposPrinter.printText(this.state.userName + "\r\n", {
                                //     encoding: 'GBK',
                                //     codepage: 0,
                                //     widthtimes: 0,
                                //     heigthtimes: 1,
                                //     fonttype: 1
                                // });
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                               
                                await BluetoothEscposPrinter.printText("Settlement Report By: "+ (this.state.userName) +"\r\n", {});
                                await  BluetoothEscposPrinter.printText((this.state.currentDate)+"\n\r",{});
                               
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                              
                                // await BluetoothEscposPrinter.printText("Member ID: " + (nameArr[0]) + "\r\n", {});
                                // await BluetoothEscposPrinter.printText("Name: " + (splitName) + "\r\n", {});
                                // await BluetoothEscposPrinter.printText("Unit No: " + (order.inventory_id) + "\r\n", {});
                                // await BluetoothEscposPrinter.printText("File: " + (order.file_name) + "\r\n", {});
                                await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                let columnWidths = [12, 6, 6, 8];
                                await BluetoothEscposPrinter.printText("\r\n", {});

                                this.state.getData.map((item, index) => {
                                    let nameArr = item.membership_id.split(':');
                                    let splitName = nameArr[1]
                                    BluetoothEscposPrinter.printText("INV #: " + (item.invoice_number) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("File Name: " + (item.file_name) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("Member Name: " + (splitName) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("Block: " + (item.sector_id) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("Street: " + (item.street_id) + "\r\n", {})
                                    BluetoothEscposPrinter.printText("Unit #: " + (item.inventory_id) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("Payment Collect Date: " + (item.date_amount_paid) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("Collected Amount: " + (item.total_paid_amount) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                })
                                await BluetoothEscposPrinter.printText("\r\n", {});
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.RIGHT);
                                await BluetoothEscposPrinter.printText("Total Amount Collected: " + (this.state.totalAmount) + "\r\n", {});
                                BluetoothEscposPrinter.printText("--------------------------------\r\n", {});

                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                await BluetoothEscposPrinter.printText("Contact Us At:\r\n", {});
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                await BluetoothEscposPrinter.printText("+92-0514624091, 0514624200\r\n", {});
                                await BluetoothEscposPrinter.printText("URL : http://www.newcity.com.pk\r\n", {});
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
                            } catch (e) {
                                console.log(e.message || "ERROR");
                            }

                        }} />
                {/* </View> */}
                </View>
            </ScrollView>
        );
    }


    _scan() {
        this.setState({
            loading: true
        })
        BluetoothManager.scanDevices()
            .then((s) => {
                var ss = s;
                var found = ss.found;
                try {
                    found = JSON.parse(found);//@FIX_it: the parse action too weired..
                } catch (e) {
                    //ignore
                }
                var fds = this.state.foundDs;
                if (found && found.length) {
                    fds = found;
                }
                this.setState({
                    foundDs: fds,
                    loading: false
                });
            }, (er) => {
                this.setState({
                    loading: false
                })
                console.log('error' + JSON.stringify(er));
            });
    }

}

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#036767',
//     },

//     title: {
//         width: width,
//         backgroundColor: "#eee",
//         color: "#232323",
//         paddingLeft: 8,
//         paddingVertical: 4,
//         textAlign: "left"
//     },
//     wtf: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center"
//     },
//     name: {
//         flex: 1,
//         textAlign: "left"
//     },
//     address: {
//         flex: 1,
//         textAlign: "right"
//     },
//     screen: {
//         flex: 2,
//         backgroundColor: '#fff',
//         marginTop: 40,
//         paddingTop: 30,
//         borderTopLeftRadius: 50,
//         borderTopRightRadius: 50
//     },
//     invoiceContainer: {
//         width: '90%',
//         // borderColor:'red',
//         // borderWidth:1,
//         alignSelf: 'center',
//         backgroundColor: '#F9F9F9',
//         shadowColor: 'black',
//         shadowOffset: {
//             width: 0, height: 2
//         },
//         shadowRadius: 6,
//         shadowOpacity: 0.26,
//         elevation: 8,
//         paddingBottom: 15
//     },
//     textContainer: {
//         // borderColor:'blue',
//         // borderWidth:1,
//         borderBottomLeftRadius: 20,
//         borderBottomRightRadius: 20,
//         backgroundColor: Colors.card
//     },
//     detailsContainer: {
//         // borderWidth:1,
//         // borderColor:'purple',
//         width: '95%',
//         alignSelf: 'center',
//         padding: 5,
//         marginTop: 10
//     },
//     invoiceText: {
//         alignSelf: 'center',
//         marginVertical: Dimensions.get('window').width / 30,
//         fontSize: RFValue(20),
//         color: 'white',
//         fontWeight: 'bold'
//     },
//     tableContainer: {
//         borderWidth: 1,
//         borderColor: 'blue',
//         padding: 10,
//         width: '95%',
//         alignSelf: 'center'
//     },
//     tableHeader: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly'
//     },
//     tableContent: {
//         flexDirection: 'row',
//         justifyContent: 'space-evenly'
//     },
//     bottomContainer: {
//         // borderColor: 'red',
//         // borderWidth: 1,
//         padding: 10,
//         // borderTopLeftRadius:20,
//         // borderTopRightRadius:20,
//         // backgroundColor:'white',
//         // marginTop:20
//     },
//     summaryText: {
//         fontSize: RFValue(20),
//         color: Colors.card,
//         alignSelf: 'center',
//         fontWeight: 'bold'
//     },
//     printButton: {
//         // borderColor: 'red',
//         // borderWidth: 1,
//         width: '35%',
//         borderRadius: 10,
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-around',
//         alignSelf: 'flex-end',
//         backgroundColor: Colors.card,
//         marginRight: 20,
//         padding: 15
//     },
//     printText: {
//         color: 'white',
//         fontSize: RFValue(15),
//         fontWeight: 'bold'
//     },
//     bottomTextContainer: {
//         alignSelf: 'flex-end',
//         padding: 5,
//         marginVertical: 12,
//         // borderColor:'red',
//         // borderWidth:1,
//         width: '65%',
//         // justifyContent:'space-between'
//     }
// });



const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor:'#054749'
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
        borderTopRightRadius: 55,
        flex: 1.5,
    },
    errorText: {
        fontSize: RFValue(25),
        color: Colors.card,
        alignSelf: 'center',
    },
    tableHead: {
        // borderColor:'black',
        // borderWidth:1,
        marginTop: 50,
        // padding:2,
        width: '95%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    tableCell: {
        borderWidth: 1,
        borderColor: Colors.card,
        padding: 5,
        flex: 1,
        textAlign: 'center',
        alignItems: 'center',
        backgroundColor: Colors.card
    },
    tableText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: RFValue(14)
    },
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        // borderColor:'red',
        // borderWidth:1
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: Colors.card,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})