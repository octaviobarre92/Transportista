import React, { memo, useState } from 'react'
import { Button, Card, Col, Row, Tab, Table, Tabs } from 'react-bootstrap'
import TableVehicleComponent from './tableVehicle'
import Services from '../../Services/apiService';
import TableVehicleDriverComponent from './tableVehiclyByDriver';
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
              <Tabs defaultActiveKey="vehicleType" id="uncontrolled-tab-example" className="mb-3">
                <Tab eventKey="vehicleType" title="Vehiculos registrados">
                  <TableVehicleComponent  />
                </Tab>
                <Tab eventKey="driverType" title="Vehiculos por conductor">
                  <TableVehicleDriverComponent  />
                </Tab>
              </Tabs>
            </Col>
          </Row>

        </Card.Body>
      </Card>
    </React.Fragment>
  )
})

export default VehicleComponent