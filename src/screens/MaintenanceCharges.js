import React, {useEffect, useContext, useState} from 'react'
import { StyleSheet, View, TextInput, FlatList, TouchableOpacity, Text, Button, ActivityIndicator,RefreshControl , Platform} from 'react-native';
import { RFValue } from "react-native-responsive-fontsize";
import { useFocusEffect } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';


import Colors from '../constants/Colors'
import Card from '../components/Card/Card'
import ReloadButton from '../components/Button/ReloadButton';
import { openDatabase } from 'react-native-sqlite-storage';
import LinearGradient from 'react-native-linear-gradient';
import invoicesOrderApi from '../api/charges';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
var db = openDatabase({ name: 'InvoicesDatabase.db' });

export default function MaintenanceCharges({route, navigation}) {
    const [invoiceInfo, setInvoiceInfo] = useState([]);

    const [filteredData, setFilteredData] = useState([])
    const [search, setSearch] = useState('')
    const [currentDate, setCurrentDate] = useState('');
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false)
    const [errors, setErrors] =useState(false)
    const [refreshing, setRefreshing] = useState(false);
    const [footerButton, setFooterButton] = useState(false);
    const [isloading,setIsLoading]  = useState(false);

    const [searchData, setSearchData] = useState(false)


    const order = route.params;
    
    useFocusEffect(
        React.useCallback(() => {
          const fetchUser = async () => {
            // setFilterState({ ...filterState, isAll: false, isUnRead: true })
            // setRefreshing(true);
            // await loadMaintenance();
            viewStudent();
          }
          fetchUser();
        }, [])
      );

      
      

    const viewStudent = async () => {
        setIsLoading(true)
        const id = await AsyncStorage.getItem("@user_ID");
        db.transaction((tx) => {
          tx.executeSql(
            `SELECT * ,SUM(amount_residual_signed) AS total_update_ammount
            FROM get_invoices_and_files
            WHERE street_db_id = ${order} AND unit_class_id = 'House' AND maintenance_agent_id = ${id} 
            GROUP BY file_id `,
            [],
            (tx, results) => {
              var temp = [];
              for (let i = 0; i < results.rows.length; ++i){
                   temp.push(results.rows.item(i));  
              }
              setFilteredData(temp)  
              setIsLoading(false)
            }
          );
        });
    }

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
    
    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setCurrentDate(
          date + '/' + month + '/' + year
        );
    }, []);
    
    // const loadMaintenance = async () => {
    //     setRefreshing(true);
    //     // setFilteredData([]);
    //     setFooterButton(false)
    //     setSearchData(false)
    //     const response = await invoicesOrderApi.getInventory(order,offset);
    //     setLoading(false)
    //     setRefreshing(false);
    //     setFooterButton(false)
    //     setSearchData(false)
    //     if (response.ok && response.data && response.data.result && response.data.result.length > 0) {
    //         // setSectorInfo(response.data.result.slice(0, 10));
    //         // setInvoiceInfo([...invoiceInfo, ...response.data.result]);
    //         setFilteredData([...filteredData, ...response.data.result]);
    //         setOffset(offset + 10);
    //         setErrors(false)
    //         setRefreshing(false);
    //         setFooterButton(true)
    //         setSearchData(false)
    //     } else {
    //         // console.log('Error in getting Invoice Data');
    //         setErrors(true)
    //         setRefreshing(false);
           
    //     }
    // }

    const loadSearchInventory = async (search) => {
        setInvoiceInfo([]);
        const response = await invoicesOrderApi.getSearchedInventory(search);
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

    const renderFooter = () => {
        return (
          //Footer View with Load More button
          <View style={styles.footer}>
            {
                (footerButton == true) ? 
                <TouchableOpacity
                    activeOpacity={0.9}
                    // onPress={loadMaintenance}
                    //On Click of button load more data
                    style={styles.loadMoreBtn}
                >
                    <Icon
                        name="arrow-down"
                        size={30}
                        color="white"
                    />
                </TouchableOpacity> : null
            }
          </View>
        );
    };

    return (
        <LinearGradient colors={['#054749', '#40E5EF', '#14B5BF']} style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Maintenance Charges Payment</Text>
            </View>
            <View style={styles.search}>
                <TextInput
                   placeholderTextColor={Platform.OS == "ios" && "grey"}

placeholder="Search Inventory... e.g: A-1-1"
                    style={styles.searchHolder}
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                />
                <TouchableOpacity onPress={()=>viewStudent()}>
                    <Icon
                        name="search"
                        size={RFValue(15)}
                        color={Colors.card}
                    />
                </TouchableOpacity>
            </View>
            
            <View style={styles.dataCard}>
                    <FlatList
                    data={filteredData}
                    renderItem={({item}) => {

                            return (
                                <Card
                                    key={item.file_id}
                                    unit={item.inventory_id}
                                    todayDate={currentDate}
                                    buyerName={item.membership_id}
                                    category={item.category_id}
                                    amount={item.total_update_ammount}
                                    product={item.unit_category_type_id}
                                    type={item.unit_class_id}
                                    size={item.size_id}
                                    onPress={()=>navigation.navigate('Charges Details', item)}
                                />
                            )
                    }}

                  
                    />
                
                <View>
                </View>
                
                
            </View>
            
            
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.card
    },
    header: {
        flexDirection: 'row',
        alignItems:'center',
        marginTop:20
    },
    headerText: {
        color: 'white',
        // alignSelf:'center',
        fontWeight:'bold',
        fontSize:RFValue(18),
        marginHorizontal:10
    },
    headerIcon: {
        marginHorizontal:15,
        fontWeight:'bold'
    },
    search: {
        // borderColor:'black',
        // borderWidth:1,
        borderColor:'#707070',
        borderWidth:1,
        width:'80%',
        alignSelf:'center',
        marginVertical:20,
        flexDirection:'row',
        alignItems:'center',
        paddingLeft:15,
        backgroundColor:'white',
        borderRadius:10,
        shadowOffset:{
            width:0, height:2
        },
        shadowRadius:6,
        shadowOpacity:0.26,
        elevation:8,
    },
    searchHolder:{
        paddingLeft:15,
        fontSize:RFValue(15),
        // borderColor:'red',
        // borderWidth:1,
        width:'90%',
        // overflow:'hidden'
        color:'#C3C3C3'
    },
    dataCard: {
        backgroundColor: 'white',
        borderTopLeftRadius: 50,
        borderTopRightRadius: 50,
        marginTop:20,
        paddingTop:40,
        flex:1
    },
    errorText: {
        fontSize: RFValue(25),
        color: Colors.card,
        alignSelf:'center',

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
        alignSelf:'flex-end'
    },
    btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
    },
})
