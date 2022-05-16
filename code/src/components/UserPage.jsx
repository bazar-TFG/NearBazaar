import React from 'react';
import Cookies from 'universal-cookie';

const cookies = new Cookies()
//const logginBool = require( '../crud/operations/user');

class UserPage extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            data:false,
            user:[],
            username:"",
            password:""
        }
    }
    //fecth con id
    loadData (){
        let cadena = (window.location.href);
        let cadena_array = cadena.split("/").reverse();
        let id_user = cadena_array[0]
        //let id_ref = cadena.slice(-1);
        fetch("http://localhost:3300/userpage/"+ id_user)
        .then(res=>res.json())
        .then((dat)=>{
            
            console.log(dat);
            this.setState({data:true, user:dat})
        
        })
        .catch(console.log)
    }

    dataSend = (e) =>{
      e.preventDefault();
      const{ username, password } = this.state;

      var updateData = {username:username, password:password}

      let cadena = (window.location.href);
      let cadena_array = cadena.split("/").reverse();
      let id_user = cadena_array[0]
      fetch(`http://localhost:3300/us/put/` + id_user, {
        method:"PUT",
        body:JSON.stringify(updateData),
        mode: 'cors',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(console.log())
    }

    dataChange = (e) =>{
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState({state});
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
        const{data, user, username, password} = this.state

        if(!data){return(<div>Cargando tu perfil...</div>)}
        else{
            return ( 
            <div>
                    {user.map(
                        (item)=>(
                            <section id="user-section" >
                            <div className="container py-5 h-100">
                              <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col col-lg-6 mb-4 mb-lg-0">
                                  <div className="card mb-3" id="div-radius">
                                    <div className="row g-0">
                                      <div className="col-md-4 gradient-custom text-center text-white" id="diva">
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava1-bg.webp"
                                          alt="Avatar" className="img-fluid my-5" id="user-image" />
                                        <h6>Username</h6>
                                        <h5>{item.username}</h5>
                                        <i className="far fa-edit mb-5"></i>
                                      </div>
                                      <div className="col-md-8">
                                        <div className="card-body p-4">
                                          <h6>Information</h6>
                                          <hr className="mt-0 mb-4" />
                                          <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                              <h6>Email</h6>
                                              <p className="text-muted">{item.email}</p>
                                            </div>
                                            <form method="put" onSubmit={this.dataSend} >
                                            <div className="col-6 mb-3">
                                              <h6>Username</h6>
                                              <input className="form-control" type="username" name="username" placeholder="Username" onChange={this.dataChange} value={username}/>
                                            </div>
                                            <div className="col-6 mb-3" >
                                              <h6>Password</h6>
                                              <div id="p-pass">
                                                <input className="form-control" type="password" name="password" placeholder="Password" onChange={this.dataChange} value={password}/>
                                              </div>
                                            </div>
                                            <div className="col-6 mb-3" >
                                            <button type="submit" className="btn btn-outline-warning my-2 my-sm-0 text-secondary">Usuario/contraseña</button>
                                            </div>
                                            </form>
                                          </div>
                                          <hr className="mt-0 mb-4" />
                                          <div className="row pt-1">
                                            <div className="col-6 mb-3">
                                              <button className="btn btn-outline-warning my-2 my-sm-0 text-secondary" onClick={() => this.closeSession()}>Cerrar sesión</button>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </section>
                        ) 
                    )}
                
            </div>
            );
        }
        }
    }


export default UserPage;