import { Link, useHistory } from "react-router-dom/";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import { AnimationContainer, Background, Container, Content } from "./styles";
import { FiUser, FiMail, FiLock } from "react-icons/fi";
import { useForm } from "react-hook-form";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from "../../services/api"
import { toast } from "react-toastify"
import { Redirect } from "react-router-dom";

function Login({ authenticated, setAuthenticated }) {

    const schema = yup.object().shape({
        email: yup
            .string()
            .email("Email inválido.")
            .required("Campo obrigatório."),
        password: yup
            .string()
            .min(8, "Mínimo de 8 dígitos.")
            .required("Campo obrigatório."),
    })

    const history = useHistory()

    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(schema) });

    const onSubmitFunction = ( data ) => {
        api.post("/user/login", data)
            .then((response) => {
                const { token } = response.data

                localStorage.setItem("@Doit:token", JSON.stringify(token))

                setAuthenticated(true)

                toast.success("Seja bem-vindo.")
                return history.push("/dashboard")
            })
            .catch((err) => toast.error("Email ou senha inválidos."))
    }

    if(authenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <Container>
            <Content>
                <AnimationContainer>
                    <form onSubmit={handleSubmit(onSubmitFunction)}>
                        <h1>Login</h1>
                        <Input label="Email"
                            icon={FiMail}
                            placeholder="Seu melhor email"
                            register={register}
                            name="email"
                            error={errors.email?.message} />
                        <Input label="Senha"
                            icon={FiLock}
                            placeholder="Uma senha bem segura"
                            type="password"
                            register={register}
                            name="password"
                            error={errors.password?.message} />
                        <Button type="submit" >Enviar</Button>
                        <p>Não tem uma conta? Faça seu <Link to="/signup">cadastro</Link></p>
                    </form>
                </AnimationContainer>
            </Content>
            <Background />
        </Container>
    )
}

export default Login;