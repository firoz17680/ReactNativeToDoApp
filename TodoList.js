
import React, { Component } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, TouchableHighlight, Modal } from 'react-native'
import Icon  from 'react-native-vector-icons/Feather';
import colors from './Colors'
import tempData from './tempData';
import Todo from './Todo';


  
export default class TodoList extends Component {
        item= this.props.item
            completedCount = this.item.todos.filter(todo => todo.completed).length;
     remainCount = this.item.todos.length - this.completedCount;
    state={
        showToDoModal: false
    }
     deleteToDo =()=>{
            let id= tempData.findIndex(todo => todo.id == this.item.id)
            tempData.splice(id)
            
        }

        toggleModal=()=>{
            this.setState({showToDoModal: !this.state.showToDoModal})
        }
render(){
  
    return (
        <View>
            <Modal animationType='slide' visible={this.state.showToDoModal} onRequestClose={this.toggleModal}>
                <Todo toggleModal={this.toggleModal} item ={this.item} updateList={this.props.updateList}></Todo>
            </Modal>
        <TouchableOpacity key={this.item.id.toString()} style={[styles.listContainer, {backgroundColor: this.item.color, zIndex:100}]} onPress={this.toggleModal}>
             <TouchableHighlight style={{position:'absolute', top:5, right:5 }} onPress={this.deleteToDo}>
                    <Icon name="x" size={24} color={Colors.white}></Icon>

                </TouchableHighlight>
            <Text key={this.item.id.toString()} style={styles.title}>{this.item.name}</Text>

            <View>
                <View style={{alignItems:'center'}}>
                    <Text style={styles.count}>{this.completedCount}</Text>
                    <Text style={styles.subtitle}>Completed</Text>
                    
                </View>
                <View style={{alignitems:'center'}}>
                    <Text style={styles.count}>{this.remainCount}</Text>
                    <Text style={styles.subtitle}>Remaining</Text>
                    
                </View>
            </View>

        </TouchableOpacity>
 
        </View>
        
    )
}

}


 

const styles = StyleSheet.create({
    listContainer:{
        paddingVertical:12,
        borderRadius:6,
        marginHorizontal:12,
        alignItems:'center',
        width:250,

    },
 
  title:{
		fontWeight:"700",
        fontSize:28,

        color:colors.white,
		marginBottom:18
    },
    count:{
        color:colors.white,
        fontSize:40,
        fontWeight:"300",
        alignSelf:'center'

    },
    subtitle:{
        color: colors.white,
        fontSize:12,
        fontWeight:"200",
        paddingBottom:24
    }

})
