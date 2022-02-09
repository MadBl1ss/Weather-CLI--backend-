import chalk from 'chalk'
import dedent from 'dedent-js'

const printErr = (err) => {
    console.log(chalk.bgRed(' ERROR ') + ' ' + err)
}

const printSuccess = (message) => {
    console.log(chalk.bgGreen(' SUCCESS ') + ' ' + message)
}

const printHelp = () => {
    console.log(
        dedent`${chalk.bgCyan(' HELP ')}
        No params = weather output
        -s [CITY] for saving city
        -h for help
        -t [API_KEY] for saving token
        `
    )
}


const printWeather = (res, icon) => {
    console.log(
        dedent`${chalk.bgMagenta(' Weather  ')} Weather in ${res.name}
        ${icon}  ${res.weather[0].description} ${icon}
        Temperature:  ${Math.round(res.main.temp)} С° (feels like ${Math.round(res.main.feels_like)} С°) 
        Humidity: ${res.main.humidity}%
        Wind: ${res.wind.speed} m/s
        `
    )
}
export {printSuccess, printErr, printHelp, printWeather}