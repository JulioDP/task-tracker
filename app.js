import readLine from 'readline';
import { addTask, markTask, updateTask, deleteTask, listTaskAll, listTaskOfStatus } from './readJson.js';

const ls = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});

const evaluarCmd =  async (operation)=> {
    const { cmd } = operation;
    
    const cmdOne = cmd?.split(' ')[0];
    const cmdTwo = cmd?.split(' ')[1] ?? '';
    const clsCmd = ['add', 'update', 'delete', 'mark-in-progress', 'mark-done', 'list'];
    const cmdList = ['list done', 'list todo', 'list in-progress'];
    

    if(clsCmd.includes(cmdOne)) {
        let title = cmd;
        switch(cmdOne){
            case 'add':   
                    title = title.replace(cmdOne,'');
                    title = title.replaceAll("\"",'');
                    addTask(title);    
                    break;  
            case 'update':
                    title = title.replace(cmdOne,'');
                    title = title.replace(cmdTwo,'');
                    title = title.replaceAll("\"",'');
                    updateTask(cmdTwo,title);    
                    break; 
            case 'delete':
                    deleteTask(cmdTwo);    
                    break;
            case 'mark-in-progress':
            case 'mark-done':
                    markTask(cmdOne, cmdTwo);
                    break;
            case 'list':
                 if(cmdTwo.trim() != '' && cmdList.includes(cmdTwo)){        
                    const tasks =  await listTaskOfStatus(cmdTwo);
                    tasks.forEach(task => {
                        console.log(`${task.uuid} - ${task.title} - ${task.status}`);
                    });
                 }else {
                    const tasks = await listTaskAll();
                    tasks.forEach(task => {
                        console.log(`${task.uuid} - ${task.title} - ${task.status}`);
                    });
                 }
        }
    }


}

const question = ()=>{
        ls.question('Task-cli ', (cmd) => {
            if(cmd.trim() != ''){
                const cmdOne = cmd.split(' ')[0];
                const cmdTwo = cmd.split(' ')[1];

                if(cmdOne.trim() || cmdTwo.trim()) evaluarCmd({cmd});
                    if(cmd === 'exit') {
                        ls.close();
                    }else{
                        question()  
                    }
            }else{
                question()  
            }

            
        })
}

question()  