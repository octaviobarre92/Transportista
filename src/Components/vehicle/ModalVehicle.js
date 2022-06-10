import React, { memo, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
const ModalVehicleComponent = memo((props) => {
    const { type, saveData, editData, handleClose, show, dataSet, dataSetDriver } = props;
    function handleSubmit(event) {
        event.preventDefault();
        let values = {
            driver_int: event.target.elements.driver_int.value,
            plate: event.target.elements.plate.value,
            model: event.target.elements.model.value,
            type: event.target.elements.type.value,
            capacity: event.target.elements.capacity.value,
        }
        type == "nuevo" ? saveData(values) : editData(values);
    };
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} size="xs"
                aria-labelledby="contained-modal-title-vcenter"
                centered  >
                <Modal.Header closeButton>
                    <Modal.Title>{type == "nuevo" ? "Nuevo vehiculo" : `Vehiculo: ${dataSet?.plate}`}</Modal.Title>
                </Modal.Header>
                <Form id="frmSearch" onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="plate">
                                    <Form.Label>Lámina</Form.Label>
                                    <Form.Control defaultValue={dataSet.plate} required type="text" placeholder="Example ->Productos S.A" />
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="model">
                                    <Form.Label>Modelo</Form.Label>
                                    <Form.Control defaultValue={dataSet.model} required type="text" placeholder="Agregue un plan" />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="type">
                                    <Form.Label>Tipo</Form.Label>
                                    <Form.Control defaultValue={dataSet.type} required type="text" placeholder="Agregue un plan" />
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="capacity">
                                    <Form.Label>Capacidad</Form.Label>
                                    <Form.Control defaultValue={dataSet.capacity} required type="text" placeholder="Agregue un plan" />
                                </Form.Group>
                            </Col>
                            <Col md="12">
                                <Form.Group className="mb-3" controlId="driver_int">
                                    <Form.Label>Conductor</Form.Label>
                                    <Form.Select defaultValue={dataSet?.driver_int} required name="company_id" aria-label="Default select example">
                                        {dataSetDriver && dataSetDriver.map((data) => (
                                            <option value={data.id_driver}>{data.first_name + " " + data.last_name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { handleClose() }}>Cerrar</Button>
                        <Button variant="primary" type="submit">Guardar</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </React.Fragment >
    )
})

export default ModalVehicleComponent
