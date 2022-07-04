import readLine from "node:readline";
import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import Person from "./person.js";

export default class TerminalController {
    constructor() {
        this.print = {};
        this.data = {};
    }

    initializeTerminal(database, language) {
        //usando o addLineListener para escutar os comandos de linha de comando
        //passando o parâmetro do process.stdin para receber os comandos.
        DraftLog(console).addLineListener(process.stdin)
        //Inicializa uma interface de terminal
        this.terminal = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })
        //Inicializa uma tabela que será exibida no terminal
        this.initializeTable(database, language);
    }

    closeTerminal() {
        this.terminal.close()
    }



    initializeTable(database, language) {
        const data = database.map(item => new Person(item).formatted(language))
        //Inicializa o chalktable passando as options e o database
        const table = chalkTable(this.getTableOptions(), data)
        //Incializa a impressão da tabela no console
        this.print = console.draft(table)
        this.data = data

    }

    question(msg = '') {
        return new Promise(resolve => {
            this.terminal.question(msg, resolve)
        })

    }
    /**
     *  Cria a const option que será usada para criar a tabela com o chalktable
     *  importante que nos objetos dentro do array de columns, o campo field contenha
     *  os valores dos nomes das keys do database 
     */
    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.cyan("ID") },
                { field: "vehicles", name: chalk.cyan("Vehicles") },
                { field: "kmTraveled", name: chalk.cyan("KmTraveled") },
                { field: "from", name: chalk.cyan("From") },
                { field: "to", name: chalk.cyan("To") },
            ]
        }
    }
}