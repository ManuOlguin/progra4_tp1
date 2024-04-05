namespace Tareas6 {

    type Tarea =
        { Prioridad: 'Alta' | 'Media' | 'Baja', Estado: 'Pendiente' | 'Hecha', Asignado: string, Deadline: Date, Archivo: string,  tipo: "archivo", Informacion: "" } |
        { Prioridad: 'Alta' | 'Media' | 'Baja', Estado: 'Pendiente' | 'Hecha', Asignado: string, Deadline: Date, Informacion: string,  tipo: "informacion", Archivo: "" };

    type Persona = { nombre: string }

    function ordenarTareas(tareas: Tarea[]): Promise<Tarea[]> {
        return new Promise((resolve) => {
            setTimeout(() => {

                tareas.sort((a, b) => {
                    if (a.Prioridad === 'Alta' && b.Prioridad !== 'Alta') return -1;
                    if (a.Prioridad !== 'Alta' && b.Prioridad === 'Alta') return 1;
                    return 0;
                });

                resolve(tareas);
            }, 3000);
        });
    }

    

    function mostrarTareas(tareas: Tarea[]): Promise<Tarea[]> {
        return new Promise((resolve) => {
            setTimeout(() => {
                for (let i = 0; i < tareas.length; i++) {
                    console.log("___________________________________________________")
                    if (tareas[i].tipo === "archivo") {
                        console.log(`Prioridad: ${tareas[i].Asignado}\n Estado: ${tareas[i].Estado}\n Asignado: ${tareas[i].Asignado}\n Deadline: ${tareas[i].Deadline}\n La ruta del archivo es: ${tareas[i].Archivo}`);
                    } else if (tareas[i].tipo === "informacion") {
                        console.log(`Prioridad: ${tareas[i].Asignado}\n Estado: ${tareas[i].Estado}\n Asignado: ${tareas[i].Asignado}\n Deadline: ${tareas[i].Deadline}\n Informacion: ${tareas[i].Informacion}`);
                    }
                    console.log("___________________________________________________")
                }
                resolve(tareas);
            }, 3000);
        });
    }


    const testTareas: Tarea[] = [
        { Prioridad: 'Alta', Deadline: new Date('2022-12-01'), Estado: 'Pendiente', Asignado: 'John Doe', Informacion: 'Complete the project', tipo: "informacion", Archivo: ''  },
        { Prioridad: 'Baja', Deadline: new Date('2022-06-02'), Estado: 'Pendiente', Asignado: 'Jane Doe', Archivo: 'review.txt', tipo: "archivo", Informacion: ''  },
        { Prioridad: 'Media', Deadline: new Date('2022-07-03'), Estado: 'Hecha', Asignado: 'Bob Smith', Informacion: 'Review the code', tipo: "informacion", Archivo: ''  },
        { Prioridad: 'Alta', Deadline: new Date('2022-08-04'), Estado: 'Pendiente', Asignado: 'John Doe', Archivo: 'project.txt', tipo: "archivo", Informacion: '' },
        { Prioridad: 'Baja', Deadline: new Date('2022-09-05'), Estado: 'Hecha', Asignado: 'Jane Doe', Informacion: 'Write the documentation', tipo: "informacion", Archivo: ''  },
        { Prioridad: 'Media', Deadline: new Date('2022-10-06'), Estado: 'Pendiente', Asignado: 'Bob Smith', Archivo: 'code.txt', tipo: "archivo", Informacion: '' },
        { Prioridad: 'Alta', Deadline: new Date('2022-11-07'), Estado: 'Hecha', Asignado: 'John Doe', Informacion: 'Test the software', tipo: "informacion", Archivo: ''  },
        { Prioridad: 'Baja', Deadline: new Date('2022-12-08'), Estado: 'Pendiente', Asignado: 'Jane Doe', Archivo: 'documentation.txt', tipo: "archivo", Informacion: '' },
        { Prioridad: 'Media', Deadline: new Date('2023-01-09'), Estado: 'Hecha', Asignado: 'Bob Smith', Informacion: 'Fix the bugs', tipo: "informacion", Archivo: ''  },
        { Prioridad: 'Alta', Deadline: new Date('2023-02-10'), Estado: 'Pendiente', Asignado: 'John Doe', Archivo: 'bugs.txt', tipo: "archivo", Informacion: '' }
    ];

    const testPersonas: Persona[] = [
        { nombre: 'John Doe' },
        { nombre: 'Jane Doe' },
        { nombre: 'Bob Smith' }
    ];


    async function executeTareas() {
        console.log(`Empezando a las ${new Date().toLocaleTimeString()}`);
        const r1 = await ordenarTareas(testTareas);
        mostrarTareas(r1)
        console.log(`Termine a las ${new Date().toLocaleTimeString()}`);
    }
    executeTareas();
}








/*Vamos a desarrollar una aplicación para gestionar tareas. Va a ser el futuro Trello. Pero por ahora vamos a hacer una versión mínima (un MVP) hasta conseguir el primer millón de dólares de nuestros inversores. Después le agregaremos web 3, AI y metaverso 😄
1. Mostrar tareas (3 puntos)
Lo primero que queremos es que se muestren en consola todas las tareas que tiene pendientes el usuario. O sea, que aún no están terminadas. Ordenarlas por prioridad (Alta, Media, Baja).

2. Consulta a la API (1 punto)
Los inversores se quejan que las tareas tardan mucho en cargarse. Necesitamos adaptar el código anterior para que la carga se muestre de forma asíncrona.

Asumí que existe una función que devuelve el listado de tareas después de 3 segundos. Podés usar el ejemplo que hicimos en clase.

3. Asignaciones (2 puntos)
Ahora los inversores nos piden ver las tareas que tiene asignada cada persona. 
Así que necesitamos que, dado una persona, se muestren solo sus tareas de igual manera que en el punto 1. 
¡OJO: apuntamos a tener millones de tareas en nuestra base de datos!

4. Validando personas (1 punto)
Los inversores rompieron la base de datos metiendo cualquier texto en el campo de nombre de persona. 
Necesitamos una función que valide si un texto es un nombre de persona válido o no. 
Por ahora solo aceptemos que se escriba el nombre o el nombre y apellido.

5. Fecha límite (1 punto)
La forma de ordenar tareas por prioridad no está alcanzando para saber qué hacer a continuación. 
Ahora queremos que las tareas se muestren de nuevo como en el punto 1, donde las de Alta prioridad aparecen siempre primero. 
Pero las demás van a, además, tener una fecha límite (deadline) que marca que debe completarse antes de cierto día. 
Ordenarlas por la fecha límite que tenga cargada esa tarea.

6. Descripción (2 puntos)
Los usuarios de nuestra beta necesitan más información para terminar cada tarea. 
Están pidiendo poder agregar o un campo de información o que puedan adjuntar un archivo. 
Como no nos decidimos, vamos a permitirles que puedan cargar alguno de los dos.

Mostrar de vuelta las tareas como en el punto 1. 
Si una tarea tiene la descripción en forma de campo de texto, mostrar esa descripción. 
Si tiene un archivo, mostrar un mensaje informando la ruta del mismo.*/