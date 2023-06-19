import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useState, useEffect} from "react";
import LoginForm from "./components/login/LoginForm";
import Modal from "./components/modal/modal";
import TodoList from "./components/TodoList/TodoList";

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
    const [fileList, setFileList] = useState([]);

    // Load user data / restore user state between page refreshes
    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            setCurrentUser(savedUser);
        }
    }, []);

    // Restore saved todo data
    useEffect(() => {
        if (currentUser) {
            const savedTodo = localStorage.getItem(`todo_${currentUser}`);
            if (savedTodo) {
                setTodo(JSON.parse(savedTodo));
            }
        }
    }, [currentUser]);

    // Save and restore todo data for each user
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
                attachments: fileList,
            },
        ]);
        event.target.todo.value = "";
        clearDateTimeFields();
        setCategory("");
        setFileList([]);
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

    const handleRegister = (username, password) => {
        if (localStorage.getItem(username)) {
            alert(
                "Username already exists. Please choose a different username."
            );
        } else {
            localStorage.setItem(username, password);
            handleLogin(username);
        }
    };

    const handleFileChange = (event) => {
        const files = Array.from(event.target.files);
        const fileArray = files.map((file) => ({
            name: file.name,
            url: URL.createObjectURL(file),
        }));
        setFileList(fileArray);
    };

    if (!currentUser) {
        return <LoginForm onLogin={handleLogin} onRegister={handleRegister}/>;
    }

    return (
        <div className="App">
            <div className='container mt-5 rounded' style={{minHeight: "600px"}}>
                <div className='row text-center'>
                    <h2 className='col mt-5'>Deadline planner</h2>
                </div>
                <hr/>
                <div className="container">
                    <div className='col'>
                        user: {currentUser}
                        <div className='col'>
                            <button className='btn btn-secondary btn-sm' onClick={handleLogout}>Logout</button>
                        </div>
                    </div>
                </div>
                <div className='row mt-5 text-center'>
                    <form onSubmit={addTodo}>
                        <div className='row justify-content-center'>
                            <div className='col-7 justify-content-center text-center'>
                                <input className="form-control text-center" type="text" name="todo"
                                       placeholder="enter your deadline"/>
                            </div>
                        </div>
                        <div className='row justify-content-center mt-4'>
                            <div className='col-5'>
                                <select className="form-select text-center" name="category" value={category}
                                        onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Category</option>
                                    <option value="personal">Personal</option>
                                    <option value="work">Work</option>
                                    <option value="study">Study</option>
                                </select>
                            </div>
                        </div>
                        <div className='row justify-content-center mt-1'>
                            <div className='col-5'>
                                <input className="form-control text-center" type="date" name="date" value={date}
                                       onChange={(e) => setDate(e.target.value)}/>
                            </div>
                        </div>
                        <div className='row justify-content-center mt-1'>
                            <div className='col-5'>
                                <input className="form-control text-center" type="time" name="time" value={time}
                                       onChange={(e) => setTime(e.target.value)}/>
                            </div>
                        </div>
                        <div className='row justify-content-center mt-1'>
                            <div className='col'>
                                <label className='btn btn-secondary btn-sm'>
                                    <span className="file-input-button">select files</span>
                                    <input
                                        type="file"
                                        name="file"
                                        multiple
                                        onChange={handleFileChange}
                                        style={{display: "none"}}
                                    />
                                </label>
                                <button className="btn btn-secondary ms-1 btn-sm" type="submit">
                                    Add
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
                <hr/>
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
            <Modal isOpen={modalOpen} onClose={closeModal} selectedTodo={selectedTodo}/>
        </div>
    );
}

export default App;
