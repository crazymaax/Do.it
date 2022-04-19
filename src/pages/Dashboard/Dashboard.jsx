import { Redirect } from "react-router-dom"
import { Container, InputContainer, TasksContainer } from "./styles"
import Input from "../../components/Input/Input"
import { useForm } from "react-hook-form"
import { FiEdit2 } from "react-icons/fi"
import Button from "../../components/Button/Button"
import { useEffect, useState } from "react"
import api from "../../services/api"
import Card from "../../components/Card/Card"
import { toast } from "react-toastify"

function Dashboard({ authenticated }) {

    const [tasks, setTasks] = useState([])
    const [token] = useState(JSON.parse(localStorage.getItem("@Doit:token")) || "");

    const { register, handleSubmit} = useForm()

    function loadTasks() {
        api.get("/task", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            params: {
                completed: false,
            },
        }).then(response => {
            const apiTasks = response.data.data.map((task) => ({...task,
                createdAt: new Date(task.createdAt).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            }),
        }))
            setTasks(apiTasks)
        })
        .catch((err) => console.log(err))
    }

    useEffect(() => {
        loadTasks()
    }, [])

    const onSubmit = ({ task }) => {
        if(!task) {
            return toast.error("Complete o campo para enviar uma tarefa.")
        }

        api.post("/task",
            {
                description: task,
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }).then((response) => loadTasks())
    }

    const handleCompleted = (id) => {
        const newTasks = tasks.filter((task) => task._id !== id)

        api.put(`/task/${id}`, {
            completed: true
        },{
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }).then((response) => setTasks(newTasks))
    }

    const date = () => {
        return new Date().toLocaleDateString("pt-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
    }

     if(!authenticated) {
        return <Redirect to="/"/>
    }

    return (
        <Container>
            <InputContainer onSubmit={handleSubmit(onSubmit)}>
                <time>{date()}</time>
                <section>
                    <Input name="task"
                    icon={FiEdit2}
                    placeholder="Nova Tarefa"
                    register={register} />
                    <Button type="submit">Adicionar</Button>
                </section>
            </InputContainer>
            <TasksContainer>
                {tasks.map((task) => (
                    <Card key={task.id} title={task.description} date={task.createdAt} onClick={() => handleCompleted(task._id)} />
                ))}
            </TasksContainer>
        </Container>
    )
}

export default Dashboard