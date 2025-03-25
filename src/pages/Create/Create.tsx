import FormInputs from '../../components/Form/Form';
import { useState } from 'react';
import api from '../../server/api';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { FaXmark } from 'react-icons/fa6';
import { useDispatch, useSelector } from 'react-redux';
import { setIdDraw } from '../../store/reducers/idDraw';
import status1Breadcrumb from '../../assets/images/status-1.png'
import { RootState } from '../../store';

function Create() {
  const [drawName, setDrawName] = useState<string>('');
  const [minValue, setMinValue] = useState<string>('');
  const [maxValue, setMaxValue] = useState<string>('');
  const [dateDraw, setDateDraw] = useState<string>('');
  const [giftDate, setGiftDate] = useState<string>('');
  const [descriptionDraw, setDescriptionDraw] = useState<string>('');
  const [locationGiftExchange, setLocationGiftExchange] = useState<string>('');
  const [otherInformation, setOtherInformation] = useState<string>('');
  const formsParameters = [
    {
      labelForInput: 'Nome do Sorteio*',
      placeholderInput: 'Ex: Sorteio da Firma',
      typeInput: 'text',
      setInputValue: setDrawName,
      inputName: 'nome-sorteio',
      inputId: 'nome-sorteio-input'
    },
    {
      labelForInput: 'Valor mínimo',
      placeholderInput: 'Ex: 10,00',
      typeInput: 'number',
      setInputValue: setMinValue,
      inputName: 'valor-minimo',
      inputId: 'valor-minimo-input'
    },
    {
      labelForInput: 'Valor máximo',
      placeholderInput: 'Ex: 50,00',
      typeInput: 'number',
      setInputValue: setMaxValue,
      inputName: 'valor-maximo',
      inputId: 'valor-maximo-input'
    },
    {
      labelForInput: 'Data do Sorteio',
      placeholderInput: 'Ex: 10/12/2024',
      typeInput: 'date',
      setInputValue: setDateDraw,
      inputName: 'data-sorteio',
      inputId: 'data-sorteio-input'
    },
    {
      labelForInput: 'Data da troca de presentes',
      placeholderInput: 'Ex: 24/12/2024',
      typeInput: 'date',
      setInputValue: setGiftDate,
      inputName: 'data-presentes',
      inputId: 'data-presentes-input'
    },
    {
      labelForInput: 'Descrição do sorteio',
      placeholderInput: 'Ex: Amigo secreto da firma - 2024',
      typeInput: 'text',
      setInputValue: setDescriptionDraw,
      inputName: 'descricao',
      inputId: 'descricao-input'
    },
    {
      labelForInput: 'Local da troca de presentes',
      placeholderInput: 'Ex: Festa de confraternização',
      typeInput: 'text',
      setInputValue: setLocationGiftExchange,
      inputName: 'location',
      inputId: 'location-input'
    },
    {
      labelForInput: 'Outras informações',
      placeholderInput: 'Ex: Horário da festa',
      typeInput: 'text',
      setInputValue: setOtherInformation,
      inputName: 'outras-informacoes',
      inputId: 'outras-informacoes-input'
    },
  ];

  const dispatch = useDispatch();
  const currentUserId = useSelector((state: RootState) => state.idUser);
  const handleDraw = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    api.post('/draws',
      {
        title: drawName,
        min_value: minValue,
        max_value: maxValue,
        date_draws: dateDraw,
        date_present: giftDate,
        description: descriptionDraw,
        user_id: currentUserId,
        location: locationGiftExchange,
        other_information: otherInformation
      },
    )
      .then(response => {
        if (response.status >= 200 && response.status <= 299) {
          const idSorteio = response.data.id;
          dispatch(setIdDraw(idSorteio));
          window.location.href = '/lista'
        }
      })
      .catch(error => {
        console.error("Erro:", error);
      });
  };


  return (
    <>
      <div className='breadcrumb'>
        <div className='breadcrumb-header'>
          <Link to="/home" className='back-arrow'>
            <FaArrowLeft size={20} />
          </Link>
          <h2>Criar</h2>
          <Link to="/home" className='back-arrow'>
            <FaXmark size={20} />
          </Link>
        </div>
        <img src={status1Breadcrumb} alt="Etapa um de três" className='steps' />
      </div>
      <form onSubmit={handleDraw} className='form'>
        <div className='form-inputs'>
          {formsParameters.map((formParameter, index) =>
            <FormInputs key={index} {...formParameter} />
          )}
        </div>
        <button className='default-button' type="submit">Próximo</button>
      </form>
    </>
  )

}

export default Create