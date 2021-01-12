import React, { Component } from 'react'
import { Animated, Text, StyleSheet, View, TouchableOpacity, FlatList, SafeAreaView, KeyboardAvoidingView, TextInput, TouchableHighlight, Alert, Keyboard, Button } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import Colors from './Colors'
import tempData from './tempData'

export default class Todo extends Component {
    
     todoItem = this.props.item;
    state ={
      newToDo: "",
      count:this.todoItem.todos.length,
      completedCount:this.todoItem.todos.filter(x=>x.completed).length,
    }
    
    toggleTask =(index) => {
        this.todoItem.todos[index].completed =!this.todoItem.todos[index].completed;
        this.setState({count:this.todoItem.todos.length});
        this.setState({completedCount :this.todoItem.todos.filter(x=>x.completed).length});
    }

     changeName =(text)=>{
        this.setState({newToDo: text});
    }

    addNewTask =() => {
        if(this.todoItem.todos.filter(x=>x.title.toLowerCase() === this.state.newToDo.toLowerCase()).length > 0){
            Alert.alert("Todo App","Duplicate Task");
            return;
        }
        this.todoItem.todos.push({title: this.state.newToDo, completed:false});
      this.setState({count:this.todoItem.todos.length});
        this.setState({completedCount :this.todoItem.todos.filter(x=>x.completed).length});
        Keyboard.dismiss();
    }

    deleteTask =(index) => {
        this.todoItem.todos.splice(index,1);
      this.setState({count:this.todoItem.todos.length});
        this.setState({completedCount :this.todoItem.todos.filter(x=>x.completed).length});
    }

   
    renderTasks = (item, index) => {
        return(
              <View style={styles.section1}>
                    <View style={styles.todoSecton}>
                    <TouchableOpacity  style={{paddingRight:12}} onPress={()=>this.toggleTask(index)} >
                        <Icon name={item.completed ? "check-square":"square"} size={24}></Icon>
                    </TouchableOpacity>
                    <TouchableHighlight>

                        <Text style={[styles.todo, {textDecorationLine: item.completed ? "line-through" : "none", color: item.completed ? Colors.red : Colors.black}  ]}
                        onPress={()=>this.toggleTask(index)}>{item.title}</Text>
                    </TouchableHighlight>
                    
                </View>  
                
                           
                <View>
                    <TouchableOpacity  onPress={()=>this.deleteTask(index)} style={{backgroundColor:Colors.red}} >
                        <Icon name= "x" size={24} color={Colors.white} ></Icon>
                    </TouchableOpacity>
                </View>
              </View>
   
        )
    }
    render() {
       
        return (
            <SafeAreaView style={styles.container}  >
                
                <TouchableOpacity style={{position:'absolute', top:20, right:20, zIndex:20}} onPress={this.props.toggleModal}>
                <Icon name="x" size={24} color={Colors.gray} ></Icon>

                </TouchableOpacity>
                    <View style={[styles.header, {borderBottomColor: this.todoItem.color}]}>
                        <Text style={styles.title}>{this.todoItem.name}</Text>
                        <Text style={styles.taskCount}>{this.state.completedCount} completed out {this.state.count}</Text>
                    </View>
                <View style={[styles.section,{marginBottom:24, marginTop:24}]}>
                        <KeyboardAvoidingView behavior="height">
                         <FlatList data={this.todoItem.todos} 
                         keyExtractor={task=>task.title} 
                         renderItem={({item,index}) =>this.renderTasks(item,index)} 
                         contentContainerStyle={{paddingHorizontal:32}}
                         keyboardShouldPersistTaps="always"
                      ></FlatList>

                        </KeyboardAvoidingView>

                </View>
                 <View style={styles.footer}>
                        <TextInput style={[styles.input,{borderColor:this.todoItem.color}]} placeholder ="Enter new task"
                         onChangeText={this.changeName} onSubmitEditing={Keyboard.dismiss} keyboardType="numbers-and-punctuation" ></TextInput>
                        <TouchableOpacity style={[styles.addTodo, {backgroundColor:this.todoItem.color}]} onPress={this.addNewTask} >
                            <Icon name="plus" size={30} color={Colors.white}></Icon>
                        </TouchableOpacity>
                    </View>
   
               

               

            </SafeAreaView>

        
         )
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'flex-start'
    },
    section1:{
      flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    section:{
        flex:1,
        alignSelf:'stretch',
        justifyContent:'space-between',
        alignItems:'stretch'
        
    },
    header:{
        justifyContent:'flex-end',
        borderBottomWidth:3,
        marginTop:12,
        marginLeft:24,
        alignSelf:'stretch'
    },
    title:{
        fontSize:30,
        fontWeight:"800",
        color:Colors.black        
    },
    taskCount:{
        marginTop:4,
        marginBottom:16,    
        color:Colors.gray,
        fontWeight:"600"
    },
    footer: {
        paddingHorizontal:32,
        flexDirection:'row',
        alignItems:'center',
        marginBottom:10,
      
        
        

    },
    input:{
        flex:1,
        height:48,
        borderWidth: StyleSheet.hairlineWidth,
        borderRadius:6,
        marginRight:8,
        paddingHorizontal:8
    },
    addTodo:{
        padding:8,
        borderRadius:4,
        alignItems:'center',
        justifyContent:'center',

    },
    todoSecton: {
        paddingVertical:12,
        flexDirection:'row',
        alignItems:'center'
    },
    todo: {
        color: Colors.black,
        fontWeight:"700"
    }
})
