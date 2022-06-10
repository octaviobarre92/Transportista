import React, { memo } from 'react'
import { Toast } from 'react-bootstrap'
import ToastContainer from 'react-bootstrap/ToastContainer'
const ToastComponent = memo((props) => {
    return (
        <React.Fragment>
            <ToastContainer   position="top-end">
            <Toast variant="success" onClose={props?.onClose} position="top-end" show={props?.show} delay={3000} autohide>
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Success</strong>
                    <small>Justo ahora!</small>
                </Toast.Header>
                <Toast.Body variant="success" >Registro actualizado con exito!!</Toast.Body>
            </Toast>
            </ToastContainer>
        </React.Fragment>
    )
})

export default ToastComponent