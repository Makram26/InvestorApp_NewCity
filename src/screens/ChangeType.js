import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, View, TouchableOpacity,Platform, Dimensions,TextInput,ActivityIndicator ,FlatList,Picker,Alert} from 'react-native'

import Colors from '../constants/Colors'
import ChangeTypeCard from '../components/Card/ChangeTypeCard';
// import Card from '../components/Card/Card'

import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';
import DropDownPicker from 'react-native-dropdown-picker';

import PlotTypeApi from '../api/changeType'


export default function ChangeType({navigation,route}) {

    const plots = route.params;
    const [currentDate, setCurrentDate] = useState('');
    const [allEmployees, setAllEmployees] = useState([]);
    const [orderInfo, setOrderInfo] = useState([]);
    const [ids, setId] = useState();
    const [value, setValue] = useState(null);
    const [open, setOpen] = useState(false);
    const [isloading,setIsloading] = useState(false);

    // console.log("data",data)

    useEffect(() => {
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        setCurrentDate(
          date + '/' + month + '/' + year
        );
    }, []);

   

    useEffect(() => {
        (async () => {
          try {
            let params = [];
            const response = await PlotTypeApi.getPlotTypes();
            if (response.ok) {
                // console.log('DropDown Data');
                let customer = (response.data)
                // console.log("customer",customer)
                let customerArray = (JSON.stringify(customer))
            
                // console.log("customerArray", customerArray)
                customer.map((item,index)=>{
                    params.push({label: item.name, value: item.id})
                })
                // console.log("params", params)
                setAllEmployees(customerArray)
                setOrderInfo(params)
            } else {
            //   console.log('Error in getting');
            }
          } catch (error) {
            console.error(error);
          }
        })();
    }, []);


  const  updateHandler = () =>{
    setIsloading(true)
        fetch(`http://23.101.22.149:8074/object/plot.inventory/${plots.plot_id}/create_unit_type_request`, {
            method: 'POST',
            headers: {
                         Accept: 'application/json',
                         'Content-Type': 'application/json',
                        },
            body:JSON.stringify({
                "jsonrpc": "2.0",
                "params": {
                        "args":[],
                        "kwargs":{
                            "data":
                                {"unit_class_id":ids}
                        }
                    }    
            })
            })
            .then((response) => response.json())
            .then((responseJson) => {
                       setIsloading(false) 
                    //  console.log("res",responseJson)
                    if( responseJson.error && responseJson.error.message && responseJson.error.message.includes("Server Error"))
                        Alert.alert("Sorry","Record already exists against this plot.")
                    else if(responseJson.result) {
                        Alert.alert(
                            "Success",
                            "Unit Type Request Created SuccessFully",
                            [
                              { text: "OK", onPress: () => navigation.navigate('changeStreet') }
                            ]
                          );
                        // navigation.navigate('changeStreet')
                    }
            })
            .catch((error) => {
              console.error(error);
            });
    }
    
    return (
        <LinearGradient colors={['#054749', '#40E5EF', '#14B5BF']} style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-back-outline" color="white" size={RFValue(30)} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Change Type</Text>
            </View>
            <View style={styles.search}>
                <Icon
                    name="search-outline"
                    size={RFValue(15)}
                    color={Colors.card}
                />
                <TextInput
                        placeholderTextColor={Platform.OS == "ios" && "grey"}
                    placeholder="Search Charges..."
                    style={styles.searchHolder}
                    // value={search}
                    // onChangeText={(text) => searchFilter(text)}
                />
            </View>
            
            <View style={styles.dataCard}>
                <View style={styles.card}>
                    <View style={styles.leftContainer}>
                        <Text style={styles.type}>{plots.inventory_id}</Text>
                        <Text style={styles.date}>{currentDate}</Text>
                    </View> 
                    <View style={styles.rightContainer}>
                        <View style={{alignItems:'flex-start'}}>
                            <View style={styles.content}>
                                <Icon
                                    name = "person-outline"
                                    size = {RFValue(25)}
                                    color = {Colors.card}
                                />
                                <Text style={styles.name}>{plots.membership_id}</Text>
                            </View>
                            <View style={styles.content1}>
                                <Icon
                                    name = "home-outline"
                                    size = {RFValue(25)}
                                    color = {Colors.card}
                                />
                                <Text style={styles.name}>{plots.category_id}</Text>
                            </View>
                            <View style={styles.content1}>
                                <Icon
                                    name = "cash-outline"
                                    size = {RFValue(25)}
                                    color = {Colors.card}
                                />
                                <Text style={styles.name}>{plots.total_due_amount}</Text>
                            </View>
                        </View>
                        <View style={styles.bottomContainer}>
                            <View style={{flexDirection:'column', alignItems:'center'}}>
                                <Text style={styles.heading}>PRODUCT</Text>
                                <Text style={styles.text}>{plots.unit_category_type_id}</Text>
                            </View>
                            <View style={{flexDirection:'column', alignItems:'center'}}>
                                <Text style={styles.heading}>SIZE</Text>
                                <Text style={styles.text}>{plots.size_id}</Text>
                            </View>
                        </View>
                        <View style={{alignSelf:'center',borderWidth:1,borderRadius:5}}>
                        <Picker
       prompt='Options'
        style={{ height: 30, width: 140 }}
        onValueChange={(itemValue, itemIndex) => 
          setId(itemValue)
        }
      >
         {orderInfo.map((item,index)=>{
            //    console.log("item",item)
             return(
             <Picker.Item label={item.label} value={item.value}/>
                  )
               })}
       
       
      </Picker>
                        </View>
                    </View>
                </View>
                <TouchableOpacity
                                style={styles.loginButton}
                               
                                // onPress={() => navigation.navigate('Dashboard')}
                                // onPress={() => console.log(email,password)}
                                onPress={()=>updateHandler()}
                            >
                                {isloading?
                              <ActivityIndicator size="large" color="white" />:
                                <Text style={styles.loginText}>Update</Text>
                                }
                            </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        backgroundColor: Colors.card
    },
    loginText: {
        fontSize: RFValue(20),
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold'
    },
    loginButton: {
        // borderWidth: 1,
        // borderColor: 'purple',
        width: '80%',
        alignSelf: 'center',
        padding: 12,
        backgroundColor: Colors.card,
        shadowOffset: {
            width: 0, height: 2
        },
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        borderRadius: 50,
        marginTop: 10,
        // flexDirection:'row'
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
        fontSize:RFValue(25),
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
    card: {
        // borderColor: 'black',
        // borderWidth: 1,
        marginVertical: 10,
        // padding: 10,
        width: '90%',
        alignSelf:'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
       

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
