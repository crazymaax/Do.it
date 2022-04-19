import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from "../../components/Button/Button";
import { Container, Content } from "./styles"

function Home({ authenticated }) {

    const history = useHistory();

    const handleNavigation = (path) => {
        return history.push(path)
    }

    if(authenticated) {
        return <Redirect to="/dashboard"/>
    }

    return (
        <Container>
            <Content>
                <h1>do<span>.</span>it</h1>
                <span>Organize-se de forma fácil e efetiva</span>
                <div>
                    <Button whiteSchema onClick={() => handleNavigation("./signup")}>Cadastre-se</Button>
                    <Button onClick={() => handleNavigation("./login")}>Login</Button>
                </div>
            </Content>
        </Container>
    )
}

export default Home;