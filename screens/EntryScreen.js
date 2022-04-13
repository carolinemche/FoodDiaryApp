import { Component } from "react";
import * as React from 'react';
import { Button, Text, View, StyleSheet, SafeAreaView,TextInput,Image,RefreshControl, ScrollView,TouchableOpacity } from "react-native";
import {asGlobalState,setGlobalState,addGlobalStateListener,removeGlobalStateListener} from '../common/globalState';
import {Theme, globalStyle} from '../styles/Theme';
import Entry from '../components/EntryItem';
import firestore from '@react-native-firebase/firestore';


import ImagePicker from 'react-native-image-crop-picker';

const Separator = () => (
  <View style={globalStyle.separator} />
);

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
};

function getLabelText(value) {
  return `${value} Star${value !== 1 ? 's' : ''}, ${labels[value]}`;
}

export default class EntryScreen extends Component {


  state = {
    currentImage: '',
    currentTitle:'',
    currentBody:'',
    entires: asGlobalState('entries',[]) 
  };



    //ensure you add this component as listener to global state
  async componentDidMount(){
      addGlobalStateListener("entries",this);

      await this.loadRemoteData();
  }
  //ensure you remove the listener when unmounted
  componentWillUnmount(){
      removeGlobalStateListener("entries",this);
  }

  async loadRemoteData(){
    const todos = await firestore().collection('app').doc('entires').get() 
    .then(documentSnapshot => {
     
      if (documentSnapshot.exists) {
        const entires = documentSnapshot.data();
        setGlobalState({entires:entires.data});
      }
    });

  }

  async saveRemoteData(){
    let {entires} = this.state;

    try{
      firestore()
      .collection('app')
      .doc('entires')
      .set({data:entires})
      .then(() => {
        console.log('Food diary entires saved');
      });
    }
    catch(e){
      console.log(e.message);
    }
  }

  async addEntry(){
    const {currentBody,currentTitle} = this.state;
    if(currentTitle.length==0){
      return;
    }

    let {entires} = this.state;

    let foodEntry = {
      uid:todos.length,
      title:currentTitle,
      body:currentBody,
      done:false
    }

    todos.push(foodEntry);

    setGlobalState({entires});

    this.setState({currentTitle:'',currentBody:''},async()=>{
      await this.saveRemoteData();
    });
  }

  // async setDone(item, v){
  //   let {entires} = this.state;
  //   for(let i in todos){
  //     let itm = todos[i];
  //     if(itm === item){
  //       todos[i].done = v;
  //     }

  //   }

  //   //this.setState({todos});
  //   setGlobalState({todos});//missing callback here...not ideal

  //   await this.saveRemoteData();
  // }

  // async clearList(){
  //   setGlobalState({todos:[]});
  //   await this.saveRemoteData();
  // }

  render(){
    const {entries,currentBody,currentTitle} = this.state;

    const { navigation, route} = this.props;


    return (
      <SafeAreaView style={globalStyle.container}>

        {/* <Text style={globalStyle.header}>To-do list</Text>


        {
            todos.map((e,index)=>{
             return( <Entry
             key={index}
             item={e} 
             navigation={navigation}
             onPress={(item,value)=>{
               this.setDone(item,value);
             }} />)

            })
        } */}


        <Separator />
        <Text style={{alignSelf:'flex-start',marginLeft:'5%'}}>Title</Text>
        <TextInput 
          style={globalStyle.input}
          value={currentTitle}
          onChangeText={(txt)=>{

            this.setState({currentTitle:txt});
          }}
        />

         <Text style={{alignSelf:'flex-start',marginLeft:'5%',marginBottom:5}}>Body</Text>
        <TextInput
          multiline={true}
          numberOfLines={5}

          style={{...globalStyle.input,height:80,width:'90%',marginLeft:15}}
          value={currentBody}
          onChangeText={(txt)=>{

            this.setState({currentBody:txt});
          }}
        />





          <View style={globalStyle.row}>
            <TouchableOpacity
            onPress={()=>{
                this.addEntry();
              }}
              style={globalStyle.roundButton}>
            <Text>Add Entry</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
            onPress={()=>{
                this.clearList();
              }}
              style={globalStyle.roundButton}>
            <Text>Clear list</Text>
            </TouchableOpacity> */}
    </View>
      </SafeAreaView>
    );
      }
}
//   render() {
//     const { navigation, route } = this.props;
//     return (
//       <SafeAreaView> 
//       <View style={styles.body}>

//         <Text>Title</Text>
        
//         <TextInput style = {styles.input}/>

//         <Text>Description</Text>
        
//         <TextInput style = {styles.input}/>



//       </View>

//       </SafeAreaView>
//     );
//   }
// }

const styles = StyleSheet.create({
  body: {
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width:'90%'
  },
});
