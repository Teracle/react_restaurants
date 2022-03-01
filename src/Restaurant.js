import React,{useEffect,useState} from 'react'
import {useParams} from 'react-router-dom'
import {Card,ListGroup,Container,Row,Col} from 'react-bootstrap'

import {MapContainer, TileLayer, Marker} from 'react-leaflet'

const Restaurant=()=>{
    const {id}=useParams();
    const [restaurant,setRestaurant]=useState([]);
    const [loading,setLoading]=useState(true);
    
    const url=`http://localhost:8080/api/restaurants/${id}`;
   
    const [success,setSuccess]=useState(true);
   
    useEffect(()=>{

       
        fetch(url)
        .then(data=>data.json())
        .then(res=>{
            if(res.hasOwnProperty('_id'))
            setRestaurant(res);
            else
            setRestaurant([]);
            console.log(res);
            
        })
        .catch((err)=>{
            setLoading(false);
            setSuccess(false);
        });
    },[url]);

  
  let dots = window.setInterval( function() {
    let wait = document.getElementById("wait");
    if ( wait.innerHTML.length > 3 ) 
        wait.innerHTML = "";
    else 
        wait.innerHTML += ".";
    }, 1000);

    if(restaurant.length===0 && success){
       
        return(
            <p id='loading'>Loading restaurant<span id="wait">.</span></p>
           
        )
    }

   

   
   console.log(restaurant._id);
        if(loading){
    return(
        
        //id in params
        // <p>Restaurant id:{id}</p>
        <>
         <Card>

<Card.Body>
    <Card.Title>{restaurant.name}
        </Card.Title>

      
       
<Card.Text>      
   {restaurant?.address.building+ ' '+ restaurant.address?.street}

</Card.Text>

</Card.Body>
</Card>

<MapContainer style={{"height": "400px"}} center={[restaurant.address.coord[1], restaurant.address.coord[0]]} zoom={13} 
scrollWheelZoom={false}>
 <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
 <Marker position={[restaurant.address.coord[1],restaurant.address.coord[0]]}></Marker>
</MapContainer>
    
    {/* place each grade and date in separate card */}
          
<Card style={{ width: '18rem', display:'inline'}}>
  <ListGroup variant="flush">
        <Card.Header style={{textAlign:"center"}}>Grades ({restaurant.grades?.length})</Card.Header>
  {restaurant.grades?.map(({grade,date})=>
         <Card style={{margin:'1rem'}}>
       <><ListGroup.Item style={{textAlign:"center"}}>{grade}</ListGroup.Item><ListGroup.Item style={{textAlign:"center"}}>{date.slice(0,10)}</ListGroup.Item></>
       
       </Card>
        
       
   )}
    
  </ListGroup>
</Card>

{/* 
<Table striped bordered hover>

            <thead>
    <tr>
        <th>Name</th>
        <th>Address</th>
        <th>Borough</th>
        <th>Cuisine</th>
    </tr>
  </thead>
  <tbody>
    
  {restaurant.grades?.map(({grade,date})=>
         <tr>
       <td >{grade}</td>
        <td>{date}</td>
        
       </tr>
   )}

   
  </tbody>
  </Table> */}
        </>

    )
}
else return <p>Unable to find restaurant with id: {id}</p>

}

export default Restaurant;