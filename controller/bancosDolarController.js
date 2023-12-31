const util = require("../util/util");
const config = require('../package.json');

class bancosDolarController {
    constructor(dolarSiService, cryptoYaService) {
        this.dolarSiService = dolarSiService;
        this.cryptoYaService = cryptoYaService;
        this.util = new util();
    }

    /**
     * @description Obtiene todas las cotizaciones bancarias
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getAll = async (_req, res) => {
        const results = [];
        var functions = Object.values(this)
        .filter(value => typeof value === 'function')
        .filter(value => value.name.startsWith('_'));
        for (let i = 0; i < functions.length; i++) {
            const result = await functions[i]();
            results.push(result);
        }
        res.set({ 'content-type': 'application/json; charset=utf-8' });
        res.send(results);
    }

    /**
     * @description Obtener las cotizaciones del Banco BBVA
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBBVA = async (_req, res) => res.send(await this._getDolarBBVA());
    _getDolarBBVA = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'BBVA',
            descripcion: 'Banco BBVA',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa336.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa336.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa336.venta._text, 2, taxPercent),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Piano
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarPiano = async (_req, res) => res.send(await this._getDolarPiano());
    _getDolarPiano = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Piano',
            descripcion: 'Banco Piano',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa37.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa37.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa37.venta._text, 2, taxPercent),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Hipotecario
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarHipotecario = async (_req, res) => res.send(await this._getDolarHipotecario());
    _getDolarHipotecario = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Hipotecario',
            descripcion: 'Banco Hipotecario',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa217.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa217.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa217.venta._text, 2, taxPercent),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Galicia
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarGalicia = async (_req, res) => res.send(await this._getDolarGalicia());
    _getDolarGalicia = async () => {
        const data = await this.cryptoYaService.getDolarGalicia();
        return {
            nombre: 'Galicia',
            descripcion: 'Banco Galicia',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco HSBC
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarHSBC = async (_req, res) => res.send(await this._getDolarHSBC());
    _getDolarHSBC = async () => {
        const data = await this.cryptoYaService.getDolarHSBC();
        return {
            nombre: 'HSBC',
            descripcion: 'Banco HSBC',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco Macro
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarMacro = async (_req, res) => res.send(await this._getDolarMacro());
    _getDolarMacro = async () => {
        const data = await this.cryptoYaService.getDolarMacro();
        return {
            nombre: 'Macro',
            descripcion: 'Banco Macro',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }   
    
    /**
     * @description Obtener las cotizaciones del Banco Brubank
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBrubank = async (_req, res) => res.send(await this._getDolarBrubank());
    _getDolarBrubank = async () => {
        const data = await this.cryptoYaService.getDolarBrubank();
        return {
            nombre: 'Brubank',
            descripcion: 'Brubank',
            fecha: this.util.getDateTimeFromUnix(data.time),
            compra: this.util.formatCurrency(data.bid.toString()),
            venta: this.util.formatCurrency(data.ask.toString()),
            ventaAhorro: this.util.formatCurrency(data.totalAsk.toString()),
        };
    }     

    /**
     * @description Obtener las cotizaciones del Banco Santander
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarSantander = async (_req, res) => res.send(await this._getDolarSantander());
    _getDolarSantander = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Santander',
            descripcion: 'Banco Santander',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa401.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa401.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa401.venta._text, 2, taxPercent),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Ciudad de Buenos Aires
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarCiudad = async (_req, res) => res.send(await this._getDolarCiudad());
    _getDolarCiudad = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Ciudad',
            descripcion: 'Banco Ciudad',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa402.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa402.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa402.venta._text, 2, taxPercent),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Supervielle
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarSupervielle = async (_req, res) => res.send(await this._getDolarSupervielle());
    _getDolarSupervielle = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Supervielle',
            descripcion: 'Banco Supervielle',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa403.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa403.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa403.venta._text, 2, taxPercent),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Patagonia
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarPatagonia = async (_req, res) => res.send(await this._getDolarPatagonia());
    _getDolarPatagonia = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Patagonia',
            descripcion: 'Banco Patagonia',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa404.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa404.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa404.venta._text, 2, taxPercent),
        };
    }


    /**
     * @description Obtener las cotizaciones del Banco Comafi
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarComafi = async (_req, res) => res.send(await this._getDolarComafi());
    _getDolarComafi = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Comafi',
            descripcion: 'Banco Comafi',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa405.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa405.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa405.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco Nación
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarNacion = async (_req, res) => res.send(await this._getDolarNacion());
    _getDolarNacion = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Nación',
            descripcion: 'Banco Nación',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa6.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa6.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa6.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco Industrial
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBIND = async (_req, res) => res.send(await this._getDolarBIND());
    _getDolarBIND = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'BIND',
            descripcion: 'Banco Industrial',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa22.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa22.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa22.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Nuevo Banco del Chaco
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarChaco = async (_req, res) => res.send(await this._getDolarChaco());
    _getDolarChaco = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'NBCH',
            descripcion: 'Nuevo Banco del Chaco',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa334.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa334.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa334.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco de La Pampa
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarPampa = async (_req, res) => res.send(await this._getDolarPampa());
    _getDolarPampa = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Pampa',
            descripcion: 'Banco de La Pampa',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa335.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa335.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa335.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Banco de Córdoba
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarBancor = async (_req, res) => res.send(await this._getDolarBancor());
    _getDolarBancor = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Bancor',
            descripcion: 'Banco de Córdoba',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa341.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa341.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa341.venta._text, 2, taxPercent),
        };
    }

    /**
    * @description Obtener las cotizaciones del Banco de la Provincia de Buenos Aires
    * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
    */
    getDolarProvincia = async (_req, res) => res.send(await this._getDolarProvincia());
    _getDolarProvincia = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Provincia',
            descripcion: 'Banco Provincia',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa411.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa411.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa411.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones del Industrial and Commercial Bank of China (ICBC)
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarICBC = async (_req, res) => res.send(await this._getDolarICBC());
    _getDolarICBC = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'ICBC',
            descripcion: 'Banco ICBC',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa412.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa412.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa412.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones de Rebanking
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarRebanking = async (_req, res) => res.send(await this._getDolarRebanking());
    _getDolarRebanking = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Reba',
            descripcion: 'Rebanking',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa414.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa414.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa414.venta._text, 2, taxPercent),
        };
    }

    /**
     * @description Obtener las cotizaciones de Banco Roela
     * @returns Un objeto con el valor de compra, el de venta y la fecha y hora de la consulta
     */
    getDolarRoela = async (_req, res) => res.send(await this._getDolarRoela());
    _getDolarRoela = async () => {
        const data = await this.dolarSiService.getInfoDolar();
        const taxPercent = parseInt(config.taxPercent.ahorro);
        return {
            nombre: 'Roela',
            descripcion: 'Banco Roela',
            fecha: this.util.getDateTime(),
            compra: this.util.formatCurrency(data.cotiza.Capital_Federal.casa337.compra._text),
            venta: this.util.formatCurrency(data.cotiza.Capital_Federal.casa337.venta._text),
            ventaAhorro: this.util.formatCurrency(data.cotiza.Capital_Federal.casa337.venta._text, 2, taxPercent),
        };
    }
}

module.exports = bancosDolarController