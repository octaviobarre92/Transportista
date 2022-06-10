import React, { memo, useState } from 'react'
import { Button, Col, Form, Modal, Row } from 'react-bootstrap'
import * as url from "../../config/api";
import { uniq_key } from '../../config/unq_key';
const ModalDriverComponent = memo((props) => {
    const { type, saveData, editData, handleClose, show, dataSet, dataCompany } = props;
    function handleSubmit(event) {
        event.preventDefault();
        let values = {
            first_name: event.target.elements.first_name.value,
            last_name: event.target.elements.last_name.value,
            email: event.target.elements.email.value,
            phone: event.target.elements.phone.value,
            avatar_url: event.target.elements.avatar_url.value,
            city: +event.target.elements.city.value,
            status: event.target.elements.status.value,
            company_id: event.target.elements.company_id.value
        }
        type == "nuevo" ? saveData(values) : editData(values);
    };
    return (
        <React.Fragment>
            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered  >
                <Modal.Header closeButton>
                    <Modal.Title>{type == "nuevo" ? "Nuevo conductor" : `Conductor: ${dataSet?.first_name} ${dataSet?.last_name}`}</Modal.Title>
                </Modal.Header>
                <Form id="frmSearch" onSubmit={handleSubmit}>
                    <Modal.Body>
                        <Row>
                            <Col md="6">
                                <Form.Group className="mb-3" controlId="first_name">
                                    <Form.Label>Primer Nombre</Form.Label>
                                    <Form.Control defaultValue={dataSet.first_name} required type="text" placeholder="Example ->Productos S.A" />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-3" controlId="last_name">
                                    <Form.Label>Segundo Nombre</Form.Label>
                                    <Form.Control defaultValue={dataSet.last_name} required type="text" placeholder="Agregue un plan" />
                                </Form.Group>
                            </Col>
                        
                            <Col md="6">
                                <Form.Group className="mb-3" controlId="phone">
                                    <Form.Label>Telefono</Form.Label>
                                    <Form.Control defaultValue={dataSet.phone} required type="text" placeholder="Agregue un plan" />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-3" controlId="email">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control defaultValue={dataSet.email} required type="email" placeholder="Agregue un plan" />
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-3" controlId="avatar_url">
                                    <Form.Label>URL de avatar</Form.Label>
                                    <Form.Control defaultValue={dataSet.avatar_url} required type="text" placeholder="Agregue un plan" />

                                </Form.Group>
                            </Col>
                        
                            <Col md="6">
                                <Form.Group className="mb-3" controlId="city">
                                    <Form.Label>Ciudad</Form.Label>
                                    <Form.Select defaultValue={dataSet.city} required name="city" aria-label="Default select example">
                                        {url.CATALOGO_CIUDAD.map((data) => (
                                            <option key={uniq_key()} value={data.value}>{data.label}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-3" controlId="status">
                                    <Form.Label>Estado</Form.Label>
                                    <Form.Select defaultValue={dataSet.status} required name="status" aria-label="Default select example">
                                        <option key={uniq_key()} value="Nueva">Nueva</option>
                                        <option key={uniq_key()} value="Antigua">Antigua</option>
                                        <option key={uniq_key()} value="Renovada">Renovada</option>
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                            <Col md="6">
                                <Form.Group className="mb-3" controlId="company_id">
                                    <Form.Label>Compañia</Form.Label>
                                    <Form.Select defaultValue={dataSet.company_id} required name="company_id" aria-label="Default select example">
                                        {dataCompany && dataCompany.map((data) => (
                                            <option key={uniq_key()} value={data.id}>{data.name}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                            </Col>
                        </Row>

                    </Modal.Body>
                    <Modal.Footer>
                        {props?.consult ? null : <>
                            {dataCompany == null ? "No puede guardar un conductor sin antes registrar una compañia" :
                                <React.Fragment><Button variant="secondary" onClick={() => { handleClose() }}>Cerrar</Button>
                                    <Button variant="primary" type="submit">Guardar</Button></React.Fragment>
                            }
                        </>
                        }
                    </Modal.Footer>
                </Form>
            </Modal>
        </React.Fragment >
    )
})

export default ModalDriverComponent