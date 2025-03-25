import { View, Text ,TouchableOpacity, ToastAndroid} from 'react-native'
import React, {useState,useEffect,useContext} from 'react'
import { useNavigation,useRouter } from 'expo-router'
import CalendarPicker from "react-native-calendar-picker";
import { getMonth } from 'date-fns';
import moment from 'moment'
import { CreateTripContext } from '../../context/CreateTripContext';

const Colors = {
      BLACK: '#000000',
      WHITE: '#FFFFFF',
      GRAY: '#808080', // Add a shade of gray
    };
export default function Selectdates() {
  const navigation=useNavigation();
  const[startDate,setStartDate]=useState();
  const[endDate,setEndDate]=useState();
  const router=useRouter();
  const {tripData,setTripData} = useContext(CreateTripContext);
  useEffect(()=>{
    navigation.setOptions({
      headerShown:true,
      headerTransparent:true,
      headerTitle:''
    })

  },[])
  const onDateChange=(date,type)=>{
    console.log(date,type)
    if(type=='START_DATE')
    {
      setStartDate(moment(date))
    }
    else{
      setEndDate(moment(date))
    }
  }
  const OndateSelectionContinue=()=>{
    if(!startDate&&!endDate)
    {
      ToastAndroid.show('Please select Start and End Date',ToastAndroid.LONG)
      return;
    }
     const totalNoOfDays=endDate.diff(startDate,'days');
     console.log(totalNoOfDays+1);
     setTripData({
      ...tripData,
      startDate:startDate,
      endDate:endDate,
      totalNoOfDays:totalNoOfDays+1
     })
     router.push('create-trip/selectbudget')
  }
  return (
    <View style={{
      padding:25,
      paddingTop:75,
      backgroundColor:Colors.WHITE,
      height:'100%'

    }}>
      <Text style={{
        fontWeight:'bold',
        fontSize:35,
        marginTop:20
      }}></Text>
      <View style={{
               marginTop:30
      }}>
       <CalendarPicker 
      //  onDateChange={this.onDateChange} 
       onDateChange={onDateChange} 
       allowRangeSelection={true}
       minDate={new Date()}
       maxRangeDuration={5}
       selectedRangeStyle={{
        backgroundColor:Colors.BLACK}}
        />
       </View>

       <TouchableOpacity 
             onPress={OndateSelectionContinue}
             style={{
               padding:15,
               backgroundColor:'#000',
               borderRadius:15,
               marginTop:20
             }}>
              
               <Text style={{
                 color:'#fff',
                 textAlign:'center',
                 fontFamily:'outfit-medium',
                 fontSize:18  
               }}>
                 Continue
               </Text>
               
             </TouchableOpacity>
    </View>
  )
}
// import { View, Text, TouchableOpacity, ToastAndroid } from 'react-native'
// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigation, useRouter } from 'expo-router';
// import CalendarPicker from "react-native-calendar-picker";
// import moment from 'moment';
// import { CreateTripContext } from '../../context/CreateTripContext';

// export default function SelectDates() {
//     const navigation = useNavigation();
//     const [startDate,setStartDate] = useState();
//     const [endDate,setEndDate] = useState();
//     const {tripData,setTripData} = useContext(CreateTripContext);
//     const router = useRouter();
//     useEffect(() => {
//         navigation.setOptions({
//           headerShown: true,
//           headerTransparent: true,
//           headerTitle: " ",
//         });
//     }, []);

//     const onDateChange =(date,type)=>{
//             console.log(date,type);
//             if(type=='START_DATE'){
//                 setStartDate(moment(date))
//             }
//             else{
//                 setEndDate(moment(date))
//             }
//     }
//     const OnDateSelectionContinue =()=>{
//         if(!startDate && !endDate)
//         {
//             ToastAndroid.show("Please Select Dates",ToastAndroid.SHORT)
//             return ;
//         }
//         const totalNoOfDays=endDate.diff(startDate,'days');
//         console.log(totalNoOfDays+1);
//         setTripData({
//             ...tripData,
//             startDate:startDate,
//             endDate:endDate,
//             totalNoOfDays:totalNoOfDays+1
//         })
//         router.push('/create-trip/select-budget')
//     }
//   return (
//     <View style={{
//         padding:25,
//         paddingTop:75,
//         backgroundColor:'#fff',
//         height:'100%'
//     }}>
//       <Text style={{
//         fontFamily:'outfit-bold',
//         fontSize:30,
//         marginTop:20
//       }}>Travel Dates</Text>
//       <View style={{
//         marginTop:20
//       }}>
//     <CalendarPicker 
//     onDateChange={onDateChange}
//     allowRangeSelection={true} 
//     minDate={new Date()}
//     maxRangeDuration={10}
//     selectedRangeStyle={{
//         backgroundColor:'#000'
//     }}
//     selectedDayTextStyle={{
//         color:'#fff'
//     }}/>
//       </View>
//       <TouchableOpacity 
//       onPress={OnDateSelectionContinue}
//       style={{
//         padding:15,
//         backgroundColor:'#000',
//         borderRadius:15,
//         marginTop:20
//       }}>
//         <Text style={{
//           color:'#fff',
//           textAlign:'center',
//           fontFamily:'outfit-medium',
//           fontSize:18  
//         }}>
//           Continue
//         </Text>
//       </TouchableOpacity>
//     </View>
//   )
// }