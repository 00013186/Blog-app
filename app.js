 // third party libs
const express = require('express')
const app = express()

// node libs
const fs = require('fs')
const PORT = 8000


app.set('view engine', 'pug')
app.use('/static', express.static('public'))
app.use(express.urlencoded({ extended: false }))

//http://localhost:8000
app.get('/', (req, res) => {
    fs.readFile('./data/blogs.json', (err, data) => {
        if (err) throw err

        const todos = JSON.parse(data)

        res.render('home', { todos: todos })
    })
})

app.post('/add', (req, res) =>{
    console.log(Math.random(36).toString().substring(2,9))
    const formData = req.body
        console.log(formData.todo.trim() =='')
        if (formData.todo.trim() == ''){
        fs.readFile('./data/blogs.json', (err, data) =>{
            if (err) throw err
            
            const todos = JSON.parse(data)
            
            res.render('home', {error: true, todos: todos})
        })
    } else {
        fs.readFile('./data/blogs.json', (err, data) => {
            if (err) throw err
            
            const todos = JSON.parse(data)


            const todo = {
                id: id(),
                description: formData.todo,
                done: false
            }

            todos.push(todo)

            fs.writeFile('./data/blogs.json', JSON.stringify(todos), (err) =>{
                if (err) throw err
                
                fs.readFile('./data/blogs.json', (err, data) =>{
                    if (err) throw err
                    
                    const todos =JSON.parse(data)
                    
                    res.render('home', {success: true, todos: todos})
                })
            })
        })
    }
})

app.get('/:id/delete', (req, res) =>{
    const id = req.params.id

    fs.readFile('./data/blogs.json', (err, data) =>{
        if (err) throw err
        
        const todos = JSON.parse(data)


        const filteredTodos = todos.filter(todo => todo.id !== id)


        fs.writeFile('./data/blogs.json', JSON.stringify(filteredTodos), (err) => {
            if (err) throw err

            res.render('home', {todos: filteredTodos, delete: true})
        })
    })
})

app.get('/:id/update', (req, res)=>{
    const id = req.params.id

    fs.readFile('./data/blogs.json', (err, data)=>{
    if (err) throw err
    const todos = JSON.parse(data)
    const todo = todos.filter(todo => todo.id == req.params.id)[0]
    const todoIdx = todos.indexOf(todo)
    const splicedTodo = todos.splice(todoIdx,1)[0]
    splicedTodo.done = true
    todos.push[splicedTodo]
    fs.writeFile('./data/blogs.json',JSON.stringify(todos),(err)=>{
        if (err) throw err
        res.render('home', {todos: todos})
    })
    })
    
})

app.listen(PORT, (err) => {
    if (err) throw err

    console.log(`This app is running on port ${PORT}`)
})

function id () {
    return '_' + Math.random(36).toString().substring(2,9);
}
