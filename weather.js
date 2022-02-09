#!/usr/bin/env node
import { getArgs } from './helpers/args.js'
import { printHelp, printErr, printSuccess, printWeather } from './services/log.service.js'
import { saveKeyValue, TOKEN_DICTIONARY, getKeyValue} from './services/storage.service.js'
import { getWeather, getIcon } from './services/api.service.js'
  
const saveToken = async (token) => {
    if (!token.length) {
        printErr('Token not transferred')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.token, token) 
        printSuccess("Token has been successfully saved")
    } catch (e) {
        printErr(e.message)
    }
    
}

const saveCity = async (city) => {
    if (!city.length) {
        printErr('City not transferred')
        return
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city) 
        printSuccess("City has been successfully saved")
    } catch (e) {
        printErr(e.message)
    }
    
}

const getForecast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city)
        const weather = await getWeather(city);
        printWeather(weather, getIcon(weather.weather[0].icon))
    } catch(e) {
        if (e?.response?.status == 404) {
            printErr('Incorrect city')
        } else if (e?.response?.status == 401) {
            printErr('Incorrect token')
        } else {
            printErr(e.message)
        }
    }

}
const initCLI = () => {
    const args = getArgs(process.argv)
    if (args.h) {
        return printHelp()
    }
    if (args.s) {
        return saveCity(args.s)
    }
    if (args.t) {
        return saveToken(args.t)
    }
    // output weather
    return getForecast()
}

initCLI()