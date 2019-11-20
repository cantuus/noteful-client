import React, {Component} from "react";
import UserInformationContext from './UserInfo'


export default class UserContext extends Component{

    constructor(props){
        super(props);
        this.state = {
            notes:[],
            folders:[]
        }
    }

    componentDidMount(){
        this.loadFolders();
        this.loadNotes();
    }

    loadFolders(){
        fetch('http://localhost:9090/folders')
           .then(response => {
               if(response.ok){
                   console.log('bang')
                   return response.json();
               }
               throw new Error(response.statusText);
           })
           .then(responseJson => {
               console.log('boom')
               this.setState({
                   folders: responseJson
               },() => console.log(this.state))
           })
    }

    loadNotes(){
        fetch('http://localhost:9090/notes')
           .then(response => {
               if(response.ok){
                   console.log('bang')
                   return response.json();
               }
               throw new Error(response.statusText);
           })
           .then(responseJson => {
               console.log('boom')
               this.setState({
                   notes: responseJson
               },() => console.log(this.state))
           })
    }

    handleDeleteItem (id) {
        let filteredNotes = this.state.notes.filter(function(note){
            return note.id !== id
        })
        this.setState({
            notes: filteredNotes
        })

    }

    
    render(){
        return (
            <UserInformationContext.Provider value={this.state} handleDeleteItem={this.handleDeleteItem}>
                {this.props.children}
            </UserInformationContext.Provider>
        );
    }
}

//export const VideoinformationConsumer = VideoInformationContext.Consumer;



