import React, {Component} from "react";
import axios from "axios";

const UserContext = React.createContext();

class UserContext extends Component{

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
        axios({
            url:`http://localhost:9090/folders`,
            method:"get"
        }).then(response => {
            this.setState({
                folders:response,
            });
        });
    }

    loadNotes(){
        axios({
            url:`http://localhost:9090/notes`,
            method:"get"
        }).then(response => {
            this.setState({
                videoList:response.data.videosAndTheme.videoList,
                
            });
        });
    }

    

    render(){
        return (
            <VideoInformationContext.Provider value={this.state}>
                {this.props.children}
            </VideoInformationContext.Provider>
        );
    }
}

export const VideoinformationConsumer = VideoInformationContext.Consumer;
export default VideoContext;



