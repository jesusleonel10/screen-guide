import {useContext, Fragment} from 'react'
import { ContextQuery } from '../context/contextQuery';
import './../scss/Modal.scss'

const Modal = ({children, header}) => {
    //Estado global para quitar o mostrar el modal y la animacion de carga
    const {setModal} = useContext(ContextQuery)

    const handleClick = () => {
        setModal(false)
    }

    return (
        <div className='overlay'>
            <div className='container-modal'>
                <Fragment>
                <div className='container-modal__header'>
                    <h3>{header}</h3>
                    <button className='btn-close' onClick={() => handleClick()}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-x" viewBox="0 0 16 16">
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                            </svg>
                    </button>
                </div>
                {children}
                </Fragment>
            </div>
        </div>
    );
}
 
export default Modal;