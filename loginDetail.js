import React, { useState ,useRef} from "react";
import {View, StyleSheet, Text,Image, FlatList, ActivityIndicator,Pressable} from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from 'react-native-vector-icons/Ionicons';

var id = 0;

const Home =() => {
    const flatlistRef = useRef();
    const onPressFunction = () => {
        flatlistRef.current.scrollToEnd({animating: true});
      };
    return(
        <View>
            <FlatList
                data={ListItems}
                renderItem={renderItem}
                keyExtractor={item=>item.title}
                ref={flatlistRef}
            />
        </View>
    );
}

const Profile =() => {
    //const [id, setId] = useState(0);
    
    return(
        <View>
            {generateListItems(id)}
        </View>
    );
   
}
const Notifications =() => {
    return(
        <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
            <Text>Notifications Screen</Text>
        </View>
    );
}
const Tabs = createBottomTabNavigator();
const detailScreen = () => 
{
    return(
           <Tabs.Navigator
           screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;
              if (route.name === 'Home') {
                iconName = focused
                  ? 'home'
                  : 'home-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
              else {
                iconName = focused ? 'notifications' : 'notifications-outline';
              }
  
              // You can return any component that you like here!
              return <Icon name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'chocolate',
            tabBarInactiveTintColor: 'gray'
            })} >
               <Tabs.Screen name='Home' component={Home}  options={{headerShown:true}}/>
               <Tabs.Screen name='Profile' component={Profile} options={{headerShown:true}} />
               <Tabs.Screen name='Notifications' component={Notifications} options={{headerShown:true}} />
           </Tabs.Navigator>
    )
}
const renderItem = ({item}) => { return(<Item title={item.title} category={item.category} timestamp = {item.timestamp} thumb= {item.thumb} />)};

const Item = ({thumb, title, category, timestamp}) => {
    return (
        <View style={styles.item}>
            <Image style={{borderRadius:5}} source={{uri:thumb ,width: 60, height: 60}}/>
            <View style={{marginLeft:15}}>
            <Text>Title:{title}</Text>
            <Text>Category:{category}</Text>
            <Text>Time:{convertTime(timestamp)}</Text>
         </View>
        </View>
    );
}
const generateListItems = (id) => {
    var itemContent = [];
    for(let i = id; i < 10 ; i++) {
        if(i&1)
        itemContent.push(<ItemDetail title={i} thumb={ListItems[0].thumb} cat={ListItems[0].category} timestamp={ListItems[0].timestamp}></ItemDetail>);
        else
        itemContent.push(<ItemDetail title={i} thumb={ListItems[1].thumb} cat={ListItems[1].category} timestamp={ListItems[1].timestamp}></ItemDetail>);
    }
    id+=10;
    return itemContent;
}
const convertTime = (timestamp) => {
    var years, months, days, hours, minutes, seconds;
    var currentSeconds = Date.now()/1000;
    seconds = (currentSeconds - timestamp);
    minutes = Math.floor(seconds/60);
    hours = Math.floor(minutes/60);
    days = Math.floor(hours/24);
    months = Math.floor(days/30);
    years = Math.floor(months/12);
 
    if(years > 0) return years == 1 ? 'a year ago' : years + ' years ago';
    if(months > 0) return months == 1 ? 'a month ago' : months + ' months ago'; 
    if(days > 0) return days == 1 ? 'a day ago' : days+ ' days ago';
    if(hours > 0) return hours == 1 ? hours + 'an hour ago' : hours + ' hours ago';
    if(minutes > 0) return minutes == 1 ?'a minute ago' : minutes + ' minutes ago'; 
    if(seconds > 0) return seconds == 1 ?'a second ago' : seconds + ' seconds ago'; 
    
 }

const ItemDetail = ({thumb, title, cat, timestamp}) => {
   return (
     <View style={styles.item}>
         <Image style={{borderRadius:5}} source={{uri:thumb ,width: 60, height: 60}}/>
         <View style={{marginLeft:15}}>
            <Text>Title:{title}</Text>
            <Text>Category:{cat}</Text>
            <Text>Time:{convertTime(timestamp)}</Text>
         </View>
     </View>
   )
 }

 const ListItems=[
   {title:1, category:'cat', thumb:'https://www.sierraclub.org/sites/www.sierraclub.org/files/styles/flexslider_full/public/sierra/articles/big/SIERRA%20Night%20Sky%20WB.jpeg?itok=jxh1nTJA%27',timestamp:'1643256662'},
   {title:2, category:'cat', thumb:'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=759&q=80',timestamp:'1643256662'},
   {title:3, category:'cat', thumb:'https://www.sierraclub.org/sites/www.sierraclub.org/files/styles/flexslider_full/public/sierra/articles/big/SIERRA%20Night%20Sky%20WB.jpeg?itok=jxh1nTJA%27',timestamp:'1643256662'},
   {title:4, category:'cat', thumb:'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=759&q=80',timestamp:'1643256662'},
   {title:5, category:'cat', thumb:'https://www.sierraclub.org/sites/www.sierraclub.org/files/styles/flexslider_full/public/sierra/articles/big/SIERRA%20Night%20Sky%20WB.jpeg?itok=jxh1nTJA%27',timestamp:'1643256662'},
   {title:6, category:'cat', thumb:'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=759&q=80',timestamp:'1643256662'},
   {title:7, category:'cat', thumb:'https://www.sierraclub.org/sites/www.sierraclub.org/files/styles/flexslider_full/public/sierra/articles/big/SIERRA%20Night%20Sky%20WB.jpeg?itok=jxh1nTJA%27',timestamp:'1643256662'},
   {title:8, category:'cat', thumb:'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=759&q=80',timestamp:'1643256662'},
   {title:9, category:'cat', thumb:'https://www.sierraclub.org/sites/www.sierraclub.org/files/styles/flexslider_full/public/sierra/articles/big/SIERRA%20Night%20Sky%20WB.jpeg?itok=jxh1nTJA%27',timestamp:'1643256662'},
   {title:10, category:'cat', thumb:'https://images.unsplash.com/photo-1484589065579-248aad0d8b13?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=759&q=80',timestamp:'1643256662'}
 ]
const Loadmore = () => {
    const [isLoad, setIsLoad] = useState(true);
    if(isLoad ===true)
    setTimeout(setIsLoad(false),1000);
    return <ActivityIndicator hidesWhenStopped={isLoad}/>;
}
const styles = StyleSheet.create({
    item: {
        flexDirection:'row',
        margin:10
    }
    
});
export default detailScreen;
