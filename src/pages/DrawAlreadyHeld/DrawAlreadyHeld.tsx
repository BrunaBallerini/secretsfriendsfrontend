import drawAlreadyHeld from '../../assets/images/drawAlreadyHeld.png'
import LogoImage from '../../assets/images/Logo.svg'
import ButtonAccept from '../../components/ButtonAccept/ButtonAccept'

function DrawAlreadyHeld() {
    return (
        <div className='main-content'>
            <div className='main-head'>
                <img className="logo" src={LogoImage} alt="Logo do Secrets Friends" />
            </div>
            <div className='img-text'>
                <h1 className='message-home'>Sorteio já realizado!</h1>
                <img src={drawAlreadyHeld} alt="Caixa de presente aberta saindo confetes de dentro." />
            </div>
            <div className='buttons-list'>
                <ButtonAccept
                    textButton='Meus Sorteios'
                    onClick={() => { window.location.href = "/meus_sorteios" }}
                />
            </div>
        </div>
    )

}
export default DrawAlreadyHeld