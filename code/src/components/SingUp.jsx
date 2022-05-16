import React from 'react';

class SingUp extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          username:"",
          password:"",
          email: "",
          passwordComp: "",
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

      var {email, username, password, passwordComp} = this.state

      if (password === passwordComp) {
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
      } else {
        this.errorHandler()
      }
    }

    async errorHandler() {
      let elem = document.getElementById("error-singup")
      if(typeof elem !== 'undefined' && elem !== null){
          elem.innerHTML ='<div className="card" id="a"><div className="card-body" id="b">This is some text within a card body.</div></div>'
          await this.sleep(5000);
          elem.removeChild("b")
          elem.removeChild("a")
      }
    }

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    render() { 
      const{ email, username, password, passwordComp} = this.state;
        return ( 
        <div>
          <div id="error-singup">
          
          </div>
        <form id='cuerpoLogin' onSubmit={this.dataSend} autoComplete='on'name='Entrada'>
        <div className="mb-3">
        <div className="login-dark">
            <form method="post">
                <h2 className="sr-only">Login Form</h2>
                <div className="illustration"><i className="icon ion-ios-locked-outline"></i></div>
                <div className="form-group"><input className="form-control" type="username" name="email" placeholder="Email" onChange={this.dataChange} value={email} /></div>
                <div className="form-group"><input className="form-control" type="username" name="username" placeholder="Username" onChange={this.dataChange} value={username}/></div>
                <div className="form-group"><input className="form-control" type="password" name="password" placeholder="Password" onChange={this.dataChange} value={password}/></div>
                <div className="form-group"><input className="form-control" type="password" name="password2" placeholder="Confirma tu password" onChange={this.dataChange} value={passwordComp}/></div>
                <div className="form-group"><button type="submit" className="btn btn-outline-warning my-2 my-sm-0 text-secondary">Sing Up</button></div>
            </form>
        </div>
        </div>
        </form>
        </div>
         );
    }
}
 
export default SingUp;