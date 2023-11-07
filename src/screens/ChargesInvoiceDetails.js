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
    FlatList
} from 'react-native';
import { BluetoothEscposPrinter, BluetoothManager, BluetoothTscPrinter } from "react-native-bluetooth-escpos-printer";
//  import EscPos from "./escpos";
//  import Tsc from "./tsc";

import Icon from 'react-native-vector-icons/FontAwesome5'
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppText from '../components/Text/AppText'
import Colors from '../constants/Colors'
import { openDatabase } from 'react-native-sqlite-storage';
import InvoiceCard from '../components/Card/InvoiceCard';
var db = openDatabase({ name: 'InvoicesDatabase.db' });
// var dateFormat = require('dateformat');
// var db = openDatabase({ name: 'InvoicesDatabase.db' });

// const base64Image = "iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAMAAABg3Am1AAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAA8FBMVEUAAABCQkJDQ0NFRUU/Pz9BQUFAQEBERERDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0MAAAA0ZZMIAAAATnRSTlMAAAAAAAAAABWFz8JdBQFHt9OYIxSi/PBsBFHjvCSk/vJt5b7mo26h75ziIZkD1csRXvpziwvx+QadveRSSA3XF6r31DMPOSLWzMTZFgd4wftfAAAAAWJLR0QAiAUdSAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAaBJREFUSMe11dlSwjAUgOE2WmUTQRBtBQVBREREQEVUFkHcz/s/jklbQ7YOhwtz2fzftJ1OTi0rWDaJxRPJ1A6xxEXSu5nsXo7Ylrpskt8vABwcuqIgG94RABRLmtgk+eMTugXliiAI8U7ZRaiqwvnrJUH7WnBRFfR5zsKeinoohN4XRHyeZc8F2RJ6SSh9KJReeCpH7QOh9st76L3/5lrPRf5c6wEaF039IlQvmYgXAL1aVxQk8D20YxQk1wDXHQpuGui+22Pv4FbK2L5/639Rt44TYY8WvEcKoUcJqUcIpV8ptN4Xd5H9vd5TMXiIBMOOoXe8x0igzJKgf6pB9JJmCaIXJkPYb6/oFYHoJYHqxXllo/qlcDxcz8VzE9lTkWInLoPuAZIjCrJrgPGEgtYaYDqgIFc07LwMTbNkNmfvQEpVbafbfzXMkvbCn622Lth50adP2BuEf740MVvwP4oi+LyShNArQphXgpB69v/jQppXXCi9IJR5FQqt50KbV74w9Ey8td4/etq8Sn1+TeeGngn3u5PW7myPJj/G/v/WL4DMswebZ4AxAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE1LTA2LTI1VDA4OjQ0OjQ2KzA4OjAww1b9dwAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxNS0wNi0yNVQwODo0NDo0NiswODowMLILRcsAAAAASUVORK5CYII=";
var { height, width } = Dimensions.get('window');

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
            count:0,
            


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
        }
        this.viewStudent()
        this.backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            this.backAction
          );
    }

    componentWillUnmount() {
        this.backHandler.remove();
      }
    async viewStudent(){
        const id = await AsyncStorage.getItem("@user_ID");
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * FROM get_invoices_and_files WHERE file_id = ${this.props.route.params.order.file_id} AND invoice_payment_state = "paid"  AND maintenance_agent_id = ${id}`,
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i){
                  console.log(results.rows.item(i))
                temp.push(results.rows.item(i));
              }    
              this.setState({getData:temp})
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
        const { order, paid, date } = this.props.route.params
        console.log(order)

        const nameArr = order.membership_id.split(':');
        const splitName = nameArr[1]
    
        return (
            <ScrollView style={styles.container}>
                <View style={styles.screen}>
                    <View style={styles.invoiceContainer}>
                        <View style={styles.textContainer}>
                            <AppText style={styles.invoiceText}>INVOICES</AppText>
                        </View>
                        <View style={styles.detailsContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '45%', alignSelf: 'flex-start', marginTop: 10 }}>
                                <AppText style={{ fontSize: RFValue(16), color: Colors.card, fontWeight: 'bold' }}>Date:</AppText>
                                <AppText style={{ fontSize: RFValue(16) }}>{date}</AppText>

                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', alignItems: 'center', marginTop: 15 }}>
                                <AppText style={{ fontSize: RFValue(16), color: Colors.card, fontWeight: 'bold' }}>Name:</AppText>
                                <AppText style={{ fontSize: RFValue(16),flex:1,marginLeft:10 }}>{splitName}</AppText>
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
                        <View style={{ width: '100%', borderColor: Colors.card, borderWidth: 1, marginVertical: 15 }}></View>

                        <View style={styles.bottomContainer}>
                            <Text style={styles.summaryText}>SUMMARY</Text>
                            <FlatList
                                data={this.state.getData}
                                keyExtractor={(stock) => stock.id}
                                renderItem={({ item, index }) => {
                                    return(
                                    <InvoiceCard
                                        key={item.invoice_id}
                                        name={item.invoice_number}
                                        date={item.invoice_date_due}
                                        amount={item.amount_residual_signed}
                                        paid={item.amount_total_signed}
                                    />
                                    )
                                }}
                            />
                        </View>

                        <View style={{ width: '100%', borderColor: Colors.card, borderWidth: 1, marginVertical: 15 }}></View>


                    </View>

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
                        <Button disabled={this.state.loading || !this.state.bleOpend} onPress={() => {
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
                    <Button disabled={this.state.loading || this.state.boundAddress.length <= 0}
                        title="Print Receipt" onPress={async () => {
                            try {
                                 this.setState({count:this.state.count+1})
                                 let count = this.state.count
                                let nameArr = order.membership_id.split(':');
                                let splitName = nameArr[1]
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
                                // await BluetoothEscposPrinter.printText((date) + "\r\n", {
                                //     encoding: 'GBK',
                                //     codepage: 0,
                                //     widthtimes: 0,
                                //     heigthtimes: 0,
                                //     fonttype: 1
                                // });
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                if(count%2==0)
                                await BluetoothEscposPrinter.printText(""+"Customer copy"+ "\r\n", {});
                                else
                                await BluetoothEscposPrinter.printText("  " + "Merchant copy"+ "\r\n", {});

                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                              
                                await BluetoothEscposPrinter.printText("Member ID: " + (nameArr[0]) + "\r\n", {});
                                await BluetoothEscposPrinter.printText("Name: " + (splitName) + "\r\n", {});
                                await BluetoothEscposPrinter.printText("Payment Date: " + (date) + "\r\n", {});
                                await BluetoothEscposPrinter.printText("File: " + (order.file_name) + "\r\n", {});
                                await BluetoothEscposPrinter.printText("Block: " + (order.sector_id) + "\r\n", {});
                                await BluetoothEscposPrinter.printText("Street: " + (order.street_id) + "\r\n", {});
                                await BluetoothEscposPrinter.printText("Unit #: " + (order.inventory_id) + "\r\n", {});
                                await BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                let columnWidths = [12, 6, 6, 8];
                                await BluetoothEscposPrinter.printText("\r\n", {});

                                this.state.getData.map((item, index) => {
                                
                                    BluetoothEscposPrinter.printText("INV #: " + (item.invoice_number) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("Due Date: " + (item.invoice_date_due) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("Due Amount: " + (item.amount_residual_signed) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("Paid Amount: " + (item.amount_total_signed) + "\r\n", {});
                                    BluetoothEscposPrinter.printText("--------------------------------\r\n", {});
                                    
                                })
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                await BluetoothEscposPrinter.printText("Contact Us:\r\n", {});
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.CENTER);
                                await BluetoothEscposPrinter.printText("+92-0514624091, 0514624200\r\n", {});
                                await BluetoothEscposPrinter.printText("URL : http://www.newcity.com.pk\r\n", {});
                                await BluetoothEscposPrinter.printerAlign(BluetoothEscposPrinter.ALIGN.LEFT);
                                await BluetoothEscposPrinter.printText("\r\n\r\n\r\n", {});
                            } catch (e) {
                                console.log(e.message || "ERROR");
                            }

                        }} />
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#036767',
    },

    title: {
        width: width,
        backgroundColor: "#eee",
        color: "#232323",
        paddingLeft: 8,
        paddingVertical: 4,
        textAlign: "left"
    },
    wtf: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    name: {
        flex: 1,
        textAlign: "left"
    },
    address: {
        flex: 1,
        textAlign: "right"
    },
    screen: {
        flex: 2,
        backgroundColor: '#fff',
        marginTop: 40,
        paddingTop: 30,
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50
    },
    invoiceContainer: {
        width: '90%',
        // borderColor:'red',
        // borderWidth:1,
        alignSelf: 'center',
        backgroundColor: '#F9F9F9',
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        paddingBottom: 15
    },
    textContainer: {
        // borderColor:'blue',
        // borderWidth:1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        backgroundColor: Colors.card
    },
    detailsContainer: {
        // borderWidth:1,
        // borderColor:'purple',
        width: '95%',
        alignSelf: 'center',
        padding: 5,
        marginTop: 10
    },
    invoiceText: {
        alignSelf: 'center',
        marginVertical: Dimensions.get('window').width / 30,
        fontSize: RFValue(20),
        color: 'white',
        fontWeight: 'bold'
    },
    tableContainer: {
        borderWidth: 1,
        borderColor: 'blue',
        padding: 10,
        width: '95%',
        alignSelf: 'center'
    },
    tableHeader: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    tableContent: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    bottomContainer: {
        // borderColor: 'red',
        // borderWidth: 1,
        padding: 10,
        // borderTopLeftRadius:20,
        // borderTopRightRadius:20,
        // backgroundColor:'white',
        // marginTop:20
    },
    summaryText: {
        fontSize: RFValue(20),
        color: Colors.card,
        alignSelf: 'center',
        fontWeight: 'bold'
    },
    printButton: {
        // borderColor: 'red',
        // borderWidth: 1,
        width: '35%',
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        alignSelf: 'flex-end',
        backgroundColor: Colors.card,
        marginRight: 20,
        padding: 15
    },
    printText: {
        color: 'white',
        fontSize: RFValue(15),
        fontWeight: 'bold'
    },
    bottomTextContainer: {
        alignSelf: 'flex-end',
        padding: 5,
        marginVertical: 12,
        // borderColor:'red',
        // borderWidth:1,
        width: '65%',
        // justifyContent:'space-between'
    }
});
