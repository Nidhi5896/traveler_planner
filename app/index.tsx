import { Text, View } from "react-native";
import Login from '../component/Login'
import {auth} from './../configs/firebaseconfig'
import { Redirect } from "expo-router";
export default function Index() {
  const user=auth.currentUser;
  return (
    <View
      style={{
        flex: 1,
        // justifyContent: "center",
        // alignItems: "center",
      }}
    >
      
      {user?<Redirect href={'/mytrip'}/>: <Login/>
      }
     
    </View>
  );
}
