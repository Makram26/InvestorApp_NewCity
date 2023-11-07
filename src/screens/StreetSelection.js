import React, { useEffect, useContext, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, TextInput, FlatList, Alert, RefreshControl, ActivityIndicator } from 'react-native'

import MaintenanceCard from '../components/Card/MaintenanceCard'
import Colors from '../constants/Colors'
import LinearGradient from 'react-native-linear-gradient';
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome5'
import ReloadButton from '../components/Button/ReloadButton';
import { openDatabase } from 'react-native-sqlite-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

var db = openDatabase({ name: 'InvoicesDatabase.db' });


import invoicesOrderApi from '../api/charges'

export default function StreetSelection({ route, navigation }) {

    const [sectorInfo, setSectorInfo] = useState([]);
    const [invoiceInfo, setInvoiceInfo] = useState([]);
    const [searchStreet,setSearchStreet] = useState([]);
    const [filteredData, setFilteredData] = useState([])
    const [filteredPlot, setFilterPlot] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] = useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [isloading, setIsLoading] = useState(false);
    const [footerButton, setFooterButton] = useState(false);
    const [searchData, setSearchData] = useState(false);


    const [offset, setOffset] = useState(0);
    const order = route.params;
    console.log("order", order)

    useEffect(async () => {
        await viewStudent();
    }, []);


    const searchFilter = (text) => {
        if (text) {
            const newData = filteredData.filter((item) => {
                const itemData = item.street_id ? item.street_id.toUpperCase() : ''.toUpperCase();
                const textData = text.toUpperCase()
                return itemData.indexOf(textData) > -1
            })
            setFilteredData(newData)
            setSearch(text)
        } else {
            setFilteredData(filteredData)
            setSearch(text)
        }
    }



    const viewStudent = async () => {
        const id = await AsyncStorage.getItem("@user_ID");
        console.log("id",id)
        setIsLoading(true)
        db.transaction((tx) => {
            tx.executeSql(
                `SELECT DISTINCT street_db_id,unit_class_id,COUNT(DISTINCT file_id) AS total_plot,SUM(amount_residual_signed) AS total_due_amount,file_name,file_id,street_id 
                FROM get_invoices_and_files 
                WHERE sector_db_id = ${order} 
                AND unit_class_id = 'House' AND maintenance_agent_id = ${id} 
                GROUP BY street_db_id`,
                [],
                (tx, results) => {
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        console.log("results.rows.length",results.rows.item(i))
                        
                        temp.push({
                            "street_db_id": results.rows.item(i).street_db_id, "total_plot": results.rows.item(i).total_plot,
                            "total_due_amount": results.rows.item(i).total_due_amount,
                            "street_id":results.rows.item(i).street_id,
                            "file_name": results.rows.item(i).file_name,
                            "file_id": results.rows.item(i).file_id
                        });
                    }
                    console.log(temp)
                    setFilteredData(temp)
                    setIsLoading(false)
                }
            );
        });
    }


    

    function arrUnique(arr) {
        var cleaned = [];
        arr.forEach(function (itm) {
            var unique = true;
            cleaned.forEach(function (itm2) {
                if (_.isEqual(itm, itm2)) unique = false;
            });
            if (unique) cleaned.push(itm);
        });
        console.log("cleaned", cleaned)
        return cleaned;
    }

   

    const loadSearchInventory = async (search) => {
        setInvoiceInfo([]);
        const response = await invoicesOrderApi.getSearchedStreets(search, "True");
        setLoading(false)
        setRefreshing(false);
        setSearchData(true)
        if (response.ok && response.data && response.data.result && response.data.result.length > 0) {
            setInvoiceInfo(response.data.result[0]);
            console.log(response.data.result[0])
            setErrors(false)
            setRefreshing(false);
        } else {
            setErrors(true)
            setRefreshing(false);
        }
    }


  
    return (
        <LinearGradient colors={['#054749', '#40E5EF', '#14B5BF']} style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Street Selection</Text>
            </View>
            <View style={styles.search}>
                {/* <Icon
                    name="search"
                    size={RFValue(15)}
                    color="#006D6D"
                /> */}
                <TextInput
                    placeholder="Search Street... e.g: A-1"
                    style={styles.searchHolder}
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                />
                <TouchableOpacity onPress={() => viewStudent()}>
                    <Icon
                        name="search"
                        size={RFValue(15)}
                        color={Colors.card}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.dataCard}>
                {
                    (searchData == false && !isloading) ?
                        <FlatList
                            data={filteredData}
                            keyExtractor={(stock) => stock.id}
                            renderItem={({ item,index}) => {
                                
                                return (
                                    <MaintenanceCard
                                        key={item.id}
                                        street={item.street_id}
                                        units={item.total_plot}
                                        amount={item.total_due_amount}
                                        onPress={() => {
                                            navigation.navigate('Maintenance Charges Payment', item.street_db_id)
                                        }
                                        }
                                    />
                                )
                            }

                            }
                        /> 
                    :
                        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                            <ActivityIndicator color={"green"} />
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
        marginHorizontal: 15
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
    selectText: {
        color: '#333333',
        marginLeft: RFValue(45),
        marginVertical: 15,
        fontWeight: 'bold',
        fontSize: RFValue(20),
        fontFamily: 'Poppins'
    },
    bottomContainer: {
        backgroundColor: 'white',
        marginTop: RFValue(15),
        borderTopLeftRadius: 55,
        borderTopRightRadius: 55
    },
    dataCard: {
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop: 20,
        paddingTop: 40,
        flex: 1
    },
    errorText: {
        fontSize: RFValue(25),
        color: Colors.card,
        alignSelf: 'center',
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
        alignSelf: 'flex-end'
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})
