import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';

import {
    StyleSheet,
    View,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native'

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DashCard from '../components/Card/DashCard'
import Screen from '../components/Screen'
import RecentOrdersCard from '../components/Card/RecentOrdersCard';
import AppText from '../components/Text/AppText';
import Colors from '../constants/Colors';
import Icon from 'react-native-vector-icons/FontAwesome5';
import paymentCollectionApi from '../api/charges'
import { openDatabase } from 'react-native-sqlite-storage';
const screen = Dimensions.get('screen');
const window = Dimensions.get('window');

var db = openDatabase({ name: 'InvoicesDatabase.db' });


export default function Dashboard(props) {
    const [open, setOpen] = useState(false);
    const [payment, setPayment] = useState(null)

    const dashArray1 = [
        {
            id: 1,
            iconName: require('../assets/images/tax.png'),
            Title: 'Collection',
            move: 'Selector Selection',
        },
        {
            id: 2,
            iconName: require('../assets/images/inspection.png'),
            Title: 'Status',
            move: 'Collection Status',
        },
    ];
    const dashArray2 = [
        {
            id: 3,
            iconName: require('../assets/images/refresh.png'),
            Title: 'SynBack',
            move: 'SynBack',
        },
        {
            id: 4,
            iconName: require('../assets/images/computer.png'),
            Title: 'Profile',
            move: 'Profile',
        },
    ];

    const toggleOpen = () => {
        setOpen(!open);
        props.navigation.openDrawer('DrawerNavigator');
    };

    useFocusEffect(() => {
        (() => {
            createConnection();
        })();
    }, []);

    const createConnection = () => {


        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='get_invoices_and_files'",
                [],
                function (tx, res) {
                   
                        viewStudent()
                    
                }
            );
        })
    }

    const viewStudent = async () => {
        const id = await AsyncStorage.getItem("@user_ID");
        let tempArray = []
        let total_collection = null
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT SUM(amount_total_signed) AS today_collection FROM get_invoices_and_files WHERE invoice_payment_state="paid" AND total_paid_amount > 0 AND maintenance_agent_id=${id}`,
                [],
                (tx, results) => {
                    for (let i = 0; i < results.rows.length; ++i) {
                        setPayment(results.rows.item(i).today_collection)
                        total_collection = results.rows.item(i).amount_total_signed
                    }
                    console.log("total_collection", total_collection)

                }
            );
        });
    }



    return (
        <Screen>
            <View style={styles.screen}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={toggleOpen}
                        style={styles.headerButtonStyle}>
                        <Icon name="bars" color="#006D6D" size={RFValue(20)} />
                    </TouchableOpacity>
                    <View style={{ flexGrow: 0.1 }}></View>
                    <AppText style={{ fontSize: RFValue(20), color: 'black', fontWeight: 'bold', marginLeft: 25 }}>
                        Dashboard
                    </AppText>
                    <TouchableOpacity
                        // onPress={toggleOpen}
                        style={styles.bellButtonStyle}>
                        <Icon name="bell" color="#006D6D" size={RFValue(20)} style={styles.bellButton} />
                    </TouchableOpacity>
                </View>
                {console.log("payment", payment)}
                <RecentOrdersCard amount={payment} />
                <View style={styles.cardContainer}>
                    <View style={styles.container}>
                        {dashArray1.map((data) => (
                            <DashCard
                                title={data.Title}
                                key={data.id}
                                icon={data.iconName}
                                onMove={() => props.navigation.navigate(data.move)}
                            />
                        ))}
                    </View>
                    <View style={styles.container}>
                        {dashArray2.map((data) => (
                            <DashCard
                                title={data.Title}
                                key={data.id}
                                icon={data.iconName}
                                onMove={() => props.navigation.navigate(data.move)}
                            />
                        ))}
                    </View>
                    <TouchableOpacity
                        style={styles.lastCard}
                        onPress={() => props.navigation.navigate('Change Sector Selection')}
                    >
                        <AppText style={styles.lastText}>Change Type</AppText>
                        <View style={styles.imageContainer}>
                            <Image
                                source={require('../assets/images/charges.png')}
                                style={styles.image}
                                resizeMode="contain"
                            />
                        </View>
                    </TouchableOpacity>
                </View>

            </View>
        </Screen>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: 'white'
    },
    container: {
        width: screen.width,
        backgroundColor: 'white',
        overflow: 'hidden',
        flexDirection: 'row',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'flex-start',
    },
    card: {
        width: window.width * 0.8,
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-evenly',
        marginLeft: window.width * 0.1,
        flex: 0.7,
        height: 100,
        // alignSelf:'center'
    },
    cardContainer: {
        alignContent: 'center',
        // marginTop: window.height * 0.1,
        marginTop: 10,
        backgroundColor: '#FFFFFF'
    },
    header: {
        flexDirection: 'row',
        // justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 15,
        flex: 0.35,
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        // borderColor:'red',
        // borderWidth:1
    },
    headerButtonStyle: {
        borderColor: 'white',
        borderWidth: 1,
        backgroundColor: 'white',
        borderRadius: 50,
        alignSelf: 'center'
    },
    bellButtonStyle: {
        backgroundColor: 'white',
        borderRadius: 50,
        alignSelf: 'center',
        marginLeft: '55%',
        marginRight: 10
    },
    bellButton: {

    },
    lastCard: {
    
        marginVertical: 10,
        padding: 7,
        width: '55%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-around',
        shadowColor: 'black',
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: '#F9F9F9',
        // padding:20,
        borderRadius: 15,
        overflow: 'hidden',
        alignItems: 'center',
        height: '20%'
    },
    lastText: {
        color: Colors.textColor,
        fontSize: RFValue(15),
        fontWeight: 'bold',
        marginLeft: 15
    },
    imageContainer: {
        // borderColor:'red',
        // borderWidth: 1,
        width: 100,
        height: 100,
        marginLeft: 20,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: RFValue(60),
        height: RFValue(60),
        alignSelf: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        alignSelf: 'center',
        marginTop: 60,
        borderColor: 'red',
        borderWidth: 1,
        // padding:10
    },
    titleText: {
        fontSize: RFValue(20)
    },
    imgContainer: {
        width: '90%',
        alignSelf: 'center',
        borderColor: 'red',
        borderWidth: 1,
        height: '10%'
    },
    img: {
        // width: '100%',
        resizeMode: 'contain',
        width: 500,
        height: 200,
        alignSelf: 'center',
        marginTop: RFValue(50),
        marginBottom: 50
    }
})
