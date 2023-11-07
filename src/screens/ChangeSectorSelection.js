import React, { useState } from 'react'
import { StyleSheet, Text, View, ScrollView, TextInput, TouchableOpacity } from 'react-native'

import SectorCard from '../components/Card/SectorCard'
import AppText from '../components/Text/AppText'
import { RFValue } from "react-native-responsive-fontsize";
import Icon from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient';

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

export default function ChangeSectorSelection({ navigation }) {
    const [filteredData, setFilteredData] = useState(sectorArray)
    const [search, setSearch] = useState('')

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


    return (
        <LinearGradient colors={['#054749', '#40E5EF', '#14B5BF']} style={styles.screen}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.headerIcon} onPress={() => navigation.goBack()}>
                    <Icon name="chevron-left" color="white" size={RFValue(25)} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Sector Selection</Text>
            </View>
            <View style={styles.search}>
                <Icon
                    name="search"
                    size={RFValue(15)}
                    color="#006D6D"
                />
                <TextInput
                    placeholder="Search Sector..."
                    style={styles.searchHolder}
                    value={search}
                    onChangeText={(text) => searchFilter(text)}
                />
            </View>
            <View style={styles.bottomContainer}>
                <AppText style={styles.selectText}>Select Your Sector</AppText>
                <ScrollView>
                    <View style={styles.cardContainer}>
                        {filteredData.map((data) => (
                            <SectorCard
                                key={data.id}
                                name={data.Name}
                                onMove={() => navigation.navigate('changeStreet', data.secId)}
                            />
                        ))}
                    </View>
                </ScrollView>
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
