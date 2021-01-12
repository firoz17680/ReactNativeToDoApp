import React, { Component } from 'react'
import { Text, StyleSheet, View, KeyboardAvoidingView, TouchableOpacity, TextInput } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Colors from './Colors'
import tempData from './tempData'

export default class AddListModel extends Component {
    constructor(props){
            super(props)
        
    }
    backgroundColors= [Colors.green, Colors.megenta,Colors.orange, Colors.blue, Colors.purple]
    state= {
        name: '',
        color: this.backgroundColors[0],
       
    }
 
    
    renderColors = () => {
        return this.backgroundColors.map(color=> {
            return(
                <TouchableOpacity onPress={()=>this.setState({color:color})} key={color} style={[styles.colorBox,{backgroundColor:color}]} />

            )
        })
    }

    changeName =(text)=>{
        this.setState({name: text});
    }

    add2Todo =() => {
        const {name, color} = this.state;

      //  const list =  {name, color};
        
        this.props.addList(this.state.name,this.state.color);

        this.setState({name: ''});
        this.props.closeModal();
    }

    render() {
        return (
            <KeyboardAvoidingView style={styles.container} behavior='padding'>
                <TouchableOpacity style={{position:'absolute', top:20, right:20 }} onPress={this.props.closeModal}>
                    <Icon name="x" size={24} color={Colors.gray}></Icon>

                </TouchableOpacity>

                <View style={{alignSelf:'stretch', marginHorizontal:24}}>
                    <Text style={styles.title}>Create Todo List</Text>
                    <TextInput style={styles.input} placeholder="Enter the name" onChangeText={this.changeName}></TextInput>
                    
                    <View style={{flexDirection:'row', marginBottom:24, justifyContent:'space-between'}}>
                    { this.renderColors()}

                    </View>


                    <TouchableOpacity style={[styles.button, {backgroundColor: this.state.color}]} onPress={this.add2Todo}>
                        <Text style={{fontWeight:"700", color:Colors.white, fontSize:18  }}>Create</Text>
                    </TouchableOpacity>
                </View>

            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    title: {
       fontSize: 24,
       fontWeight:"700",
       alignSelf:'center' ,
        marginBottom:24,
        color:Colors.black
    },
    input:{
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius:6,
        fontSize:18,
        padding:12,
        borderColor: Colors.blue,
        marginBottom:24,

    },
    button: {
        alignItems:'center',
        backgroundColor: Colors.blue,
        padding:12,
        borderRadius:6
    },
    colorBox: {
        height:30,
        width:30,
        borderRadius:4
    }

})
