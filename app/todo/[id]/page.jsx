import TodoCard from "../../../components/TodoCard";

const fetchedData = async (todoID) => {
    const res = await fetch(`http://localhost:4000/tasks/${todoID}`);
    const data = await res.json();
    return data;
  }

export default async function todoPage(props){
    const todo = await fetchedData(props.params.id);
    return (
        <div className="w-full">
            <TodoCard editMode={true} title={todo.title} completed={todo.completed} id={todo.id}/>
        </div>
    )
}