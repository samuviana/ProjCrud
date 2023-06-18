import React, {useState, useEffect} from 'react';
import './App.css';
import Axios from "axios";
import Card from './components/cards/card';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {
  const[values, setValues] = useState();
  const[ListGames, setListGames] = useState();
  const notify = () => toast.success("Cadastrado com sucesso");
  

  const handleChangeValues = (value) => {
    setValues(prevValue=>({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton = () => {
    Axios.post("http://localhost:3001/register",{
      name: values.name,
      cost: values.cost,
      category: values.category,
    }).then((Response) =>{
      console.log(Response);
    });
  };

  useEffect(() => {
    Axios.get("/http://localhost:3001/getCards").then((response)=>{
      setListGames(response.data);
    });
  }, []);

  return (
    <div className="app--container">
      <div className='register--container'>
        <h1 className='register--title'>Scrim Shop</h1>
        <input type='text' 
        name='name' 
        placeholder='Nome' 
        className='register--input'
        onChange={handleChangeValues}/>

        <input type='text' 
        name='cost' 
        placeholder='Preço' 
        className='register--input'
        onChange={handleChangeValues}/>

        <input type='text' 
        name='category' 
        placeholder='Categoria' 
        className='register--input'
        onChange={handleChangeValues}/>

        <button className='register--button' onClick={() => {
          handleClickButton()
          notify()
        }} >Cadastrar</button>
        
        <ToastContainer />
      </div>

      { typeof ListGames !== "undefined" && 
      ListGames.map((value) =>{
       return <Card key={value.id} 
       ListCard={ListGames} 
       setListCard={setListGames}
       id = {value.id}
       name = {value.name}
       cost = {value.cost}
       category = {value.category}
       ></Card>;
      })}
    
    
    </div>

    
  );
}

export default App;
