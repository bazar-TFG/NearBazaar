import React from 'react';


class Ejemplo extends React.Component {
    
    constructor(props){
        super(props);
        this.state = {
            data:false,
            bazaars:[],
            c: ""
        }
    }
    //fecth con id
    loadData (){
        let cadena = (window.location.href);
        let cadena_array = cadena.split("/").reverse();
        let id_ref = cadena_array[0]
        //let id_ref = cadena.slice(-1);
        fetch("http://localhost:3300/ejemplo/"+ id_ref)
        .then(res=>res.json())
        .then((dat)=>{
            
            console.log(dat);
            this.setState({data:true, bazaars:dat})
        
        })
        .catch(console.log)
    }
    
    componentDidMount(){
        this.loadData();
    }
    
    calle(street){
        //a.preventDefault();
        console.log(street.replace(' ', '-'));
        this.state.c = "https://wego.here.com/directions/mix//" + street.replace(' ', '-') + ",-Madrid"
        console.log(this.state.c);
        return this.state.c
    }

    render(){   
        const{data, bazaars, c} = this.state
        if(!data){return(<div>Cargando el Bazaar</div>)}
        else{
            return (  
                      
            <div class="accordion" id="accordion">
            {bazaars.map(
                (bazaar)=>(
                <div>
                    <div class="p-3 mb-4 bg-light rounded-5" id='bazarFull'>
                        <div class="container-fluid py-5">
                            
                            <iframe onLoad= {() => this.calle(bazaar.street_location)}
                            
                                src={c}>
                            </iframe>
                        </div>
                    </div>     
                    <div class="row align-items-md-stretch">
                        <div class="col-md-6">
                            <div class="h-100 p-3 text-white bg-dark rounded-3">
                                <h1 class="display-5 fw-bold">{bazaar.street_location}</h1>
                                <h2>Tipo de Bazaar: </h2> 
                                <h3 class="col-md-8 fs-4">{bazaar.tipo}</h3>
                                <h2>Descripcion</h2>
                                <p>Swap the background-color utility and add a `.text-*` color utility to mix up the jumbotron look. Then, mix and match with additional component themes and more.</p>
                            </div>
                        </div>
                        <div class="col-md-6" data-ride="carousel">
                            <div class="h-100 p-3 bg-light border rounded-3">
                                <img src={"./images/untrated/" + bazaar.path_untreated_picture} class="card-img-top" alt=""/>
                            </div>
                        </div>
                    </div>
                </div>
            )
                
            )}
            </div>
            );  
        }  
    }
}
    
export default Ejemplo;