import React, { memo, useState } from 'react'
import { Button, Card, Col, ListGroup, ListGroupItem, Row } from 'react-bootstrap'
import { uniq_key } from '../../config/unq_key';
import Services from '../../Services/apiService';

const Home = memo(() => {
    const [company, setcompany] = useState(null);
    const [driver, setdriver] = useState(null);
    const apiService = new Services();
    React.useEffect(() => {
        loadData()
    }, [])
    function loadData() {
        apiService.obtenerCompañias().then(resp => {
            setcompany(() => {
                return resp.result
            });
            apiService.getDriver().then(drivers => {
                setdriver(() => {
                    return drivers.result
                });

            })
        })
    }
    return (
        <React.Fragment>
            <Row>
                <Col md="6">
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src="https://e00-elmundo.uecdn.es/assets/multimedia/imagenes/2022/03/25/16481904597338.jpg" />
                        <Card.Body>
                            <Card.Title>Transportistas</Card.Title>
                            <Card.Text>
                                Nuevo intento para desconvocar el paro de los transportistas. El Gobierno ha subido a 1.125 millones de euros su oferta de ayudas al sector del transporte, más del doble de los 500 millones prometidos el pasado lunes, pero ha aplazado hasta después del verano la prohibición de la contratación por debajo de los costes de explotación para evitar que los transportistas trabajen a pérdidas, la principal exigencia de los convocantes del paro y máxima condición para desconvocar las protestas.. Además, el acuerdo amplía las ayudas a las empresas de transporte de viajeros, que no secundan el paro.
                            </Card.Text>
                            <a variant="primary" href="https://www.elmundo.es/motor/2022/03/25/623d645afdddff41218b45ed.html" target="_blank" style={{ backgroundColor: "white" }}>Ir a la noticia</a>
                        </Card.Body>
                    </Card>
                </Col>
                <Col md="6">
                    <Row>
                        <Col md="8">
                            <Card style={{ width: '100%' }}>
                                <Card.Img variant="top" src="https://www.academiadeltransportista.com/wp-content/uploads/2022/04/transportista-autonomo.png" />
                                <Card.Body>
                                    <Card.Title>Conoce mas sobre nuestros transportistas</Card.Title>
                                    <Card.Text>
                                        Contamos con varios transportistas a nivel nacional
                                    </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    {driver != null ? driver.map((data) => (
                                        <ListGroupItem key={uniq_key()}>{`Conductor: ${data.first_name} ${data.last_name} -> Compañia: ${company.find(x => x.id == data.company_id)?.name}`}</ListGroupItem>
                                    )) : null}
                                </ListGroup>
                            </Card>
                        </Col>
                        <Col md="6">
                        </Col>
                    </Row>
                </Col>
            </Row>
        </React.Fragment>
    )
})

export default Home