import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity, ActivityIndicator,
  FlatList
} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';


function Home({ navigation, route }) {
  const [isloading, setloading] = useState(true);
  const [Confirmed, setconfirmed] = useState();
  const [Recovered, setrecovered] = useState();
  const [Deaths, setDeaths] = useState();
  const [Lastupdated, setUpdate] = useState();
  const [worldpopulation, setPopulation] = useState();
  const [Critical,setCritical]=useState();
  useEffect(() => {
    fetch("https://world-population.p.rapidapi.com/worldpopulation", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "aef9521e6dmshce5febaab9d4b31p1d6ae2jsne89dd0df205a",
        "x-rapidapi-host": "world-population.p.rapidapi.com"
      }
    })
      .then((response) => response.json())
      .then((responseJson) => {
        const val = responseJson.body.world_population;
        setloading(false);
        setPopulation(val);
      })
      .catch(err => {
        console.error(err);
      });
  },[])


  useEffect(() => {
    fetch("https://covid-19-data.p.rapidapi.com/totals", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "aef9521e6dmshce5febaab9d4b31p1d6ae2jsne89dd0df205a",
        "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
      }
    })
      .then((response) => 
        response.json()
      )
      .then((responseJson)=>{
        const total= responseJson
        setloading(false)
        setconfirmed(total[0].confirmed)
        setrecovered(total[0].recovered)
        setDeaths(total[0].deaths)
        setUpdate(total[0].lastUpdate)
        setCritical(total[0].critical)
      })
      .catch(err => {
        console.error(err);
      });
  },[])

  if (isloading) {
    return (
      <View style={{flex:1,backgroundColor:'#931010', justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ alignItems:"baseline",flexDirection: "row", marginBottom: 5, marginTop: 10 }}>
        <Ionicons name="menu-outline" size={42} style={{ color: "white", fontWeight: "700" }} />
      </TouchableOpacity>
      <View style={{}}>
        <Text style={{ color: 'white', fontSize: 25, marginTop: 20 }}>Total World Population </Text>
        <Text style={{ color: "white", fontSize: 45 }}>{worldpopulation}</Text>
        <Text style={{ color: 'white', fontSize: 25, marginTop: 20 }}>Corona Virus Cases</Text>
        <Text style={{ color: "white", fontSize: 45 }}>{Confirmed}</Text>

        <StatusBar style="auto" />
      </View>
      <View style={{ flex: 2, }}>

        <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
          <View style={{
            flexDirection: "column", justifyContent: "center", height: 130, width: "45%", backgroundColor: "white", borderRadius: 10, shadowColor: "grey", shadowOffset: { width: 2, height: 2, }, shadowOpacity: 0.5,
            shadowRadius: 3, elevation: 10,
          }}>

            <Text style={{ textAlign: "center", fontWeight: "800", fontSize: 23, color: "grey" }}>Deaths</Text>

            <Text style={{ marginTop: 5, fontSize: 32, fontWeight: "bold", textAlign: "center" }}>{Deaths}</Text>
            <Text style={{ marginTop: 5, fontSize: 18, fontWeight: "bold", color: "purple", textAlign: "center" }}>{JSON.stringify((Deaths/Confirmed)*100).substring(0,4)}%</Text>
          </View>


          <View style={{
            flexDirection: "column", justifyContent: "center", height: 130, width: "45%", backgroundColor: "white", borderRadius: 10, shadowColor: "grey", shadowOffset: { width: 2, height: 2, }, shadowOpacity: 0.5,
            shadowRadius: 3, elevation: 10,
          }}>
            <Text style={{ fontWeight: "800", fontSize: 23, color: "grey", textAlign: "center" }}>Recovered</Text>

            <Text style={{ marginTop: 5, fontSize: 30, fontWeight: "bold", textAlign: "center" }}>{Recovered}</Text>
            <Text style={{ marginTop: 5, fontSize: 18, fontWeight: "bold", color: "purple", textAlign: "center" }}>{JSON.stringify((Recovered/Confirmed)*100).substring(0,4)}%</Text>

          </View>
        </View>


        <View style={{ marginTop: 20, justifyContent: "space-evenly" }}>
          <View style={{
            flexDirection: "column", justifyContent: "center", height: 130, width: "100%", backgroundColor: "white", borderRadius: 10, shadowColor: "grey", shadowOffset: { width: 2, height: 2, }, shadowOpacity: 0.5,
            shadowRadius: 3, elevation: 10,
          }}>

            <Text style={{ fontWeight: "800", fontSize: 23, color: "grey", textAlign: "center" }}>Critical Cases</Text>
            <Text style={{ marginTop: 5, fontSize: 30, fontWeight: "bold", textAlign: "center" }}>{Critical}</Text>
            <Text style={{ marginTop: 5, fontSize: 18, fontWeight: "bold", color: "purple", textAlign: "center" }}>{JSON.stringify((Critical/Confirmed)*100).substring(0,4)}%</Text>


          </View>
        </View>
      </View>
      <View style={{}}>
        <Text style={{ color: 'white', fontSize: 20 }}>Last Updated</Text>
        <Text style={{ color: "white", fontSize: 20 }}>{Lastupdated}</Text>

      </View>
    </View>
  );
}





function CountryStats({ navigation, route }) {

  const [CName,setcName]=useState(route.params.cName);
  const [loading,setloading]=useState(true);
  const [Confirmed, setconfirmed] = useState();
  const [Recovered, setrecovered] = useState();
  const [Deaths, setDeaths] = useState();
  const [Lastupdated, setUpdate] = useState();
  const [Population, setPopulation] = useState();
  const [Critical,setCritical]=useState();
  const [starC,setStarC]=useState(true);
  const [alreadyExist, setaexist]=useState(false);
  useEffect(()=>{
    fetch("https://world-population.p.rapidapi.com/population?country_name="+CName, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "aef9521e6dmshce5febaab9d4b31p1d6ae2jsne89dd0df205a",
		"x-rapidapi-host": "world-population.p.rapidapi.com"
	}
})
.then(response => response.json())
.then((responseJson)=>{
    setloading(false);
    setPopulation(responseJson.body.population)
})
.catch(err => {
	console.error(err);
});
  },[])

  useEffect(()=>{
    fetch("https://covid-19-data.p.rapidapi.com/country?name="+CName, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "aef9521e6dmshce5febaab9d4b31p1d6ae2jsne89dd0df205a",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then((responseJson)=>{
      setloading(false);
      const data=responseJson
      setconfirmed(data[0].confirmed);
      setrecovered(data[0].recovered);
      setDeaths(data[0].deaths);
      setCritical(data[0].critical);
      setUpdate(data[0].lastUpdate);
    })
    .catch(err => {
      console.error(err);
    });
  },[])

  useEffect(()=>{
    DisplayStar();
  },[])

  if (loading) {
    return (
      <View style={{flex:1,backgroundColor:'#931010', justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  async function checkExists(key){
    var checkVal=await AsyncStorage.getItem(key);
    if(checkVal===null){
      AsyncStorage.setItem(key,CName);

    }
  }


  const SaveData=()=>{
    var key=CName;

   checkExists(key);
    //AsyncStorage.clear();
    //console.log(key)
    //console.log(CName)
  }
  async function DisplayStar (){
    var key=CName;
    var checkVal=await AsyncStorage.getItem(key);
    if(checkVal!==null){
      setStarC(false);
      
    }else{
      setStarC(true);
  }
  CStar()
  }

  function CStar(){
    DisplayStar()
    return (
      <View>
      {starC===true ? <Ionicons name="star-outline" size={32} style={{ color: "white" }} />: <Ionicons name="star" size={32} style={{ color: "white" }} />  }
 
          </View>
    );
  }
  

  return (
    <View style={styles.container}>

      <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: 5, marginTop: 10 }}>
        <TouchableOpacity>
        <Ionicons name="chevron-back-outline" onPress={() => navigation.goBack()} size={38} style={{ color: "white", fontWeight: "700" }} />
        </TouchableOpacity>
        <Text style={{color:"white", fontWeight:"600", fontSize:25}}>{CName}</Text>
        <TouchableOpacity onPress={()=>{SaveData();  DisplayStar()}}>
          <CStar/>
        </TouchableOpacity>
      </View>


      <View >
        <Text style={{ color: 'white', fontSize: 25, marginTop: 20 }}>Country Population</Text>
        <Text style={{ color: "white", fontSize: 45 }}>{Population}</Text>

        <StatusBar style="auto" />
      </View>


      <View style={{ flex: 2, }}>
        <View style={{ marginTop: 20, justifyContent: "space-evenly" }}>
          <View style={{
            flexDirection: "column", justifyContent: "center", height: 130, width: "100%", backgroundColor: "white", borderRadius: 10, shadowColor: "grey", shadowOffset: { width: 2, height: 2, }, shadowOpacity: 0.5,
            shadowRadius: 3, elevation: 10,
          }}>

            <Text style={{ fontWeight: "800", fontSize: 23, color: "grey", textAlign: "center" }}>Corona Virus Cases</Text>
            <Text style={{ marginTop: 5, fontSize: 32, fontWeight: "bold", textAlign: "center" }}>{Confirmed}</Text>
            <Text style={{ marginTop: 5, fontSize: 18, fontWeight: "bold", color: "purple", textAlign: "center" }}>{JSON.stringify((Confirmed/Population)*100).substring(0,4)}%</Text>


          </View>
        </View>
        <View style={{ flexDirection: "row", marginTop: 20, justifyContent: "space-between" }}>
          <View style={{
            flexDirection: "column", justifyContent: "center", height: 130, width: "45%", backgroundColor: "white", borderRadius: 10, shadowColor: "grey", shadowOffset: { width: 2, height: 2, }, shadowOpacity: 0.5,
            shadowRadius: 3, elevation: 10,
          }}>

            <Text style={{ textAlign: "center", fontWeight: "800", fontSize: 23, color: "grey" }}>Deaths</Text>

            <Text style={{ marginTop: 5, fontSize: 32, fontWeight: "bold", textAlign: "center" }}>{Deaths}</Text>
            <Text style={{ marginTop: 5, fontSize: 18, fontWeight: "bold", color: "purple", textAlign: "center" }}>{JSON.stringify((Deaths/Confirmed)*100).substring(0,4)}%</Text>
          </View>


          <View style={{
            flexDirection: "column", justifyContent: "center", height: 130, width: "45%", backgroundColor: "white", borderRadius: 10, shadowColor: "grey", shadowOffset: { width: 2, height: 2, }, shadowOpacity: 0.5,
            shadowRadius: 3, elevation: 10,
          }}>
            <Text style={{ fontWeight: "800", fontSize: 23, color: "grey", textAlign: "center" }}>Recovered</Text>

            <Text style={{ marginTop: 5, fontSize: 32, fontWeight: "bold", textAlign: "center" }}>{Recovered}</Text>
            <Text style={{ marginTop: 5, fontSize: 18, fontWeight: "bold", color: "purple", textAlign: "center" }}>{JSON.stringify((Recovered/Confirmed)*100).substring(0,4)}%</Text>

          </View>
        </View>


        <View style={{ marginTop: 20, justifyContent: "space-evenly" }}>
          <View style={{
            flexDirection: "column", justifyContent: "center", height: 130, width: "100%", backgroundColor: "white", borderRadius: 10, shadowColor: "grey", shadowOffset: { width: 2, height: 2, }, shadowOpacity: 0.5,
            shadowRadius: 3, elevation: 10,
          }}>

            <Text style={{ fontWeight: "800", fontSize: 23, color: "grey", textAlign: "center" }}>Critical Cases</Text>
            <Text style={{ marginTop: 5, fontSize: 32, fontWeight: "bold", textAlign: "center" }}>{Critical}</Text>
            <Text style={{ marginTop: 5, fontSize: 18, fontWeight: "bold", color: "purple", textAlign: "center" }}>{JSON.stringify((Critical/Confirmed)*100).substring(0,4)}%</Text>


          </View>
        </View>
      </View>


      <View>
        <Text style={{ color: 'white', fontSize: 20 }}>Last Updated</Text>
        <Text style={{ color: "white", fontSize: 20 }}>{Lastupdated}</Text>

      </View>
    </View>
  );
}

function FavouriteCountries({ navigation, route }) {

  //const [getName, setName]=useState(route.params.countryvalue);
  //const [getkey,setKey]=useState( []);
  const [countryName,setCountryName]=useState([]);
  useEffect(()=>{
    GetData();
  },[])
  const GetData= async()=>{
    var data=await AsyncStorage.getAllKeys()
    //setKey(data);
    //console.log(data);
    var temparry=[];
    for(var i=0;i<data.length;i++){
      var index=data[i];
      
      var getvalue=await AsyncStorage.getItem(index);
      
      temparry[i]=getvalue
    }
    //console.log(temparry)
    setCountryName(temparry)
  }

  async function remove(item){
    await AsyncStorage.removeItem(item)
    GetData();
  }
  return (
    <View style={styles.favourtieContainer}>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ alignItems:"baseline",flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
        <Ionicons name="menu-outline" size={42} style={{ color: "white" }} />        
      </TouchableOpacity>
      <TouchableOpacity onPress={() => GetData()} style={{ alignItems:"baseline",flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
        <Ionicons name="refresh-circle" size={38} style={{ color: "white" }} />        
      </TouchableOpacity>
      </View>
      
      <View>      
      <Text style={{ color: 'white', fontSize: 35, fontWeight: "bold", marginTop: 15 }}>Saved Countries </Text>
      </View>
      <View style={{ marginTop: 25 }}>
        <View>
        
    <FlatList
      keyExtractor={(item)=>item}
      data={countryName}
      renderItem={({item})=>
      (<TouchableOpacity onPress={()=>navigation.navigate("Country Stats",{cName:item })} style={{
        flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: 10, height: 80, width: "100%", backgroundColor: "white", borderRadius: 10, shadowColor: "grey", shadowOffset: { width: 2, height: 2, }, shadowOpacity: 0.5,
        shadowRadius: 3, elevation: 10,
      }}>
       <Text style={{ fontWeight: "bold", fontSize: 23, color: "grey", textAlign: "center", marginLeft: 10 }}>{item}</Text>
       <TouchableOpacity  onPress={()=>{remove(item)}}>
            <Ionicons name="star" size={32} style={{ color: "grey", marginRight: 10 }}/>
            </TouchableOpacity>
      </TouchableOpacity>)
      }
    />
        </View>
      </View>
    </View>
  );
}

function CountryList({navigation,route}) {
  const [dataSource, setDataSource] = useState([]);
  const [countryName, setCountrynames]=useState([]);
  const [loading, setloading]=useState(true);
  const [tempArrayHolder, setarrayHolder]=useState([]);
  const [query, setQuery] = useState('');
  const [fullData, setFullData] = useState([]);

  useEffect(()=>{
    fetch("https://world-population.p.rapidapi.com/allcountriesname", {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "aef9521e6dmshce5febaab9d4b31p1d6ae2jsne89dd0df205a",
        "x-rapidapi-host": "world-population.p.rapidapi.com"
      }
    })
    .then(response => response.json())
    .then((responseJson)=>{
      setloading(false);
      setCountrynames(responseJson.body.countries.sort());
      setFullData(responseJson.body);
    })
    .catch(err => {
      console.error(err);
    });
  },[])

  if (loading) {
    return (
      <View style={{flex:1,backgroundColor:'#931010', justifyContent:"center",alignItems:"center"}}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }


  return (
    <View style={{ backgroundColor: "#F9F9F9", padding: 20, flex: 1 }}>
      <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ alignItems:"baseline",flexDirection: "row", marginBottom: 10, marginTop: 10 }}>
        <Ionicons name="menu-outline" size={42} style={{ color: "black" }} />
        <StatusBar style="auto" />
      </TouchableOpacity>
      <FlatList
        data={countryName}
        keyExtractor={( index) => index}
        renderItem={({ item,index }) => (
          <TouchableOpacity activeOpacity={0.5} onPress={()=> {navigation.navigate("Country Stats",{cName: item })}}>
            <View style={{ height: 80,marginBottom:5, width: "100%",
             borderColor: "#931010", borderWidth:2,borderRadius:10,
             backgroundColor:"#931010",
               justifyContent:"center",alignItems:"center", textAlign:"center" }}>
              <Text style={{color:"white"}}>{item}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}
const Drawer = createDrawerNavigator();

/*function CustomDrawer(props){
  return(
    <View style={{flex:1}}>


    <SafeAreaView>
        <DrawerContentScrollView {...props}>
            <View style={{flex:1}}>
              <View style={{paddingLeft:20}}>
                <Image source={require('./assets/covid.png')} size={50}/>
              </View>
            </View>
        </DrawerContentScrollView>
    </SafeAreaView>
    </View>
  )
}
*/
const Stack = createStackNavigator();

function CountryStackscreens(){
  return(
    <Stack.Navigator initialRouteName="Country List">
        <Stack.Screen name="Country List" options={{ headerShown: false }} component={CountryList} />
        <Stack.Screen name="Country Stats" options={{headerShown:false}} component={CountryStats} />
      </Stack.Navigator>
  );
}

function FavouriteStackscreens(){
  return(
    <Stack.Navigator initialRouteName="Favourite Countries">
        <Stack.Screen name="Favourite Countries" options={{headerShown:false}} component={FavouriteCountries} />
        <Stack.Screen name="Country Stats" options={{headerShown:false}} component={CountryStats} />
      </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="World Stats">
        <Drawer.Screen name="World Stats" options={{ headerShown: false }} component={Home} />
        <Drawer.Screen name="Country List" options={{ headerShown: false }} component={CountryStackscreens} />
        <Drawer.Screen name="Favourite Countries" options={{ headerShown: false }} component={FavouriteStackscreens} />

      </Drawer.Navigator>
    </NavigationContainer>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#931010',
    justifyContent: "space-between",
    padding: 20
  },
  favourtieContainer: {
    flex: 1,
    backgroundColor: '#931010',
    padding: 20
  },
});
