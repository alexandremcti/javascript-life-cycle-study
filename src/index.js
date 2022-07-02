import DraftLog from 'draftlog'
import chalk from 'chalk'
import chalkTable from 'chalk-table'
import readline from 'node:readline'
import database from './../database.json'
//Em Ecmascript Modules é necessário passar a extensão do arquivo caso ele não seja mjs
import Person from './person.js'



//usando o addLineListener para escutar os comandos de linha de comando
//passando o parâmetro do process.stdin para receber os comandos.
DraftLog(console).addLineListener(process.stdin)
const DEFAULT_LANG = "pt-BR";

/**
 *  Cria a const option que será usada para criar a tabela com o chalktable
 *  importante que nos objetos dentro do array de columns, o campo field contenha
 *  os valores dos nomes das keys do database 
 */
const options = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.cyan("ID") },
        { field: "vehicles", name: chalk.cyan("Vehicles") },
        { field: "kmTraveled", name: chalk.cyan("KmTraveled") },
        { field: "from", name: chalk.cyan("From") },
        { field: "to", name: chalk.cyan("To") },
    ]
}
//Inicializa o chalktable passando as options e o database
const table = chalkTable(options, database.map(item => new Person(item).formatted(DEFAULT_LANG)))
//Incializa a impressão da tabela no console
const print = console.draft(table)

/**
 Aqui estamos simulando a adição de um novo dado na tabela
 setInterval(() => {
     database.push({ id: Date.now(), vehicles: ['Test' + Date.now()] })
     const table = chalkTable(options, database)
     print(table)
 }, 400)
 * 
 */

const terminal = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

/**
 terminal.question('Qual é o seu nome?', msg => {
     console.log('msg', msg.toString())
 })
 * 
 */

