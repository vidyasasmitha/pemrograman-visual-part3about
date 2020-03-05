const electron = require("electron");

const {app, BrowserWindow, Menu, ipcMain} = electron;

let todayWindow;
let createWindow;
let listWindow;

app.on("ready", ()=> {

    todayWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        title : "Aplikasi Electron"
    });

    todayWindow.loadURL(`file://${__dirname}/today.html`);
    todayWindow.on("close", ()=> {
        app.quit();
        todayWindow = null;
    });

    const mainMenu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(mainMenu);
    
});


const listWindowCreator = () => {
    listWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "All Appointments"
    });

    listWindow.setMenu(null);
    listWindow.loadURL(`file://${__dirname}/list.html`);
    listWindow.on("closed", () => (listWindow = mull))
};

const createWindowCreator = () => {
    createWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "Create Appointments"
    });

    createWindow.setMenu(null);
    createWindow.loadURL(`file://${__dirname}/create.html`);
    createWindow.on("closed", () => (listWindow = null))
};

const aboutWindowCreator = () => {
    aboutWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        width: 600,
        height: 400,
        title: "About Pages"
    });

    aboutWindow.setMenu(null);
    aboutWindow.loadURL(`file://${__dirname}/about.html`);
    aboutWindow.on("closed", () => (aboutWindow = null))
};

ipcMain.on("appointment:create", (event, appointment) => {
    console.log(appointment);
});

const menuTemplate = [{
    label: "File",
    submenu: [{
            label: "New Appointment",

             click() {
               createWindowCreator();
                }
            },
            {
            label: "All Appointments",
            click() {
                createWindowCreator();
                }
            },
            {
            label: "Quit",
            accelerator: process.platform === "darwin" ? "Command+Q" : "Ctrl + Q",
            click() {
                app.quit();
                }    
            }
        ]
},

    {
        label: "View",
        submenu: [{ role: "reload"}, {role: "toggledevtools"}]
    },
    {
        label: "About",
        click(){
            aboutWindowCreator();
        }
    }
]


