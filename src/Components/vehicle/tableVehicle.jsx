import React, { memo, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import LoadingOverlay from "react-loading-overlay"
import ToastComponent from '../otros/toast';
import Services from '../../Services/apiService';
import ModalDriverComponent from '../drivers/ModalDriver';
import ModalCompanyComponent from '../company/ModalCompany';
import ModalVehicleComponent from './ModalVehicle';
import moment from "moment";
import { uniq_key } from '../../config/unq_key';
import PaginationComponent from '../otros/pagination';
import { Paginaton } from '../../config/pagination';
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
const nuevoDatoVehicle = {
  "creation_date": "",
  "driver_int": 1,
  "plate": "",
  "model": "",
  "type": "",
  "capacity": "",
  "id_vehicle": ""
}
const nuevoDatoCompany = {
  "name": "",
  "city": 1,
  "status": "",
  "plan_type": "",
  "creation_date": "",
  "id": ""
}
const TableVehicleComponent = memo((props) => {
  const [min, setmin] = useState(0);
  const [max, setmax] = useState(0);
  const [dataRows, setdataRows] = useState(null);
  const [dataVehicle, setdataVehicle] = useState(null);
  const [dataSetCompany, setdataSetCompany] = useState([]);
  const [dataSetCompanyNew, setdataSetCompanyNew] = useState([]);
  const [dataSetDriver, setdataSetDriver] = useState([]);
  const [dataSetDriverNew, setdataSetDriverNew] = useState([]);
  const [dataSet, setdataSet] = useState(nuevoDatoVehicle);
  const [type, settype] = useState("nuevo");
  const [show, setShow] = useState(false);
  const [showCompany, setShowCompany] = useState(false);
  const [showCompanyNew, setShowCompanyNew] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleCloseCompany = () => setShowCompany(false);
  const handleShowCompany = () => setShowCompany(true);
  const handleCloseCompanyNew = () => setShowCompanyNew(false);
  const handleShowCompanyNew = () => setShowCompanyNew(true);
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
      setdataSetCompany(company)
      await apiService.getDriver().then(async driver => {
        driver = driver.result;
        setdataSetDriver(driver)
        await apiService.getVehicle().then(async resp => {
          resp = resp.result;
          setdataVehicle(resp)
          setactiveLoading(false)
          drawRows(Paginaton(resp, 1, 5), company, driver);
        }).catch(err => {
          setactiveLoading(false)
        })
      })
    })
  }
  function drawRows(resp, company = dataSetCompany, driver = dataSetDriver) {
    setdataRows(resp.map((data, index) => (
      <React.Fragment>
        <tr key={uniq_key()}>
          <td>{data.plate}</td>
          <td>{data.model}</td>
          <td>{data.type}</td>
          <td>{data.capacity}</td>
          <td>{moment(data.creation_date, 'YYYY-MM-DD').format('YYYY-MM-DD')}</td>
          <td style={{ textAlign: "center" }}>
            <Button variant="dark" onClick={() => { handleShowCompany(); setdataSetDriverNew(driver.find(x => x.id_driver == data.driver_int)); settype("edit") }}>{driver.find(x => x.id_driver == data.driver_int)?.first_name ?? ""}{" " + driver.find(x => x.id_driver == data.driver_int)?.last_name}</Button>
          </td>
          <td style={{ textAlign: "center" }}>
            <Button variant="dark" onClick={() => {
              handleShowCompanyNew(); setdataSetCompanyNew(company.find(x => x.id == driver.find(x => x.id_driver == data.driver_int)?.company_id)); settype("edit")
            }}>{company.find(x => x.id == driver.find(x => x.id_driver == data.driver_int)?.company_id).name ?? ""}</Button>
          </td>
          <td style={{ textAlign: "center" }}>
            <Button variant="info" onClick={() => { handleShow(); setdataSet(data); settype("edit") }}>Editar</Button>
            <Button variant="danger" onClick={() => { deleteData(data) }}>Eliminar</Button>
          </td>
        </tr>
      </React.Fragment>
    )))
  }
  async function saveData(data) {
    setactiveLoading(true)
    data.id_vehicle = +dataSet.id_vehicle;
    await apiService.newVehicle(data).then(resp => {
      setactiveLoading(false)
      setdataVehicle(null)
      loadData()
      settoast(true)
      handleClose();
    }).catch(err => {
      setactiveLoading(false)
    })
  }
  async function editData(data) {
    setactiveLoading(true)
    data.id_vehicle = +dataSet.id_vehicle;
    data.creatio_date = dataSet.creatio_date;
    await apiService.updateVehicle(data).then(resp => {
      setactiveLoading(false)
      setdataVehicle(null)
      loadData()
      settoast(true)
      handleClose();
    }).catch(err => {
      setactiveLoading(false)
    })
  }
  async function deleteData(data) {
    await apiService.deleteVehicle(data).then(resp => {
      setactiveLoading(false)
      setdataVehicle(null)
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
          <Col md="12" style={{ textAlign: "right", marginBottom: "15px" }} ><Button onClick={() => {
            setShow(true); settype("nuevo"); setdataSet(nuevoDatoVehicle)
          }} variant="success">Nuevo</Button></Col>
        </Row>
        <Row>
          <Col md="12">
            <Table striped bordered hover variant="white">
              <thead>
                <tr style={{ textAlign: "center" }}>
                  <th>Lámina</th>
                  <th>Modelo</th>
                  <th>Tipo</th>
                  <th>Capacidad</th>
                  <th>Creación</th>
                  <th>Conductor</th>
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
        <Row>
          <Col md="12" style={{ textAlign: "right" }}>
            {dataVehicle && <PaginationComponent data={dataVehicle} drawRows={drawRows} />}
          </Col>
        </Row>
      </LoadingOverlay>
      <ToastComponent show={toast} onClose={() => { settoast(false) }} />

      {dataSetCompany && dataSetDriver && <ModalDriverComponent show={showCompany} dataCompany={dataSetCompany} handleClose={handleCloseCompany} consult={true} saveData={saveData} editData={editData} dataSet={dataSetDriverNew} type={type} />}

      {dataSetCompanyNew && <ModalCompanyComponent show={showCompanyNew} handleClose={handleCloseCompanyNew} consult={true} saveData={saveData} editData={editData} dataSet={dataSetCompanyNew} type={type} />}

      {dataSet && <ModalVehicleComponent dataVehicle={dataVehicle} dataSetDriver={dataSetDriver} show={show} handleClose={handleClose} saveData={saveData} editData={editData} dataSet={dataSet} type={type} />}
    </React.Fragment>
  )
})
export default TableVehicleComponent