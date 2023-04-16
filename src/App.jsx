

import { useEffect, useState } from 'react';
import './App.css'
import NewItem from './components/NewItem/NewItem';
import TodoList from './components/TodoList/TodoList';
import { nanoid } from 'nanoid';


const DEFAULT_LIST=[{
  title:'Study JS',
  priority:'high',
  id:nanoid()

},
{
  title:'Study React',
  priority:'medium',
  id:nanoid()
},
{
   title:'Study CSS',
   priority:'low',
   id:nanoid()
}
]

const App=()=>{
  const [list,setList]=useState([]);
  const [editState,setEditState] = useState({});



  useEffect(()=>{
    fetch('http://localhost:4000/api/v1/list').then((res)=>{
      res.json().then((json)=>{
        setList(json)
      })
    }).catch(()=>{
      console.log('Nerwork error')
    })
  },[])


  console.log(editState);
  const deleteItem=(id)=>{
          const filteredList=list.filter((item)=>item.id!==id)
          setList([...filteredList]);
  }

  const triggerEdit = (item) => {
    setEditState(item);
  }
  const editItem = (updatedItem) => {
  
        const updatedList = list.map((item)=>{
            if(item.id===updatedItem.id){
              return updatedItem
            }
            else{
              return item;
            }
        })
        setList([...updatedList]);
  }

  
  const addItem=(item)=>{
          item.id=nanoid();
          fetch("http://localhost:4000/api/v1/list",{
            method: "POST",
            headers: {
              'Accept': 'application/json,text/plain,*/*',
              'Content-Type' : 'application/json'
            },
            body: JSON.stringify(item)
          }).then(()=> setList((prev)=> [item,...prev]))
          .catch((err)=> console.log(err))        


  }


  return(
    <div className='App'>

        <h1 className='title'>Todo List</h1>
            
        <NewItem addItem={addItem} editItem={editItem} editState={editState}/>
        <TodoList list={list} deleteItem={deleteItem} triggerEdit={triggerEdit}/>
    </div> 
    
  )
}






export default App;
