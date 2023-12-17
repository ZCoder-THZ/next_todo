'use client';

import React,{useState,useRef} from 'react'
// import Modal from '@/components/modals/Modal';



const page = () => {
  const data=[
    {id:1,task:'mowiing the lawn',is_done:false},
    {id:2,task:'learn lesson',is_done:false},
    {id:3,task:'learn programming',is_done:true}

  ]
  const [todos,setTodos]=useState(data);
  const [error,setError]=useState(false);
  const [modal,setModal]=useState(false)
  const task=useRef();
  const finishTask=(id)=>{
    const taskId=todos.findIndex(todo=>todo.id==id);
  
    if(taskId!==-1){
      const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, is_done: !todo.is_done } : todo

    );
      setTodos(updatedTodos)
    }
  }
  const removeTodo=id=>{
    const taskId=todos.findIndex(todo=>todo.id==id);
      
    if(taskId!==-1){
     
      const removeTask=todos.filter(todo=>todo.id!==id);
      

      setTodos(removeTask)
    }

  }
  const addTask=(event)=>{
    const value=task.current.value;
    if(value!==''){
      setTodos([...todos,{id:todos.length+1,task:value,is_done:false}])
      cleanTask()
      setError(false)

    }else{
      setError(true)
    }
  


  }
  const handleKeyPress=()=>{
    if (event.key === 'Enter') {
      // Call your function to handle the Enter key press here
      addTask()

    }
  }
  const cleanTask=()=>{
    task.current.value=''
  }
  return (
    
<div className="h-100 w-full flex items-center justify-center bg-teal-lightest font-sans">
	<div className="bg-white rounded shadow p-6 m-4 w-full lg:w-3/4 lg:max-w-lg">
        <div className="mb-4">
            <h1 className="text-grey-darkest">Todo List</h1>
            <div className="flex mt-4">
                <input onKeyDown={handleKeyPress} ref={task} className="shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker" placeholder="Add Todo"/>
                <button onClick={addTask} className="flex-no-shrink p-2 border-2 rounded text-teal border-teal hover:text-white hover:bg-teal">Add</button>
            </div>
        </div>

        {
          error?   <div role="alert mb-4">
          <div className="bg-red-500 text-white font-bold rounded-t px-4 py-2">
            Danger
          </div>
          <div className="border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700">
            <p>Something not ideal might be happening.</p>
          </div>
            </div>:''
        }
     
        <div>
            {
              todos.map((todo)=>(
                <div key={todo.id} className="flex mb-4 items-center" >
                <p className={todo.is_done ? 'line-through w-full text-green' : 'w-full'}>{todo.task}</p>

                <button className="flex-no-shrink p-2 ml-4 mr-2 border-2 rounded hover:text-white text-green border-green hover:bg-green" onClick={()=>{
                  finishTask(todo.id)
                }}>Done</button>
                <button className="flex-no-shrink p-2 ml-2 border-2 rounded text-red border-red hover:text-white hover:bg-red" onClick={()=>{
                  removeTodo(todo.id)
                }}>Remove</button>
            </div>

              ))
            }
         
        </div>
            {/* {
              modal?<Modal/>:''
            } */}
    </div>
</div>
  )
}

export default page;