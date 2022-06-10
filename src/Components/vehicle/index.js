import React, { memo, useState } from 'react'
import { Button, Card, Col, Row, Table } from 'react-bootstrap'
import TableVehicleComponent from './tableVehicle'
import Services from '../../Services/apiService';
const VehicleComponent = memo(() => {
  return (
    <React.Fragment>
      <Card>
        <Card.Header>
          <Row>
            <Col md="12" ><h4>Vehiculo</h4></Col>
          </Row>
        </Card.Header>
        <Card.Body>
          <Row>
            <Col md="12">
              <TableVehicleComponent render={true} />
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </React.Fragment>
  )
})

export default VehicleComponent