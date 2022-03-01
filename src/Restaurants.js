import React, {useEffect,useRef} from 'react'
import {Navigate, useLocation} from 'react-router-dom'
import {useState} from 'react'
import {Card, Table,Pagination} from 'react-bootstrap'
import {useNavigate} from 'react-router-dom'
import queryString from 'query-string';

function Restaurants(){
    const [restaurants,setRestaurants]=useState([]);
    const [page,setPage]=useState(1);
    const [success,setSuccess]=useState(true);
    const [loading,setLoading]=useState(true);
    const perPage=10;
    const navigate=useNavigate();
    
    let location=useLocation();
    let url=`http://localhost:8080/api/restaurants?page=${page}&perPage=${perPage}`;

    let query = queryString.parse(location.search);

    let local = query.borough;
    
    const urlParams=new URLSearchParams(location.search);
    //if borough is undefined in the query string, then do not include it
   
    // const loading=window.setInterval(()=>{
    //     const loading=document.getElementById('loading');
       
    //     loading.innerHTML='Sorry, we were unable to retrieve restaurants. Please try again later'
            
         
    // },10000);
    
    
    

    // const dots = window.setInterval( function() {
    //     var wait = document.getElementById("wait");
    //     if ( wait.innerHTML.length > 3 ) 
    //         wait.innerHTML = "";
    //     else 
    //         wait.innerHTML += ".";
    //     }, 300);

        


 useEffect(()=>{
    
    if(local !== undefined){
        url += `&borough=${local}`;
    }
      
      fetch(url)
          .then(data => data.json())
          .then(res => {
                
                
               setRestaurants(res);

            // setRestaurants(restaurants);
            // console.log(res.name);
            // setRestaurants(res); 
           
        })
        .catch((err)=>{
            setLoading(false);
        setSuccess(false);
            
        })
        },[page,local,success]);
      
        const previousPage=()=>{
        
            if(page>1)
            setPage(p=>p-1);
            
            
        }
        const nextPage=()=>{
            setPage(p=>p+1);
            
    
        }
        
        
        console.log(restaurants);
       console.log(success);
        
        
         if(restaurants.length===[] &&!success){
         console.log('Fetch was not successful');
        
         return(
             <p id='error'>No restaurants found.</p>
         )
         }
        
         
         let dots = window.setInterval( function() {
            let wait = document.getElementById("wait");
            if ( wait.innerHTML.length > 3 ) 
                wait.innerHTML = "";
            else 
                wait.innerHTML += ".";
            }, 1000);
       
        
        if(restaurants.length===0 && success){
        
            return(
                <p id='loading'>Loading restaurants<span id="wait">.</span></p>
                
            )
                    
        }
    
  
        
        


            
        if(loading){
    return(
        
        //query in params
        <>
        
            <Card>

                <Card.Body>
                    <Card.Title>Restaurant List</Card.Title>



                    <Card.Text>Full list of restaurants. Optionally sorted by borough


                    </Card.Text>

                </Card.Body>
            </Card>

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
    
    {restaurants.map((restaurant)=>
         <tr onClick={()=>{ navigate(`/restaurant/${restaurant._id}`)}}
         key={restaurant._id}>
       <td >{restaurant.name}</td>
        <td>{restaurant.address.building + ' '+ restaurant.address.street}</td>
        <td>{restaurant.borough}</td>
        <td>{restaurant.cuisine}</td>
        
       </tr>
   )}
   
  </tbody>
  </Table>
  <Pagination>
 <Pagination.Prev onClick={previousPage} />
 <Pagination.Item>{page}</Pagination.Item>
 <Pagination.Next onClick={nextPage} />
</Pagination>


       
            </>
         
        // <p>Restaurants query: {location.search}</p>  
    );
        }
        else return <p>No Restaurants found.</p>
}

export default Restaurants;