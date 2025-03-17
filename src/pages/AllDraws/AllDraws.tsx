/* eslint-disable react-hooks/exhaustive-deps */
import { useDispatch, useSelector } from 'react-redux';
import LogoImage from '../../assets/images/Logo.svg'
import ButtonAccept from '../../components/ButtonAccept/ButtonAccept'
import { RootState } from '../../store';
import api from '../../server/api';
import { useEffect, useState } from 'react';
import { DrawInterface } from "../../interface/Draw/Draw";
import './AllDraws.css'
import { setIdDraw } from '../../store/reducers/idDraw';

function AllDraws() {

    const currentIdUser = useSelector((state: RootState) => state.idUser);
    const [draws, setDraws] = useState<DrawInterface[]>([]);

    const allDraws = () => {
        api.get(`/draws?user_id=${currentIdUser}`)
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    setDraws(response.data);
                }
            })
            .catch(error => {
                console.error("Erro:", error);
            });
    }

    useEffect(() => {
        allDraws();
    }, [currentIdUser]);

    const dispatch = useDispatch();

    function saveDrawIdStore(id: number) {
        dispatch(setIdDraw(id));
        window.location.href = "/detalhes";
    }

    return (
        <div className='main-content'>
            <div className='main-head'>
                <img className="logo" src={LogoImage} alt="Logo do Secrets Friends" />
                <h2>Meus sorteios</h2>
            </div>

            <ul className='content-cards'>
                {draws.map((draw) => (
                    <li key={draw.id} className='draw-card'>
                        <button className="draw-card-button"
                            onClick={() => saveDrawIdStore(draw.id)}>
                            <p><strong>{draw.title}</strong></p>
                            <p>Data do sorteio: {draw.date_draws}</p>
                            <p>Data da troca de presentes: {draw.date_present}</p>
                            <p>Localização: {draw.location}</p>
                        </button>
                    </li>
                ))}
            </ul>

            <div className='buttons-list'>
                <ButtonAccept
                    textButton="Criar"
                    onClick={() => window.location.href = "/criar"}
                />
            </div>
        </div>
    )

}
export default AllDraws;
