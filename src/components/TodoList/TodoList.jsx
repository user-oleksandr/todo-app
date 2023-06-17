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
        <div className="box-contant">
            <div className="box-search-input">
                <input
                    type="text"
                    name="search"
                    placeholder="Search"
                    onChange={searchTodo}
                    className="search-input"
                />
                <div className="input-buttons">
                    <button onClick={() => setFilter("all")}>All</button>
                    <button onClick={() => setFilter("active")}>Active</button>
                    <button onClick={() => setFilter("completed")}>Completed</button>
                </div>
            </div>

            <ul>
                {filteredTodo().map((todoItem, index) => (
                    <li
                        key={index}
                        className="todo-item"
                        style={{
                            textDecoration: todoItem.completed ? "line-through" : "none",
                            color:
                                todoItem.category === "personal" ? "red" : todoItem.category === "work"
                                    ? "green" : todoItem.category === "study" ? "blue" : "inherit",
                        }}
                    >
                        {editIndex === index ? (
                            <form
                                className="todo-item-form"
                                onSubmit={(event) => {
                                    event.preventDefault();
                                    saveTodo(index);
                                }}
                            >
                                <input
                                    className="text"
                                    type="text"
                                    value={editText}
                                    onChange={(event) => setEditText(event.target.value)}
                                />
                                <div className="contant-input-calendar">
                                    <input
                                        className="contant-input-date"
                                        type="date"
                                        name="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <input
                                        className="contant-input-time"
                                        type="time"
                                        name="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                    />
                                </div>
                                <select
                                    className="contant-input-category"
                                    name="category"
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                >
                                    <option value="">No category</option>
                                    <option value="work">Work</option>
                                    <option value="study">Study</option>
                                    <option value="personal">Personal</option>
                                </select>
                                <div className="input-actions">
                                    <button type="submit">Save</button>
                                    <button onClick={() => setEditIndex(-1)}>Cancel</button>
                                </div>
                            </form>
                        ) : (
                            <div className="value">
                                {todoItem.text}
                                {todoItem.category && <span>({todoItem.category})</span>}
                            </div>
                        )}
                        <div className="actions">
                            <button className="button-details" onClick={() => openModal(todoItem)}
                            >
                                Details
                            </button>
                            <button onClick={() => editTodo(index)}>Edit</button>
                            <button onClick={() => toggleTodo(index)}>
                                {todoItem.completed ? "Mark as incomplete" : "Mark as complete"}
                            </button>
                            <button onClick={() => deleteTodo(index)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
