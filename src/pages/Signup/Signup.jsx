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

function Signup({ authenticated }) {

    const schema = yup.object().shape({
        name: yup
        .string()
        .required("Campo obrigatório."),
        email: yup
        .string()
        .email("Email inválido.")
        .required("Campo obrigatório."),
        password: yup
        .string()
        .min(8, "Mínimo de 8 dígitos.")
        .required("Campo obrigatório."),
        passwordConfirm: yup
        .string()
        .oneOf([yup.ref("password")], "Senhas diferentes.")
        .required("Campo obrigatório."),
    })

    const history = useHistory()

    const { register, handleSubmit, formState: { errors }} = useForm({ resolver: yupResolver(schema)});

    const onSubmitFunction = ({name, email, password}) => {
        const user = { name, email, password}

        api.post("/user/register", user)
        .then((response) => {
            toast.success("Sucesso ao criar a conta.")
            return history.push("/login")})
        .catch((err) => toast.error("Erro ao criar a conta, tente novamente."))
    }

    if(authenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <Container>
            <Background/>
                <Content>
                    <AnimationContainer>
                        <form onSubmit={handleSubmit(onSubmitFunction)}>
                            <h1>Cadastro</h1>
                            <Input label="Nome"
                            icon={FiUser}
                            placeholder="Seu nome"
                            register={register}
                            name="name"
                            error={errors.name?.message}/>
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
                            error={errors.password?.message}/>
                            <Input label="Confirmação da senha"
                            icon={FiLock}
                            placeholder="Confirmação da senha"
                            type="password"
                            register={register}
                            name="passwordConfirm" 
                            error={errors.passwordConfirm?.message}/>
                            <Button type="submit" >Enviar</Button>
                            <p>Já tem uma conta? Faça seu <Link to="/login">login</Link></p>
                        </form>
                    </AnimationContainer>
                </Content>
        </Container>
    )
}

export default Signup;