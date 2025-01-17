import React from 'react';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Splide, SplideSlide } from "@splidejs/react-splide"
import '@splidejs/react-splide/css';



const Veggie = () => {
  const [veggie, setveggie] = useState([]);
  useEffect(() => {
    getveggie();
  }, []);
  const getveggie = async () => {
    const check=localStorage.getItem('veggie');
    if(check){
      setveggie(JSON.parse(check));
    }
    else{
      const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
      const data = await api.json();
      localStorage.setItem("veggie",JSON.stringify(data.recipes));
      setveggie(data.recipes)
      console.log(data)
    }
  }
  return (
    <div>
      <Wrapper>
        <h3>Our Vegetarian Picks</h3>
        <Splide
          options={{perPage:3,
            arrows:false,
            pagination:false,
            drag:"free",
            gap:"2rem"}}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <p>
                    {recipe.title}
                  </p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradiant/>
                </Card>
              </SplideSlide>
            )
          })}
        </Splide>
      </Wrapper>
    </div>
  )
}
const Wrapper = styled.div`margin:4rem 0rem`;
const Card = styled.div`
  min-height:18rem;
  border-radius:2rem;
  overflow:hidden;
  position:relative;
  img{
    border-radius:2rem;
   
    height:80%;
    position:absolute;
    left:0;
   
    width:100%;
    object-fit:cover;
  }
 p{
  position:absolute;
  z-index:10;
  left:50%;
  bottom:40%;
  transform:translate(-50%,0%);
  color:white;
  width:100%;
  text-align:center;
  font-weight:600;
  font-size:1rem;
  height:40%;
  display:flex;
  justify-content:center;
  align-items:center;
  margin:0 7px
 }
  `;
const Gradiant=styled.div`
z-index:3;
position:absolute;
width:100%;
height:100%;
background: linear-gradiant(rgba(0,0,0,0),rgba(0,0,0,0.5));`;

export default Veggie
