import React, { memo, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import Services from '../../Services/apiService';
import TableDriverComponent from './tableDriver'
const DriversComponent = memo((props) => {
    return (
        <React.Fragment>
            <Card>
                <Card.Header>
                    <Row>
                        <Col md="12" ><h4>Conductores</h4></Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md="12">
                            <TableDriverComponent render={true} />
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </React.Fragment>
    )
})

export default DriversComponent