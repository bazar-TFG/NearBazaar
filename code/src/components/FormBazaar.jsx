import React from 'react';

class FormBazaar extends React.Component {
  
    constructor(props) {
        super(props);
        this.state = { 
          street_location:"",
          bazaarType:"",
          path_untreated_picture:"",
          stationery_bazaar_type: "N",
          food_bazaar_type:"N",
          general_bazaar_type:"N",
          file: []
         }

         this.dataChange = this.dataChange.bind(this);
         this.dataSend = this.dataSend.bind(this);
    }

    dataChange = (e) =>{
      const state = this.state;
      state[e.target.name] = e.target.value;
      this.setState({state});
      
    }

    dataFile = (a) =>{
      this.setState({file: a.target.files[0]});
      
    }

    dataSend = (e) => {
      e.preventDefault();
      console.log("Form enviado");

      var {street_location, bazaarType, file} = this.state;
      var {stationery_bazaar_type, food_bazaar_type, general_bazaar_type} = this.state
      //Comprobación de datos
      if(!file){
        return
      }
      if(!street_location){
        alert("inserta una calle")
        return
      }
      if(!bazaarType){
        alert("inserta un tipo de bazar")
        return
      }

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
      console.log(file)
      
      fetch("http://localhost:3300/bz/p/1", {
        method:"POST",
        //body:JSON.stringify(dataToSend)
      })
      .then()
      .catch(console.log())
      

      fetch("http://localhost:3300/lc/post", {
        method:"POST",
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
      
      fetch("http://localhost:3300/bzty/post", {
        method:"POST",
        body:JSON.stringify(bazarTypeToSend),
        mode: 'cors',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .catch(console.log())
      
      const formData = new FormData()
      formData.append("image", file)

      fetch("http://localhost:3300/pc/storage", {
        method:"POST",
        body: formData,
        mode: 'cors',
      })
      .then(res => res.json())
      .catch(console.log())
      
      document.getElementById("street_input").value = null
      document.getElementById("bazaarType_input").value = null
      document.getElementById("file_input").value = null
    }
    
    render() { 
      const{ street_location, bazaarType } = this.state;
        return ( 
          
        <form onSubmit={this.dataSend}>
          <div className="mb-3 row flex-nowrap">
            <label htmlFor="street_input" className="col-auto col-form-label">Adress</label>
            <div className="col-10">
              <input type="text" className="form-control" id="street_input" name="street_location" onChange={this.dataChange} value={street_location} />
            </div>
          </div>

          <div className="mb-3">
            <select className="form-select" aria-label="Default select example" id="bazaarType_input" name="bazaarType" onChange={this.dataChange} value={bazaarType}>
              <option defaultValue="0">Selecciona tipo de bazar</option>
              <option value="1">Papelería y regalos</option>
              <option value="2">Alimentación</option>
              <option value="3">General</option>
            </select>
          </div>

          <div className="mb-3">
            <label htmlFor="file_input" className="form-label">Multiple path_untreated_picture input example</label>
            <input className="form-control" type="file" id="file_input" name="path_untreated_picture" onChange={this.dataFile}></input>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
         );
    }
}
 
export default FormBazaar;