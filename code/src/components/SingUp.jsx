import React from 'react';

class SingUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          username:"",
          password:"",
          email: ""
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

      var {email, username, password} = this.state

      var dataLoggin = {email:email, username:username, password:password} 
      
      //console.log(JSON.stringify(dataLoggin));
        
      fetch("http://localhost:3300/create_user", {
          
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
          if(res.status === 200){
            window.location.href="./home"
          }
        }
        )
      .then()
      .catch(console.log())
      
    }
    
    render() { 
      const{ email, username, password} = this.state;
        return ( 
        <form id='cuerpoLogin' onSubmit={this.dataSend} autoComplete='on'name='Entrada'>
        <div className="mb-3">
        <div className="login-dark">
            <form method="post">
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
                <div className="form-group"><input className="form-control" type="username" name="email" placeholder="Email" onChange={this.dataChange} value={email} /></div>
                <div className="form-group"><input className="form-control" type="username" name="username" placeholder="Username" onChange={this.dataChange} value={username}/></div>
                <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange={this.dataChange} value={password}/></div>
                <div className="form-group"><button type="submit" className="btn btn-outline-warning my-2 my-sm-0 text-secondary">Sing Up</button></div>
            </form>
        </div>
        </div>
        </form> 
         );
    }
}
 
export default SingUp;