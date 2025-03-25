// import { View, Text, TouchableOpacity } from 'react-native'
// import React, { useEffect,useState,useContext } from 'react'
// import { useNavigation } from 'expo-router'
// import { FlatList } from 'react-native-web';
// import { SelectTravelerList } from './../../constants/option'
// import OptionCrd from '../../component/CreateTrip/OptionCrd';
// import { CreateTripContext } from '../../context/CreateTripContext';
// const Colors = {
//   BLACK: '#000000',
//   WHITE: '#FFFFFF',
// };

// export default function selectTravler() {
//   const navigation=useNavigation();
//   const [selectedTraveler,setSelectedTraveler]=useState();
//  const {tripdata,setTripData}=useContext(CreateTripContext);
  
//   useEffect(()=>{
//     navigation.setOptions({
//       headerShown:true,
//       headerTransparent:true,
//       headerTitle:''
//     })
//   },[])

//   useEffect(
//     ()=>{
//  setTripData({...tripdata,travelerCount:selectedTraveler})
//     },[selectedTraveler])
  
//   return (
//     <View style={{
//       padding:25,
//       paddingTop:75,
//       backgroundColor:Colors.WHITE,
//       height:'100%'

//     }}>

//       <Text style={{
//         fontSize:35,
//         fontWeight:'bold',
//         margintop:20
//       }}>Who Traveling</Text>
//       <View style={{
//            margintop:20
//       }}>
//         <Text style=
//         {{
//           fontWeight:'bold',
//           fontSize:23,
       

//         }}>
//           Choose your traveles
//         </Text>
       
//         <FlatList
//         data={SelectTravelerList}
//         renderItem={({item,index})=>(
//           <TouchableOpacity onPress={()=>setSelectedTraveler(item.title)} style={{
//             marginVertical:10
//           }}>
            
//               <OptionCrd option={item} selectedTraveler={selectedTraveler}/>
//             </TouchableOpacity>
//         )}
//         />
//       </View>
//     </View>

//   )
// }
import { Link } from 'expo-router'; 
import { View, Text, FlatList, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigation, useRouter } from 'expo-router';
import {SelectTravelerList} from './../../constants/option'
import OptionCard from '../../component/CreateTrip/OptionCard';
import { CreateTripContext } from '../../context/CreateTripContext';
// import { router } from 'expo-router';

// Inside your components
// const router = useRouter();
// router.push('/create-trip/select-dates');

export default function SelectTraveler() {
    const navigation = useNavigation();

    const [selectedTraveler, setSelectedTraveler] = useState()

    const {tripData,setTripData} = useContext(CreateTripContext);

    const router = useRouter();
    useEffect(() => {
        navigation.setOptions({
          headerShown: true,
          headerTransparent: true,
          headerTitle: " ",
        });
    }, []);

    useEffect(()=>{
      setTripData({...tripData,
        traveler:selectedTraveler
      })
    },[selectedTraveler])
    useEffect(()=>{
      console.log(tripData)
    },[tripData])
  return (
    <View style={{
        padding:25,
        paddingTop:75,
        backgroundColor:'#fff',
        height:'100%'
    }}>
      <Text style={{
        fontSize:27,
        fontFamily:'outfit-bold'
      }}>Who's Travelling</Text>
      <View style={{
        marginTop:20
      }}>
        <Text style={{
            fontFamily:'outfit-bold',
            fontSize:20
        }}>Choose your travellers </Text>
    <FlatList 
    data={SelectTravelerList}
    renderItem={({item,index})=>(
        <TouchableOpacity 
        onPress={()=>setSelectedTraveler(item)}
        style={{
            marginVertical:10
        }}>
        <OptionCard option={item} selectedOption={selectedTraveler} />   
        </TouchableOpacity>
    )}/>
      </View>
      
      <TouchableOpacity 
      // onPress={()=>router.push('/create-trip/select-dates')}
      style={{
        padding:15,
        backgroundColor:'#000',
        borderRadius:15,
        marginTop:20
      }}>
        <Link href={'/create-trip/select-dates'} style={{
        width:'100%',
        textAlign:'center'
        
      }}>
        <Text style={{
          color:'#fff',
          textAlign:'center',
          fontFamily:'outfit-medium',
          fontSize:18  
        }}>
          Continue
        </Text>
        </Link>
      </TouchableOpacity>
      

    </View>
  )
}
