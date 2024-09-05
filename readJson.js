import { fileURLToPath } from 'url';
import path from 'path';
import * as fs from 'node:fs/promises';
import { randomUUID } from 'crypto';
import date from './date.js';


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const filePathDB = path.resolve(__dirname, './db/task-cli.json')

 const readFileJson = async () =>{
    try {
        const contest = await fs.readFile(filePathDB, {encoding: 'utf8'});
        const jsonDB = JSON.parse(contest);
        return jsonDB;
    } catch (error) {
        console.log(error);
    }
}
const createFile = async() => {
    try {
        await fs.mkdir(path.resolve(__dirname, './db'), { recursive: true });
        await fs.writeFile(filePathDB, '[]', { encoding: 'utf8'});
    } catch (error) {
        console.log(error);
    }
};



const addTask = async(title = '', status = '')=>{

        const uuid = randomUUID();
        const task = {
            uuid,
            title:title.trim(),
            status,
            createAt:date(),
            updateAt:''
        }
        try {
                await  fs.access(filePathDB); 
                const tasks = await readFileJson();
                tasks.push(task);
                try {
                    await fs.writeFile(filePathDB, JSON.stringify(tasks), 'utf8');
            } catch (error) {
                console.log(error);
            }
            
        } catch (error) {
            if(error.code === 'ENOENT'){
                try {
                    await createFile();
                    const tasks = await readFileJson();
                        tasks.push(task);
                        try {
                            await fs.writeFile(filePathDB, JSON.stringify(tasks), 'utf8');
                    } catch (error) {
                        console.log(error);
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        }  
    }
    

const updateTask = async(uuid = '', title = '')=>{
    const tasks = await readFileJson();
    const task = tasks.find(e => e.uuid === uuid);
    task.title = title.trim();
    task.updateAt = date();

    try {
        await fs.writeFile(filePathDB, JSON.stringify(tasks), { encoding: 'utf8'});
    } catch(error) {
        console.log(error);
    }
}

const deleteTask = async(uuid = '')=>{
    const tasks = await readFileJson();
    const task = tasks.find(t => t.uuid === uuid);
    if(task) tasks.splice(tasks.indexOf(task), 1);
    
    try {
        await fs.writeFile(filePathDB, JSON.stringify(tasks), { encoding: 'utf8'});
    } catch (error) {
        console.log(error);
    }
}

const markTask = async(status, uuid) => {
    const tasks = await readFileJson();
    const task = tasks.find(t => t.uuid === uuid );
    task.status = status;

    try {
        await fs.writeFile(filePathDB, JSON.stringify(tasks), { encoding: 'utf8' });
    } catch (error) {
        console.error(error);
    }
};

const listTaskAll = async()=>{
    const tasks = await readFileJson();
    return tasks;
}


const listTaskOfStatus = async(done = '')=>{
    const tasks = await readFileJson();
    const doneTasks = tasks.filter(t => t.status.includes(done.trim()));
    return doneTasks
}


export {
    readFileJson,
    addTask,
    updateTask,
    deleteTask,
    markTask,
    listTaskAll,
    listTaskOfStatus
}
