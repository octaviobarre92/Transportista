import ApiService from "./modelService";
import * as url from "../config/api";
export default class Services extends ApiService {
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Servicios de compañias                                     */
    /* ---------------------------------------------------------------------------------------------- */
    async obtenerCompañias() {
        try {
            return await this.get(url.COMPANY).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async filterCompanyById(id) {
        try {
            return await this.get(url.COMPANY + "/" + id).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async updateCompany(data) {
        try {
            return await this.put(url.COMPANY + "/" + data.id, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async deleteCompany(data) {
        try {
            return await this.del(url.COMPANY + "/" + data.id, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async newCompany(data) {
        try {
            return await this.post(url.COMPANY, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Servicios de conductores                                     */
    /* ---------------------------------------------------------------------------------------------- */
    async getDriver() {
        try {
            return await this.get(url.DRIVERS).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async updateDriver(data) {
        try {
            return await this.put(url.DRIVERS + "/" + data.id_driver, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async deleteDriver(data) {
        try {
            return await this.del(url.DRIVERS + "/" + data.id_driver, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async newDriver(data) {
        try {
            return await this.post(url.DRIVERS, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    /* ---------------------------------------------------------------------------------------------- */
    /*                                     Servicios de vehiculos                                     */
    /* ---------------------------------------------------------------------------------------------- */
    async getVehicle() {
        try {
            return await this.get(url.VEHICLE).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async updateVehicle(data) {
        try {
            return await this.put(url.VEHICLE + "/" + data.id_vehicle, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async deleteVehicle(data) {
        try {
            return await this.del(url.VEHICLE + "/" + data.id_vehicle, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
    async newVehicle(data) {
        try {
            return await this.post(url.VEHICLE, data).then(resp => ({ status: 200, result: resp }));
        }
        catch (err) {
            return undefined;
        }
    }
}