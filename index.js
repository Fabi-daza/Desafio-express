const express = require('express')
const fs = require('fs')
const app = express()

app.listen(3000, console.log('Servidor activo'))
app.use(express.json())


app.get("/canciones", (req, res) =>{
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"))
    res.json(canciones)
})

app.post("/canciones", (req, res) => {
    const cancion = req.body;
    const canciones = JSON.parse(fs.readFileSync("repertorio.json", "utf-8"))
    canciones.push(cancion)
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones))
    res.send("Canción agregada")
})

app.delete("/canciones/:id", (req, res) => {
    const id  = req.params.id;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex((p) => p.id == id);
    canciones.splice(index, 1);
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('Canción eliminada');
})
app.put("/canciones/:id", (req, res) => {
    const id = req.params.id;
    const canciones = JSON.parse(fs.readFileSync('repertorio.json', 'utf-8'));
    const index = canciones.findIndex((p) => p.id == id);
    const nuevaCancion = req.body
    canciones[index] = nuevaCancion
    fs.writeFileSync('repertorio.json', JSON.stringify(canciones));
    res.send('Modificación exitosa')
})

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})