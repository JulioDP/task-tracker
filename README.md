
Aplicacion TASK TRACKER 

# Ejecucion de la aplicacion
Para poder ejecutar la aplicacion se debe ejecutar el archivo app.js

# Ejemplo
node app.js
![Ejecucion](image.png)

Requerimientos cumplidos 

Add, Update, and Delete tasks
Mark a task as in progress or done
List all tasks
List all tasks that are done
List all tasks that are not done
List all tasks that are in progress

Ejemplo de los comandos aceptados

# Adding a new task
task-cli add "Buy groceries"
# Output: Task added successfully (ID: 1)

# Updating and deleting tasks
task-cli update 1 "Buy groceries and cook dinner"
task-cli delete 1

# Marking a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# Listing all tasks
task-cli list

# Listing tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress

# Guardado de informacion 
La informacion se guarda en el archivo task-cli.json si no existe el archivo task-cli se crea el archivo


https://github.com/JulioDP/task-tracker
https://roadmap.sh/projects/task-tracker