//Em Ecmascript Modules é necessário passar a extensão do arquivo caso ele não seja mjs
import database from './../database.json'
import TerminalController from './terminalController.js';
import Person from './person.js';

const DEFAULT_LANG = "pt-BR";
const STOP_TERMINAL = ":q"
const terminal = new TerminalController();
terminal.initializeTerminal(database, DEFAULT_LANG);

async function mainLoop() {
    try {
        const answer = await terminal.question("What??")
        if (answer === STOP_TERMINAL) {
            terminal.closeTerminal()
            console.log('process finished!')
            return
        }
        const person = Person.generateInstanceFromString(answer)
        console.log('person', person.formatted(DEFAULT_LANG))
        return mainLoop()
    } catch (error) {
        console.log("Deu ruim", error)
        return mainLoop()
    }
}


await mainLoop()





/**
 Aqui estamos simulando a adição de um novo dado na tabela
 setInterval(() => {
     database.push({ id: Date.now(), vehicles: ['Test' + Date.now()] })
     const table = chalkTable(options, database)
     print(table)
 }, 400)
 * 
 */
