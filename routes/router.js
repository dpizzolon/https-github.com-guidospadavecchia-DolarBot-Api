const express = require('express');
const router = express.Router();

const util = require('../util/util')
const utilInstance = new util()

const dolarSiService = require('../services/dolarSiService')
const dolarSiServiceInstance = new dolarSiService()

const dolarController = require('../controller/dolarController')
const dolarInstance = new dolarController(dolarSiServiceInstance, utilInstance)

const bancoController = require('../controller/bancosController')
const bancoInstance = new bancoController(dolarSiServiceInstance, utilInstance)

const riesgoController = require('../controller/riesgoController');
const riesgoInstance = new riesgoController(dolarSiServiceInstance, utilInstance)

const euroController = require('../controller/euroController')
const euroInstance = new euroController(dolarSiServiceInstance, utilInstance)

const realController = require('../controller/realController')
const realInstance = new realController(dolarSiServiceInstance, utilInstance)

const bcraController = require('../controller/bcraController')
const bcraInstance = new bcraController(dolarSiServiceInstance, utilInstance)

/**
 * @description Status
 */
router.get('/api/status', async (_req, res, _next) => res.sendStatus(200));

/**
 * @description Rutas dolar
 */
router.get('/api/dolar/oficial', dolarInstance.getDolarOficial)
router.get('/api/dolar/blue', dolarInstance.getDolarBlue)
router.get('/api/dolar/contadoliqui', dolarInstance.getContadoConLiqui)
router.get('/api/dolar/promedio', dolarInstance.getDolarPromedio)
router.get('/api/dolar/bolsa', dolarInstance.getDolarBolsa)

/**
 * @description Rutas bancos
 */
router.get('/api/dolar/bancos/bbva', bancoInstance.getDolarBBVA)
router.get('/api/dolar/bancos/piano', bancoInstance.getDolarPiano)
router.get('/api/dolar/bancos/hipotecario', bancoInstance.getDolarHipotecario)
router.get('/api/dolar/bancos/galicia', bancoInstance.getDolarGalicia)
router.get('/api/dolar/bancos/santander', bancoInstance.getDolarSantander)
router.get('/api/dolar/bancos/ciudad', bancoInstance.getDolarCiudad)
router.get('/api/dolar/bancos/supervielle', bancoInstance.getDolarSupervielle)
router.get('/api/dolar/bancos/patagonia', bancoInstance.getDolarPatagonia)
router.get('/api/dolar/bancos/comafi', bancoInstance.getDolarComafi)
router.get('/api/dolar/bancos/nacion', bancoInstance.getDolarNacion)
router.get('/api/dolar/bancos/bind', bancoInstance.getDolarBIND)
router.get('/api/dolar/bancos/chaco', bancoInstance.getDolarChaco)
router.get('/api/dolar/bancos/pampa', bancoInstance.getDolarPampa)
router.get('/api/dolar/bancos/bancor', bancoInstance.getDolarBancor)

/**
 * @description Rutas euro
 */
router.get('/api/euro/bancos/nacion', euroInstance.getEuroNacion)
router.get('/api/euro/bancos/galicia', euroInstance.getEuroGalicia)
router.get('/api/euro/bancos/bbva', euroInstance.getEuroBBVA)
router.get('/api/euro/bancos/pampa', euroInstance.getEuroPampa)
router.get('/api/euro/bancos/chaco', euroInstance.getEuroChaco)
router.get('/api/euro/bancos/hipotecario', euroInstance.getEuroHipotecario)

/**
 * @description Rutas real
 */
router.get('/api/real/bancos/nacion', realInstance.getRealNacion)
router.get('/api/real/bancos/bbva', realInstance.getRealBBVA)
router.get('/api/real/bancos/chaco', realInstance.getRealChaco)

/**
 * @description Rutas Reservas y Circulante
 */
router.get('/api/bcra/riesgopais', riesgoInstance.getRiesgoPais)
router.get('/api/bcra/reservas', bcraInstance.getReservas)
router.get('/api/bcra/circulante', bcraInstance.getCirculante)

/**
 * @description Rutas evolución mensual
 */
router.get('/api/evolucion/dolar/oficial', dolarInstance.getEvolucionDolarOficial)
router.get('/api/evolucion/dolar/blue', dolarInstance.getEvolucionDolarBlue)
router.get('/api/evolucion/real/oficial', realInstance.getEvolucionReal)
router.get('/api/evolucion/euro/oficial', euroInstance.getEvolucionEuro)


module.exports = router