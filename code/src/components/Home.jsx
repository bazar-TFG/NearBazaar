import React from 'react';
import { Link } from "react-router-dom";
import Pagination from './Pagination';
//const logginBool = require( '../crud/operations/user');

class Home extends React.Component {
    
    constructor(props){
        super(props);
        //var exampleItems = [...Array(150).keys()].map(i => ({ id: (i+1), name: 'Item ' + (i+1) }));
        this.state = {
            data:false,
            bazaars:[],
            pageOfItems: []
        }
        this.onChangePage = this.onChangePage.bind(this);
    }

    loadData(){
        fetch("http://localhost:3300/bazaars")
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

    onChangePage(pageOfItems) {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
        
    render() {
        const{data, bazaars, pageOfItems} = this.state

        if(!data){return(<div>Cargando los bazares...</div>)}
        else{
            return ( 
            <div>
                <div id='tarjeto' class="row row-cols-1 row-cols-md-2 g-4">
                    {pageOfItems.map(
                        (bazaar)=>(
                            <Link id='tarjetolink' to={"/ejemplo/" + bazaar.id_bazaar} >
                                <div class="col">
                                    <div class="card">
                                        <img src={"./images/untrated/" + bazaar.path_untreated_picture} class="card-img-top" alt="..."/>
                                        <div class="card-body">
                                            <h5 class="card-title">Calle: {bazaar.street_location}</h5>
                                            <p class="card-text">Tipo: </p>
                                            <p class="card-text"> 
                                            {bazaar.tipo}</p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ) 
                    )}
                </div>
                    <div id='paginacion' aria-label="container-sm justify-content-center">
                        <Pagination items={bazaars} onChangePage={this.onChangePage}/>
                    </div>
            </div>
            );
        }
        }
    }


export default Home;