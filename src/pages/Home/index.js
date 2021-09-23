import {useParams} from 'react-router-dom'
import {Button} from '@mui/material';
import {useHistory} from "react-router"


const Home = () => {
    const { id, name, email} = useParams()
    const history = useHistory()

    function sair(){
        localStorage.clear();
        history.push("/") 
    }

    return(
        <div className="container">
            <Button onClick={sair}>Voltar</Button>

            <div className="homepage">
                <h2>Seja bem vindo {name}</h2>
                <h4>Seu email é: {email}</h4>
                <h4>E seu ID é: {id}</h4>
            </div>
        </div>
    )
}

export default Home