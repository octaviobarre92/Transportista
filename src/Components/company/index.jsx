import React, { memo, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import TableCompanyComponent from './tableCompany'

const CompanyComponents = memo(() => {
    return (
        <React.Fragment>
            <Card>
                <Card.Header>
                    <Row>
                        <Col md="12" ><h4>Compañias transportistas</h4></Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col md="12">
                            <TableCompanyComponent  />
                        </Col>
                    </Row>

                </Card.Body>
            </Card>
        </React.Fragment>
    )
})

export default CompanyComponents