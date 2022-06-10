import React, { memo, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import LoadingOverlay from "react-loading-overlay"
import moment from "moment";
import Services from '../../Services/apiService';
import * as url from "../../config/api";
import ToastComponent from '../otros/toast';
import ModalCompanyComponent from '../company/ModalCompany';
import ModalDriverComponent from './ModalDriver';

const nuevoDato = {
  "company_id": 0,
  "city": 1,
  "first_name": "",
  "last_name": "",
  "email": "",
  "phone": "",
  "avatar_url": "",
  "status": "",
  "creatio_date": "",
  "id_driver": "0"
}
const nuevoDatoCompany = {
  "name": "",
  "city": 1,
  "status": "",
  "plan_type": "",
  "creation_date": "",
  "id": ""
}
const tableDriverComponent = memo((props) => {
  const [dataRows, setdataRows] = useState(null);
  const [dataCompany, setdataCompany] = useState(null);
  const [dataSetCompany, setdataSetCompany] = useState(nuevoDatoCompany);
  const [dataSet, setdataSet] = useState(nuevoDato);
  const [type, settype] = useState("nuevo");
  const [show, setShow] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const handleClose = () => setShow(false);
  const handleCloseCompany = () => setShowCompany(false);
  const handleShow = () => setShow(true);
  const handleShowCompany = () => setShowCompany(true);
  const [toast, settoast] = useState(false);
  const [activeLoading, setactiveLoading] = useState(false);
  const apiService = new Services();
  React.useEffect(() => {
    loadData()
  }, [])


  async function loadData() {
    setactiveLoading(true)
    await apiService.obtenerCompañias().then(async company => {
      company = company.result;
      setdataCompany(company)
      await apiService.getDriver().then(async resp => {
        resp = resp.result;
        await apiService.getVehicle().then(async conductor => {
          conductor = conductor.result;
          setactiveLoading(false)
          setdataRows(resp.map((data, index) => (
            <React.Fragment>
              <tr key={data.first_name + "" + index}>
                <td>{data.first_name + " " + data.last_name}</td>
                <td>{url.CATALOGO_CIUDAD.find(x => x.value == data.city)?.label}</td>
                <td>{data.email}</td>
                <td>{data.phone}</td>
                <td><img src={data.avatar_url} with="auto" height="50" /></td>
                <td>{data.status}</td>
                <td>{moment(data.creatio_date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
                <td style={{ textAlign: "center" }}>
                  <Button variant="dark" onClick={() => { handleShowCompany(); setdataSetCompany(company.find(x => x.id == data.company_id)); settype("edit") }}>{company.find(x => x.id == data.company_id)?.name ?? ""}</Button>
                </td>
                <td style={{ textAlign: "center" }}>
                  <Button variant="info" onClick={() => { handleShow(); setdataSet(data); settype("edit") }}>Editar</Button>
                  {conductor.find(x => +x.driver_int == +data.id_driver) ? null :
                    <Button variant="danger" onClick={() => { deleteData(data) }}>Eliminar</Button>}
                </td>
              </tr>
            </React.Fragment>
          )));
          setactiveLoading(false)
        }).catch(err => {
          setactiveLoading(false)
        })
      })
    })
  }
  function saveData(data) {
    setactiveLoading(true)
    data.id_driver = +dataSet.id_driver;
    apiService.newDriver(data).then(resp => {
      setactiveLoading(false)
      loadData()
      settoast(true)
      handleClose();
    }).catch(err => {
      setactiveLoading(false)
    })
  }
  function editData(data) {
    setactiveLoading(true)
    data.id_driver = +dataSet.id_driver;
    data.creatio_date = dataSet.creatio_date;
    apiService.updateDriver(data).then(resp => {
      setactiveLoading(false)
      loadData()
      settoast(true)
      handleClose();
    }).catch(err => {
      setactiveLoading(false)
    })
  }
  function deleteData(data) {
    apiService.deleteDriver(data).then(resp => {
      setactiveLoading(false)
      loadData()
      settoast(true)
    }).catch(err => {
      setactiveLoading(false)
    })
  }
  return (
    <React.Fragment>
      <LoadingOverlay active={activeLoading} spinner text="Procesando información, espere por favor...">
        <Row>
          <Col md="12" style={{ textAlign: "right", marginBottom: "15px" }} onClick={() => {
            setShow(true); settype("nuevo"); setdataSet(nuevoDato)
          }}><Button variant="success">Nuevo</Button></Col>
        </Row>
        <Row>
          <Col md="12">
            <Table striped bordered hover variant="white">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Nombre</th>
                  <th>Ciudad</th>
                  <th>Email</th>
                  <th>Teléfono</th>
                  <th>Avatar</th>
                  <th>Estado</th>
                  <th>Creación</th>
                  <th>Compañia perteneciente</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {dataRows}
              </tbody>
            </Table>
          </Col>
        </Row>
      </LoadingOverlay>
      <ToastComponent show={toast} onClose={() => { settoast(false) }} />
      {dataSetCompany && <ModalCompanyComponent show={showCompany} handleClose={handleCloseCompany} consult={true} saveData={saveData} editData={editData} dataSet={dataSetCompany} type={type} />}

      {dataSet && <ModalDriverComponent dataCompany={dataCompany} show={show} handleClose={handleClose} saveData={saveData} editData={editData} dataSet={dataSet} type={type} />}
    </React.Fragment>
  )
})

export default tableDriverComponent