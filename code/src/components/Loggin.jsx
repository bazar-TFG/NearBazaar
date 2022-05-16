import React from 'react';
import { Link } from "react-router-dom";
import Cookies from 'universal-cookie';

const cookies = new Cookies()

class Loggin extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          username:"",
          password:""
         }

         this.dataChange = this.dataChange.bind(this);
         this.dataSend = this.dataSend.bind(this);
    }

    componentDidMount(){
      if(cookies.get("user")){
        window.location.href = "./"
      }
    }

    dataChange = (e) =>{
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState({state});
    }

    dataSend = (e) => {
      e.preventDefault();
      console.log("Form enviado");

      var {username, password} = this.state

      var dataLoggin = {username:username, password:password} 
      
      //console.log(JSON.stringify(dataLoggin));
        
      fetch("http://localhost:3300/loggin", {
          
        method:"POST",
        body:JSON.stringify(dataLoggin),
        mode: 'cors',
        headers:{
          'Content-Type': 'application/json',
          'Access-Control-Allow-Headers' : '*'
        }
      })
      .then(
        res => {
          (res.json()
            .then((j) => {
            j = j[0];
            console.log(j)
            cookies.set('id', j.id_user, {path: "/", sameSite: "strict"})
            cookies.set('user', j.username, {path: "/", sameSite: "strict"})
            cookies.set('email', j.email, {path: "/", sameSite: "strict"})
            if(res.status === 200){
              window.location.href="./"
            }
            }))
          
        }
        )
      .then()
      .catch(console.log())
      
    }
    
    render() { 
      const{ username, password} = this.state;
        return (
                    <div className="mb-3" id='cuerpoLogin'>
                    <div className="login-dark">
                        <form method="post" onSubmit={this.dataSend} autoComplete='on'name='Entrada'>
                            <h2 className="sr-only">Login Form</h2>
                            <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
                            <div className="form-group"><input className="form-control" type="username" name="username" placeholder="Username" onChange={this.dataChange} value={username}/></div>
                            <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange={this.dataChange} value={password}/></div>
                            <div className="form-group"><button type="submit" className="btn btn-outline-warning my-2 my-sm-0 text-secondary">Log In</button></div>
                            <div><Link to={"/singup"} className="sing-up">¿No tienes cuenta? Crea una y empieza a poner bazares en linea</Link></div>
                            <div><a disabled href="#" className="forgot">Forgot your email or password?</a></div>
                        </form>
                    </div>
                    </div>
         );
    }
}
 
export default Loggin;