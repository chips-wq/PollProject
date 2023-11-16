import './modal.css'
import closeSvg from '../assets/close.svg'

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen)
        return null;
    return <div className="modal-overlay" onClick={onClose}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={onClose}>
                <img src={closeSvg} />
            </button>
            {children}
        </div>
    </div>
}
export default Modal;