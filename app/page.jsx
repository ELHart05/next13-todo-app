
import './page.module.css';
import TodoCard from '../components/TodoCard';

const fetchedData = async () => {
  const res = await fetch("http://localhost:4000/tasks/", {
    cache: 'no-cache'
  });
  const data = await res.json();
  return data;
}

export default async function Home() {
  const todos = await fetchedData();
  return (
    <main>
      <h1 className='font-bold text-4xl'>List of tasks</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6'> 
        {todos && todos.map((todo, index) => (
          <TodoCard key={index} editMode={false} title={todo.title} completed={todo.completed} id={todo.id}/>
        ))}
        {!todos.length && <p className='text-red-600 font-bold text-2xl'>No Tasks for the moment!</p>}
      </div>
    </main>
  )
}
