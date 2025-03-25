
import { useState } from "react";
import ButtonAccept from "../../components/ButtonAccept/ButtonAccept";
import FormInputs from "../../components/Form/Form";
import "./Login.css";
import { Link } from 'react-router-dom';
import Logo from '../../assets/images/Logo.svg'
import { useDispatch } from 'react-redux';
import { setEmailStore } from "../../store/reducers/email";
import api from "../../server/api";
import { setName } from "../../store/reducers/name";
import { setIsSigned } from "../../store/reducers/isSigned";
import { setToken } from "../../store/reducers/token";
import { setIdUser } from "../../store/reducers/idUser";

const Login = () => {
  const [email, setEmail] = useState<string>("");

  const [password, setPassword] = useState<string>("");

  const createInput = [
    {
      labelForInput: "Email",
      placeholderInput: "Digite seu email",
      typeInput: "email",
      setInputValue: setEmail,
      inputName: 'email',
      inputId: 'email-input'
    },
    {
      labelForInput: "Senha",
      placeholderInput: "Digite sua senha",
      typeInput: "password",
      setInputValue: setPassword,
      inputName: 'senha',
      inputId: 'senha-input'
    },
  ];

  const dispatch = useDispatch();

  function handleStoreChange(userName: string, userToken: string, userId: string) {
    dispatch(setName(userName));
    dispatch(setEmailStore(email));
    dispatch(setIsSigned(true));
    dispatch(setToken(userToken));
    dispatch(setIdUser(userId))
  }

  const handleLogin = () => {
    api.post('/login', {
      user: {
        email: email,
        password: password,
      }
    }).then(response => {
      if (response.status >= 200 && response.status <= 299) {
        const userName = response.data.data.name;
        const userToken = response.headers.authorization;
        const userId = response.data.data.id;
        handleStoreChange(userName, userToken, userId)
        allDraws(userId)
        // window.location.href = '/home';
      }
    })
      .catch(error => {
        console.error("Erro:", error);
      });
  }

  function allDraws(id: number) {
    api.get(`/draws?user_id=${id}`)
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          response.data.length ? window.location.href = '/meus_sorteios' : window.location.href = '/home';
        }
      })
      .catch(error => {
        console.error("Erro:", error);
      });
  }

  return (
    <>
      <div className="content-login">
        <img className="login-img" src={Logo} alt="Logo do Secrets Friends" />
        {createInput.map((input, index) => (
          <FormInputs key={index} {...input} />
        ))}
        {/* <button className="button-google" type="button" value="">
            <img src="img\google.png" alt="" />
            <span>Continuar com o Google</span>
            <span></span>
          </button> */}
        <ButtonAccept
          textButton="Login"
          onClick={handleLogin}
        />
        <div className="links">
          <Link to="/esqueci-minha_senha">Esqueceu sua senha</Link>
          <Link to="/cadastro">Não possui conta? Cadastre-se!</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
