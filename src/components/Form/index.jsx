import {TextField, Button} from '@mui/material';
import { useForm } from 'react-hook-form';
import {yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup";
import axios from 'axios';
import { useHistory } from 'react-router';

export default function Form(){

    const history = useHistory();

    const schema = yup.object().shape({
        email: yup.string().email("Email inválido").required("Campo obrigatório"),
        name: yup.string().required("Campo obrigatório"),
        password: yup.string().min(8, "Mínimo de 8 dígitos").matches(/^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/, "Senha deve conter ao menos uma letra maiúscula, uma minúscula, um número e um caracter especial!").required("Campo obrigatório"),
        passwordConfirmation: yup.string().oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')    
    });

    const {register, handleSubmit, formState: { errors } } = useForm({resolver: yupResolver(schema)}) 

    function pageLogin(){
        history.push("/");
    }


    function handleForm(data){
        const formData = {
            "email": data.email,
            "password": data.password,
            "name": data.name,
            "bio": "Sem Bio no momento",
            "contact": data.email,
            "course_module": "Q2"
        }

        axios.post("https://kenziehub.herokuapp.com/users", formData).then(response => {
            history.push(`/sucesso/${data.name}`)
        }).catch(e => {
            alert('Usuario já existe')
        })
    }

    return(
        <form className="formRegister" onSubmit={handleSubmit(handleForm)}>
            <div className="divTexts">
                <TextField
                id="outlined-required"
                variant="outlined"
                size="small"
                color="primary"
                margin="normal"
                label="Nome"
                {...register("name")}
                error={!!errors.name}
                helperText={errors.name?.message}
                />
            </div>
          
            <div className="divTexts">
                <TextField  
                id="outlined-required"
                variant="outlined"
                size="small"
                color="primary"
                margin="normal"
                label="Email"
                {...register("email")}
                error={!!errors.email}
                helperText={errors.email?.message}
                />
            </div>

            <div className="divTexts">
                <TextField  
                id="outlined-required"
                variant="outlined"
                size="small"
                color="primary"
                margin="normal"
                label="Senha"
                type="password"
                {...register("password")}
                error={!!errors.password}
                helperText={errors.password?.message}
                />
            </div>
            <div className="divTexts">
                <TextField  
                id="outlined-required"
                variant="outlined"
                size="small"
                color="primary"
                margin="normal"
                label="Confirme senha"
                type="password"
                {...register("passwordConfirmation")}
                error={!!errors.passwordConfirmation}
                helperText={errors.passwordConfirmation?.message}
                />
            </div>

            <Button className="btn-register" type="Submit" variant="contained" color="success">Cadastrar</Button>
            <p className="createAccount" onClick={pageLogin}>Já é cadastrado? Faça login</p>
        </form>
    )

}