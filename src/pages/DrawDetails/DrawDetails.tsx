/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import LogoImage from '../../assets/images/Logo.svg'
import ButtonAccept from '../../components/ButtonAccept/ButtonAccept'
import { RootState } from '../../store';
import api from '../../server/api';
import { DrawInterface } from '../../interface/Draw/Draw';
import { useEffect, useState } from 'react';
import { ParticipantsInterface } from '../../interface/Participants/Participants'

function DrawDetails() {

    const currentDrawId = useSelector((state: RootState) => state.idDraw);
    const currentDrawName = useSelector((state: RootState) => state.drawName);
    const [draw, setDraw] = useState<DrawInterface>();
    const [participants, setParticipants] = useState<ParticipantsInterface[]>([]);

    function showDrawDetails() {
        api.get(`/draws/${currentDrawId}`)
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    setDraw(response.data.draw);
                    setParticipants(response.data.participants)
                    console.log(response.data);
                    console.log(response.data.participants);

                    // window.location.href = "/sorteio_realizado";
                }
            })
            .catch(error => {
                console.error("Erro:", error);
            });
    }

    useEffect(() => {
        showDrawDetails();
    }, [currentDrawId]);

    function handleDraw() {
        const params = { id: currentDrawId }
        api.post('/assign_friends', params)
            .then(response => {
                if (response.status >= 200 && response.status <= 299) {
                    console.log(response.data)
                    // window.location.href = "/sorteio_realizado";
                }
            })
            .catch(error => {
                console.error("Erro:", error);
            });
    }


    return (
        <div className='main-content'>
            <div className='main-head'>
                <img className="logo" src={LogoImage} alt="Logo do Secrets Friends" />
                <h2>{currentDrawName}</h2>
                <h3>{draw?.other_information}</h3>
            </div>

            <div>
                {participants.map((participant, index) => (
                    <div className='parti' key={index}>
                        {participant.email}
                    </div>
                ))}
            </div>


            <div className='buttons-list'>
                <ButtonAccept
                    textButton="REALIZAR SORTEIO"
                    onClick={handleDraw}
                />
                <ButtonAccept
                    textButton="Lista de Presentes"
                    onClick={() => { }}
                />
                <ButtonAccept
                    textButton="Seus Sorteios"
                    onClick={() => { window.location.href = "/meus_sorteios" }}
                />
            </div>
        </div >
    )

}
export default DrawDetails;
