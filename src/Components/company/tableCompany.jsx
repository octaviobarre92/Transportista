import React, { memo, useState } from 'react'
import { Button, Col, Row, Table } from 'react-bootstrap'
import LoadingOverlay from "react-loading-overlay"
import ModalCompanyComponent from './ModalCompany';
import Services from '../../Services/apiService';
import ToastComponent from '../otros/toast';
import * as url from "../../config/api";
import moment from "moment";
import { uniq_key } from '../../config/unq_key';
const nuevoDatoCompany = {
    "name": "",
    "city": 1,
    "status": "",
    "plan_type": "",
    "creation_date": "",
    "id": ""
}
const TableCompanyComponent = memo(() => {
    const [dataRows, setdataRows] = useState(null);
    const [dataSet, setdataSet] = useState(nuevoDatoCompany);
    const [type, settype] = useState("nuevo");
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const [toast, settoast] = useState(false);
    const [activeLoading, setactiveLoading] = useState(false);
    const apiService = new Services();
    React.useEffect(() => {
        loadData()
    }, [])
    async function loadData() {
        setactiveLoading(true)
        await apiService.obtenerCompañias().then(async resp => {
            resp = resp.result;
            await apiService.getDriver().then(async conductor => {
                conductor = conductor.result;
                setactiveLoading(false)
                setdataRows(resp.map((data, index) => (
                    <React.Fragment>
                        <tr key={uniq_key()}>
                            <td>{data.name}</td>
                            <td>{url.CATALOGO_CIUDAD.find(x => x.value == data.city)?.label}</td>
                            <td>{data.plan_type}</td>
                            <td>{data.status}</td>
                            <td>{moment(data.creation_date, 'YYYY-MM-DD').format('YYYY-MM-DD') }</td>
                            <td style={{ textAlign: "center" }}>
                                <Button variant="info" onClick={() => { handleShow(); setdataSet(data); settype("edit") }}>Editar</Button>
                                {conductor.find(x => x.company_id == data.id) ? null :
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
    }
    function saveData(data) {
        setactiveLoading(true)
        data.id = +dataSet.id;
        apiService.newCompany(data).then(resp => {
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
        data.id = +dataSet.id;
        data.creation_date = dataSet.creation_date;
        apiService.updateCompany(data).then(resp => {
            setactiveLoading(false)
            loadData()
            settoast(true)
            handleClose();
        }).catch(err => {
            setactiveLoading(false)
        })
    }
    function deleteData(data) {
        apiService.deleteCompany(data).then(resp => {
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
                    <Col md="12" style={{ textAlign: "right", marginBottom: "15px" }} onClick={() => { setShow(true); settype("nuevo"); setdataSet(nuevoDatoCompany) }}><Button variant="success">Nuevo</Button></Col>
                </Row>
                <Row>
                    <Col md="12">
                        <Table striped bordered hover variant="white" key={uniq_key()}>
                            <thead>
                                <tr style={{ textAlign: "center" }}>
                                    <th>Nombre</th>
                                    <th>Ciudad</th>
                                    <th>Tipo de plan</th>
                                    <th>Estado</th>
                                    <th>Creación</th>
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
            {dataSet && <ModalCompanyComponent show={show} handleClose={handleClose} saveData={saveData} editData={editData} dataSet={dataSet} type={type} />}
        </React.Fragment>
    )
})

export default TableCompanyComponent