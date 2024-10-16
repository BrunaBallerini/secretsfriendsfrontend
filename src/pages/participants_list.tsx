import '../style/home.css'
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import ButtonAccept from '../components/inputs/buttonaccept';
// import api from '../server/api';

function ParticipantsList() {

  // const handleModal = () => {
  //   api.get()
  // }

  // const handleDrawUser = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();

  //   api.post('/draw_users',
  //     {
  //       "owner": true,
  //       "suggestion": '',
  //       "user_id": "user.id", //store
  //       "draw_id": "draw.id", //store
  //     },
  //   )
  //     .then(response => {
  //       console.log(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Erro:", error);
  //     });
  // };

  return (
    <>
      <div className='home-content'>
        <div className='register-header'>
          <Link to="/home" className='back-arrow'>
            <FaArrowLeft size={20} />
          </Link>
          <h2>Adicionar Participantes</h2>
          <Link to="/home" className='back-arrow'>
            <FaXmark size={20} />
          </Link>
        </div>
        <ButtonAccept
          textButton="Adicionar"
          onClick={() => { }}
        />
      </div>
    </>
  )

}

export default ParticipantsList