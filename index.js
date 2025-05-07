import express from "express"
const app = express()
import axios from "axios"
import { engine } from 'express-handlebars'

    // Config handlebars
    app.engine('handlebars', engine())
    app.set('view engine', 'handlebars')
    app.set('views', './views')

    app.use(express.static('public'))

app.get('/', async (req, res) => {

    async function getCountries () {
        const response = await axios.get('https://restcountries.com/v3.1/all')
        return response.data
    }

    async function genQuizModel (countries) {
        try {
            const opt = [] /* To be filled */

            // Select 4 random countries (not repeated)
            while (opt.length < 4) {
                const randomInt = Math.floor(Math.random() * countries.length)

                const repeated = opt.some(country => 
                    country.name.common == countries[randomInt].name.common
                )

                if (repeated == true) {
                    continue
                }

                opt.push(countries[randomInt])
            }

            // Select a correct one from the options
            const options = opt.map(elem => ({
                name: elem.name.common || null,
                flag: elem.flags.svg || null,
                correct: false /* New bool key */
            }))

            const randomCorrect = Math.floor(Math.random() * 4)
            options[randomCorrect].correct = true

            return options
        }
        catch (err) {
            throw new Error('Erro interno ao gerar quiz.')
        }

    }

    const countries = await getCountries()
    const quizOptions = await genQuizModel(countries)

    const flag = quizOptions.filter(elem => elem.correct == true)[0].flag

    res.render('quiz', {
        flag: flag,
        options: quizOptions
    })
})

app.listen(8088, () => {
    console.log('Running on PORT 8088')
})