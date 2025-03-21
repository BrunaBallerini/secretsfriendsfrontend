/* eslint-disable react-hooks/exhaustive-deps */
import { useSelector } from 'react-redux';
import LogoImage from '../../assets/images/Logo.svg'
import ButtonAccept from '../../components/ButtonAccept/ButtonAccept'
import { RootState } from '../../store';
import api from '../../server/api';
import { DrawInterface } from '../../interface/Draw/Draw';
import { useEffect, useState } from 'react';
import { ParticipantsInterface } from '../../interface/Participants/Participants'
import './DrawDetails.css'
import Modal from '../../components/Modal/Modal';

function DrawDetails() {

    const currentDrawId = useSelector((state: RootState) => state.idDraw);
    const currentDrawName = useSelector((state: RootState) => state.drawName);
    const [draw, setDraw] = useState<DrawInterface>();
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            </div>

            <div className='participants-detail'>
                <p><strong>Participantes:</strong></p>
                {participants.map((participant, index) => (
                    <div className='participant-detail' key={index}>
                        {participant.email}
                    </div>
                ))}
            </div>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className='modal'>
                    <h2 className='title-modal'>Outras informações</h2>
                    <div className='other-information'>
                        <p>{draw?.other_information}</p>
                    </div>
                    <ButtonAccept
                        textButton="Ok"
                        onClick={() => { setIsModalOpen(false) }}
                    />
                </div>
            </Modal>


            <div className='buttons-list'>
                <ButtonAccept
                    textButton="REALIZAR SORTEIO"
                    onClick={handleDraw}
                />
                <ButtonAccept
                    textButton="Outras informações do sorteio"
                    onClick={() => { setIsModalOpen(true) }}
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
