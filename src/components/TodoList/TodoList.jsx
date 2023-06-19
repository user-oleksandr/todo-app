import './TodoList.css';
import "bootstrap/dist/css/bootstrap.min.css";

const TodoList = ({
                      todo,
                      filter,
                      editIndex,
                      editText,
                      date,
                      time,
                      category,
                      searchValue,
                      deleteTodo,
                      toggleTodo,
                      editTodo,
                      saveTodo,
                      searchTodo,
                      openModal,
                      setFilter,
                      setEditText,
                      setDate,
                      setTime,
                      setCategory,
                      setEditIndex,
                  }) => {

    const filteredTodo = () => {
        let filtered = [...todo];

        if (searchValue) {
            filtered = filtered.filter((todoItem) => {
                const itemText = todoItem.text.toLowerCase();
                const itemCategory = todoItem.category ? todoItem.category.toLowerCase() : "";

                return (
                    itemText.includes(searchValue) ||
                    itemCategory.includes(searchValue)
                );
            });
        }

        switch (filter) {
            case "completed":
                return filtered.filter((todoItem) => todoItem.completed);
            case "active":
                return filtered.filter((todoItem) => !todoItem.completed);
            default:
                return filtered;
        }
    };

    return (
        <div className="container">
            <div className="row mt-5 text-center justify-content-center">
                <div className='col-7'>
                    <input className='form-control' type="text" name="search" placeholder="Search"
                           onChange={searchTodo}/>
                </div>
            </div>
            <div className='row text-center mt-1'>
                <div className='col'>
                    <button className='btn btn-secondary btn-sm' onClick={() => setFilter("all")}>All</button>
                    <button className=' btn btn-secondary ms-1 btn-sm' onClick={() => setFilter("active")}>Active
                    </button>
                    <button className='btn btn-secondary ms-1 btn-sm' onClick={() => setFilter("completed")}>Completed
                    </button>
                </div>
            </div>
            <ul className='mt-5' style={{listStyleType: "none", paddingBottom: '50px'}}>
                {filteredTodo().map((todoItem, index) => (
                    <li
                        key={index}
                        style={{
                            textDecoration: todoItem.completed ? "line-through" : "none",
                            color:
                                todoItem.category === "personal" ? "red" : todoItem.category === "work"
                                    ? "green" : todoItem.category === "study" ? "blue" : "inherit"
                        }}
                    >
                        {editIndex === index ? (
                            <div className='row mb-1 d-flex'
                                 style={{backgroundColor: 'wheat', borderRadius: '5px', marginLeft: '-45px'}}>
                                <form onSubmit={(event) => {
                                    event.preventDefault();
                                    saveTodo(index);
                                }}>
                                    <div className='row'>
                                        <div className='col-6 mt-2 mb-2'>
                                            <input className="col-4 me-1" type="text" value={editText}
                                                   onChange={(event) => setEditText(event.target.value)}/>
                                            <input className='col me-1' type="date" name="date" value={date}
                                                   onChange={(e) => setDate(e.target.value)}/>
                                            <input className='col me-1' type="time" name="time" value={time}
                                                   onChange={(e) => setTime(e.target.value)}/>
                                            <select className='me-1' name="category" value={category}
                                                    onChange={(e) => setCategory(e.target.value)}
                                                    style={{height: '1.75em'}}>
                                                <option value="">No category</option>
                                                <option value="work">Work</option>
                                                <option value="study">Study</option>
                                                <option value="personal">Personal</option>
                                            </select>
                                        </div>
                                        <div className='col-6 mb-2 text-end'>
                                            <button className='btn btn-secondary btn-sm' type="submit"
                                                    style={{border: "none"}}>Save
                                            </button>
                                            <button className='btn btn-secondary btn-sm ms-1 ' style={{border: "none"}}
                                                    onClick={() => setEditIndex(-1)}>Cancel
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="row rounded mb-1"
                                 style={{height: 'auto', backgroundColor: 'whitesmoke', marginLeft: '-45px'}}>
                                <div className='col d-flex mt-2'>
                                    {todoItem.text}{' '}
                                    {todoItem.category && <span>({todoItem.category})</span>}
                                </div>
                                <div className='col mb-1 text-end'>
                                    <button className="btn btn-secondary btn-sm"
                                            onClick={() => toggleTodo(index)}>
                                        {todoItem.completed ? "incomplete" : "complete"}
                                    </button>
                                    <button className="btn btn-secondary btn-sm ms-1"
                                            onClick={() => editTodo(index)}>Edit
                                    </button>
                                    <button className="btn btn-secondary btn-sm ms-1"
                                            onClick={() => openModal(todoItem)}>Details
                                    </button>
                                    <button className='btn btn-secondary btn-sm ms-1'
                                            onClick={() => deleteTodo(index)}>Delete
                                    </button>
                                </div>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
