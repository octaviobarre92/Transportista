import React, { memo, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import * as url from "../../config/api";
import { uniq_key } from '../../config/unq_key';

const ModalCompanyComponent = memo((props) => {
    const { type, saveData, editData, handleClose, show, dataSet } = props;
    function handleSubmit(event) {
        event.preventDefault();
        let values = {
            name: event.target.elements.name.value,
            city: +event.target.elements.city.value,
            status: event.target.elements.status.value,
            plan_type: event.target.elements.plan_type.value,
        }
        type == "nuevo" ? saveData(values) : editData(values);
    };
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} size="xs" aria-labelledby="contained-modal-title-vcenter" centered  >
                <Modal.Header closeButton>
                    <Modal.Title>{type === "nuevo" ? "Nueva compañia" : `Compañia: ${dataSet?.name}`}</Modal.Title>
                </Modal.Header>
                <Form id="frmSearch" onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="name">
                                    <Form.Label>Nombre de la compañia</Form.Label>
                                    <Form.Control defaultValue={dataSet.name} required type="text" placeholder="Example ->Productos S.A" />
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="plan_type">
                                    <Form.Label>Tipo de plan</Form.Label>
                                    <Form.Control defaultValue={dataSet.plan_type} required type="text" placeholder="Agregue un plan" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="city">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Select defaultValue={dataSet.city} required name="city" aria-label="Default select example">
                                        {url.CATALOGO_CIUDAD.map((data) => (
                                            <option key={uniq_key()} value={data.value}>{data.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="status">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select defaultValue={dataSet.status} required name="status" aria-label="Default select example">
                                        <option key={uniq_key()} value="Nueva">Nueva</option>
                                        <option key={uniq_key()} value="Antigua">Antigua</option>
                                        <option key={uniq_key()} value="Renovada">Renovada</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    {props?.consult ? null :
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => { handleClose() }}>Cerrar</Button>
                            <Button variant="primary" type="submit">Guardar</Button>
                        </Modal.Footer>}
                </Form>
            </Modal>
        </React.Fragment >
    )
})

export default ModalCompanyComponent