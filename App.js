import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, TouchableOpacity , FlatList, Modal, ScrollView} from 'react-native'
import colors from './Colors'
import tempData from './tempData'
import Icon from 'react-native-vector-icons/Feather'
import TodoList from './TodoList'
import AddListModel from './AddListModel'



export default class App extends Component {
	state={
		addTodoModalVisible: false,
		list: tempData
	}

	toggleTodoModal =() =>{
		this.setState({addTodoModalVisible: ! this.state.addTodoModalVisible})
	}

	renderItem = ({ item }) => (
		<TodoList key={item.id.toString()} item={item}></TodoList>
	);

	 renderColors = ( {item}) => {
            return(
				<View key={item.id.toString()} >
  					<Text>{item.Text}</Text>
				</View>
            )
    }

	
	addList = (name, color) => {
		this.setState({list:[...this.state.list, {id: this.state.list.length +1, name: name, color: color, todos: []}]});
	}
	

	render() {
		<StatusBar  barStyle='light-content'></StatusBar>
		return (
			<View style={styles.container}>
	

				<Modal animationType='slide' visible={this.state.addTodoModalVisible}
					onRequestClose={this.toggleTodoModal}>
					<AddListModel closeModal={this.toggleTodoModal} addList={this.addList} updateList={this.updateList} ></AddListModel>

				</Modal>

				<StatusBar  barStyle='dark-content'></StatusBar>
				<View style={{flexDirection:'row'}}>

					<View style={styles.separator}></View>
					<Text style={styles.title}>
						ToDo <Text style={styles.title1}>List</Text>
					</Text>
					<View style={styles.separator}></View>
				</View>


				<View style={{marginVertical:48}}>
					<TouchableOpacity style={styles.addlist} onPress={this.toggleTodoModal}>
						<Icon name="plus" size={24} color={colors.blue}></Icon>
					</TouchableOpacity>
					<Text style={styles.add}>Add List</Text>
				</View>

				<View style={{height:275, paddingLeft:5}}>
					<FlatList
						data={this.state.list}
						renderItem={this.renderItem}
						keyExtractor={item => item.id.toString()}
						horizontal={true}
						showsHorizontalScrollIndicator={false}
					/>
					
				</View>
					
				{
					this.state.list.map(item=> {
						console.log(item.id + " : " + item.name + " : " + item.color + " : " + item.todos.length)
					})
					
				}
						
						
	
		</View>
		)
	}
}

const styles = StyleSheet.create({
	
	container:{
		flex:1,
		justifyContent:'center',
		backgroundColor: '#fff',
		alignItems:'center'
	},
	separator: {
		backgroundColor: colors.lightBlue,
		flex:1,
		height:1,
		alignSelf:'center',
		borderTopWidth:1,
		borderColor: colors.lightBlue
	},
	title:{
		fontWeight:"800",
		fontSize:38,
		color: colors.black,
		paddingHorizontal:64,
	},
	title1:{
		fontWeight:"300",
		color:colors.blue,
	},
	addlist: {
		borderWidth:1,
		borderColor:colors.lightBlue,
		borderRadius:4,
		padding:16,
		
	},
	addlist:{
		borderWidth:2,
		borderColor:colors.blue,
		borderRadius:4,
		padding:16,
		alignContent:'center',
		alignItems:'center'
	},
	add:{
		color:colors.gray,
		fontWeight:"600",
		fontSize:14,
		padding:12
	}
})
