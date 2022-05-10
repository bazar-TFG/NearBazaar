import React from 'react';
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
            }))
          if(res.status === 200){
            //window.location.href="./home"
          }
        }
        )
      .then()
      .catch(console.log())
      
    }
    
    render() { 
      const{ username, password} = this.state;
        return (
          <form id='cuerpoLogin' onSubmit={this.dataSend} autoComplete='on'name='Entrada'>
                    <div className="mb-3">
                    <div class="login-dark">
                        <form method="post">
                            <h2 class="sr-only">Login Form</h2>
                            <div class="illustration"><i class="icon ion-ios-locked-outline"></i></div>
                            <div class="form-group"><input class="form-control" type="username" name="username" placeholder="Username" onChange={this.dataChange} value={username}/></div>
                            <div class="form-group"><input class="form-control" type="password" name="password" placeholder="Password" onChange={this.dataChange} value={password}/></div>
                            <div class="form-group"><button type="submit" className="btn btn-outline-warning my-2 my-sm-0 text-secondary">Perfe</button></div>
                            <div><a disabled href="#" class="forgot">Forgot your email or password?</a></div>
                        </form>
                    </div>
                    </div>
                    </form> 
         );
    }
}
 
export default Loggin;