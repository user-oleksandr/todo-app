import "./App.css";
import React, {useState, useEffect} from "react";
import LoginForm from './components/login/LoginForm';
import Modal from "./components/modal/modal";
import TodoList from './components/TodoList/TodoList';


function App() {
    const [todo, setTodo] = useState([]);
    const [filter, setFilter] = useState("all");
    const [editIndex, setEditIndex] = useState(-1);
    const [editText, setEditText] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [category, setCategory] = useState("");
    const [searchValue, setSearchValue] = useState("");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedTodo, setSelectedTodo] = useState(null);
    const [currentUser, setCurrentUser] = useState(null);


    // завантаження даних користувача / зберегання стану користувача між оновленнями сторінки
    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, []);

    // відновлення збереженних данних про задачі
    useEffect(() => {
        if (currentUser) {
            const savedTodo = localStorage.getItem(`todo_${currentUser}`);
            if (savedTodo) {
                setTodo(JSON.parse(savedTodo));
            }
        }
    }, [currentUser]);

    // зберігати та відновлювати дані про задачі для кожного користувача
    // після перезавантаження сторінки або закриття браузера.
    useEffect(() => {
        if (currentUser) {
            localStorage.setItem(`todo_${currentUser}`, JSON.stringify(todo));
        }
    }, [todo, currentUser]);

    const clearDateTimeFields = () => {
        setDate("");
        setTime("");
    };

    const addTodo = (event) => {
        event.preventDefault();
        const newTodo = event.target.todo.value;
        if (newTodo.trim() === "" || category.trim() === "") {
            return;
        }
        setTodo([
            ...todo,
            {
                text: newTodo,
                completed: false,
                date: date,
                time: time,
                category: category,
            },
        ]);
        event.target.todo.value = "";
        clearDateTimeFields();
        setCategory("");
    };

    const deleteTodo = (index) => {
        if (window.confirm("Are you sure you want to delete this todo item?")) {
            const newTodo = [...todo];
            newTodo.splice(index, 1);
            setTodo(newTodo);
        }
    };

    const toggleTodo = (index) => {
        const newTodo = [...todo];
        newTodo[index].completed = !newTodo[index].completed;
        setTodo(newTodo);
    };

    const editTodo = (index) => {
        setEditIndex(index);
        setEditText(todo[index].text);
        setDate(todo[index].date || "");
        setTime(todo[index].time || "");
        setCategory(todo[index].category || "");
    };

    const saveTodo = (index) => {
        const newTodo = [...todo];
        newTodo[index].text = editText;
        newTodo[index].date = date;
        newTodo[index].time = time;
        newTodo[index].category = category;
        setTodo(newTodo);
        setEditIndex(-1);
        setEditText("");
        clearDateTimeFields();
        setCategory("");
    };

    const searchTodo = (event) => {
        const value = event.target.value.toLowerCase();
        setSearchValue(value);
    };

    const openModal = (todoItem) => {
        setSelectedTodo(todoItem);
        setModalOpen(true);
    };

    const closeModal = () => {
        setSelectedTodo(null);
        setModalOpen(false);
    };

    const handleLogin = (username) => {
        setCurrentUser(username);
        localStorage.setItem("currentUser", username);
    };

    const handleLogout = () => {
        setCurrentUser(null);
        localStorage.removeItem("currentUser");
    };

    if (!currentUser) {
        if (!currentUser) {
            return <LoginForm onLogin={handleLogin}/>;
        }
    }

    return (
        <div className="App">
            <h2>Deadline planner</h2>
            <div className="main">
                <div className="box-input">
                    <div className="box-logout">
                        <p className="greeting">user: {currentUser}</p>
                        <p className="greeting-button">
                            <button onClick={handleLogout}>Logout</button>
                        </p>
                    </div>
                    <form onSubmit={addTodo}>
                        <input
                            className="input-form"
                            type="text"
                            name="todo"
                            placeholder="enter your deadline"
                        />
                        <button className="button-form" type="submit">
                            Add
                        </button>
                    </form>
                    <div className="input-calendar">
                        <select
                            className="input-category"
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Category</option>
                            <option value="personal">Personal</option>
                            <option value="work">Work</option>
                            <option value="study">Study</option>
                        </select>
                        <input
                            className="input-date"
                            type="date"
                            name="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <input
                            className="input-time"
                            type="time"
                            name="time"
                            value={time}
                            onChange={(e) => setTime(e.target.value)}
                        />
                    </div>
                </div>
                        <TodoList
                            todo={todo}
                            filter={filter}
                            setFilter={setFilter}
                            editIndex={editIndex}
                            setEditIndex={setEditIndex}
                            editText={editText}
                            setEditText={setEditText}
                            date={date}
                            setDate={setDate}
                            time={time}
                            setTime={setTime}
                            category={category}
                            setCategory={setCategory}
                            searchValue={searchValue}
                            deleteTodo={deleteTodo}
                            toggleTodo={toggleTodo}
                            editTodo={editTodo}
                            saveTodo={saveTodo}
                            searchTodo={searchTodo}
                            openModal={openModal}
                        />
            </div>

            <Modal isOpen={modalOpen} onClose={closeModal} selectedTodo={selectedTodo} />
        </div>
    );
}

export default App;
