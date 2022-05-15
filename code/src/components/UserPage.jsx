import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies()
//const logginBool = require( '../crud/operations/user');

class UserPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            data:false,
            user:[]
        }
    }
    //fecth con id
    loadData (){
        let cadena = (window.location.href);
        let cadena_array = cadena.split("/").reverse();
        let user = cadena_array[0]
        //let id_ref = cadena.slice(-1);
        fetch("http://localhost:3300/userpage/"+ user)
        .then(res=>res.json())
        .then((dat)=>{
            
            console.log(dat);
            this.setState({data:true, user:dat})
        
        })
        .catch(console.log)
    }
    
    componentDidMount(){
        this.loadData();
    }

    closeSession() {
        cookies.remove('id', {path: "/", sameSite: "strict"})
        cookies.remove('user', {path: "/", sameSite: "strict"})
        cookies.remove('email', {path: "/", sameSite: "strict"})
        window.location.href = "../"
    }
        
    render() {
        const{data, user} = this.state

        if(!data){return(<div>Cargando tu página...</div>)}
        else{
            return ( 
            <div>
                <div>
                    {user.map(
                        (item)=>(
                                <div>
                                    <div>
                                        <p> 
                                        {item.username}</p>
                                    </div>
                                </div>
                        ) 
                    )}
                </div>
                <button className="btn btn-outline-warning my-2 my-sm-0 text-secondary" onClick={() => this.closeSession()}>Cerrar sesión</button>
            </div>
            );
        }
        }
    }


export default UserPage;