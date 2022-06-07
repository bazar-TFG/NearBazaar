import React from 'react';

class UpdateBazaar extends React.Component {
    constructor(props) {
        super(props);
        this.state = { 
          street_location:"",
          bazaarType:"",
          stationery_bazaar_type: "N",
          food_bazaar_type:"N",
          general_bazaar_type:"N",
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

      const{ street_location, bazaarType } = this.state;
      var {stationery_bazaar_type, food_bazaar_type, general_bazaar_type} = this.state

      var bazarTypeToSend

      if (bazaarType === "1") {
        stationery_bazaar_type = "Y" 
      } else if (bazaarType === "2") {
        food_bazaar_type = "Y"
      } else if (bazaarType === "3") {
        general_bazaar_type = "Y"
      }
      var streetLocationToSend = {street_location:street_location} 
      bazarTypeToSend = {stationery_bazaar_type:stationery_bazaar_type, food_bazaar_type:food_bazaar_type, general_bazaar_type:general_bazaar_type}

      console.log(JSON.stringify(streetLocationToSend));
      console.log(JSON.stringify(bazarTypeToSend));

      fetch(`http://localhost:3300/lc/put/20`, {
        method:"PUT",
        body:JSON.stringify(streetLocationToSend),
        mode: 'cors',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((res)=>{
        console.log(res)
      })
      .catch(console.log())
      
      fetch(`http://localhost:3300/bzty/put/20`, {
        method:"PUT",
        body:JSON.stringify(bazarTypeToSend),
        mode: 'cors',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(console.log())
      
    }
    
    render() { 
      const{ street_location, bazaarType } = this.state;
        return ( 
        <form onSubmit={this.dataSend}>
          <div className="mb-3 row flex-nowrap">
            <label htmlFor="input1" className="col-auto col-form-label">Adress</label>
            <div className="col-10">
              <input type="text" className="form-control" id="input1" name="street_location" onChange={this.dataChange} value={street_location} />
            </div>
          </div>

          <div className="mb-3">
            <select className="form-select" aria-label="Default select example" name="bazaarType" onChange={this.dataChange} value={bazaarType}>
              <option defaultValue>Selecciona tipo de bazar</option>
              <option value="1">Papelería y regalos</option>
              <option value="2">Alimentación</option>
              <option value="3">General</option>
            </select>
          </div>

          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
         );
    }
}
 
export default UpdateBazaar;