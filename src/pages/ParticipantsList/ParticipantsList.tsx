import './ParticipantsList.css'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import ButtonAccept from '../../components/ButtonAccept/ButtonAccept';
import status2Breadcrumb from '../../assets/images/status-2.png'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { addParticipantList, removeParticipant } from '../../store/reducers/participantsList';
import { useState } from 'react';
import Modal from '../../components/Modal/Modal';
import api from '../../server/api';

function ParticipantsList() {
  const participantsListStore = useSelector((state: RootState) => {
    return state.participantList;
  });

  const currentDrawId = useSelector((state: RootState) => {
    return state.idDraw;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailAddParticipant, setEmailAddParticipant] = useState<string>('');

  const dispatch = useDispatch();

  const handleAddParticipant = () => {
    dispatch(addParticipantList(emailAddParticipant));
    setIsModalOpen(false);
  };

  const handleFinish = () => {
    const params = {
      participants: participantsListStore,
      draw_id: currentDrawId
    }
    api.post('/participants', params)
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          window.location.href = '/meus_sorteios'
        }
      })
      .catch(error => {
        console.log(params)
        console.error("Erro:", error);
      });
  };

  const handleEditClick = (participant: string) => {
    dispatch(removeParticipant(participant));
    setEmailAddParticipant(participant)
    setIsModalOpen(true);
  };

  const handleDeleteClick = (participant: string) => {
    dispatch(removeParticipant(participant));
  }

  return (
    <>
      <div className='main-content'>
        <div className='breadcrumb'>
          <div className='breadcrumb-header'>
            <Link to="/home" className='back-arrow'>
              <FaArrowLeft size={20} />
            </Link>
            <h2>Adicionar Participantes</h2>
            <Link to="/home" className='back-arrow'>
              <FaXmark size={20} />
            </Link>
          </div>
          <img src={status2Breadcrumb} alt="Etapa um de três" className='steps' />
        </div>

        <div className='padding-8px'>
          <h2>Lista de Participantes</h2>
        </div>

        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2 className='title-modal'>Informações do participante</h2>

          <form onSubmit={handleAddParticipant} className='form-modal' method="Post">
            <div className='form-inputs'>
              <label htmlFor='email-input'>'Email'</label>
              <input
                type='email'
                placeholder='Ex: email@email.com'
                name='email'
                id='email-input'
                value={emailAddParticipant}
                onChange={(event) => setEmailAddParticipant(event.target.value)}
              />
            </div>
            <button className='button-modal' type="submit">Salvar</button>
          </form>
        </Modal>

        <div className='message'>
          {participantsListStore.length > 0 ?
            participantsListStore.map((participant, index) => (
              <div className='message-participant' key={index}>
                <p>{index} - {participant}</p>
                <div className='edition-buttons'>

                  <button className='delete-button' type="button" name="delete" onClick={() => {
                    handleDeleteClick(participant)
                  }}>X</button>

                  <button className='edit-button' type="button" name="edit" onClick={() => {
                    handleEditClick(participant)
                  }}>
                    <img src="src/assets/images/edit_icon.png" alt="Editar" className="icon" />
                  </button>
                </div>
              </div>

            )) : <p className='color-font-gray'>Você não tem nenhum<br /> partipante cadastrado</p>}
        </div>

        <div className='buttons-list'>
          <ButtonAccept
            textButton="Adicionar"
            onClick={() => {
              setEmailAddParticipant('');
              setIsModalOpen(true);
            }}
          />
          <ButtonAccept
            textButton="Enviar"
            onClick={handleFinish}
          />
        </div>
      </div>
    </>
  )

}

export default ParticipantsList