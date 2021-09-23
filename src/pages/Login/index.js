import {TextField, Button} from '@mui/material';
import { useState } from 'react';
import {useHistory} from "react-router"
import axios from 'axios';

const Login = () => {

    const history = useHistory()

    const [login, setLogin] = useState('')
    const [senha, setSenha] = useState('')


    function sendTo(path){
        history.push(path)
    }

    function handleForm(data){
        data.preventDefault()
        const formData= {
            "email": login,
            "password": senha
        }

        axios.post("https://kenziehub.herokuapp.com/sessions", formData).then(response => {
            localStorage.clear();
            localStorage.setItem("token", JSON.stringify(response.data.token));
            history.push(`/dashboard`)
        }).catch((e) =>{
            alert('Login ou senha invalidos')
        })
    }

    return(
        <form className="quadrado" onSubmit={handleForm}>
            <div>
                <TextField  required
                id="outlined-required"
                label="Email"
                margin="normal"
                onChange={e => setLogin(e.target.value)}

                />
            </div>

            <div>
                <TextField  required
                id="outlined-required"
                label="senha"
                margin="normal"
                color="primary"
                type="password"
                onChange={e => setSenha(e.target.value)}
                />
            </div>
            <Button type="submit" variant="contained" className="btn-login" color="success" >Entrar</Button>
            <p className="createAccount" onClick={() => sendTo("/register")}>Não tem conta? Crie uma!</p>
        </form>
    )
}

export default Login