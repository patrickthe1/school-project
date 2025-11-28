const express = require('express');
const cors = require('cors');
const db = require('./connection.js');
const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/api/films',(req,res) => {
    const sql = 'SELECT * FROM films';
    db.query(sql,(err,results)=>{
        if(err){
            res.status(500).json({error: 'Database query error'});
        } else{
            res.json(results);
        }
    });
});

app.get('/api/films/:id',(req,res)=>{
    const filmId = req.params.id;
    const sql = 'SELECT * FROM films WHERE film_id = ?';
    db.query(sql,[filmId],(err,results)=>{
        if(err){
            console.error('Database query error:', err);
            res.status(500).json({error: 'Database query error', details: err.message});
        } else if(results.length === 0){
            res.status(404).json({error: 'Film not found'});
        } else{
            res.json(results[0]);
        }
    });
});
app.post('/api/films',(req,res)=>{
    const {title,category,director,duration,recording_date,status} = req.body;
    if (!title || !category || !director || !duration || !recording_date || !status) {
        return res.status(400).json({ error: 'Missing required fields: title, category, director, duration, recording_date, status' });
    }
    const sql = 'INSERT INTO films (`title`, `category`, `director`, `duration`, `recording_date`, `status`) VALUES (?,?,?,?,?,?)';
    db.query(sql,[title,category,director,duration,recording_date,status],(err,result)=>{
        if(err){
            console.error('Database insertion error:', err); 
            return res.status(500).json({error: 'Database insertion error', details: err});
        } else{
            const filmId = result && result.insertId ? result.insertId : null;
            return res.status(201).json({message: 'Film added successfully', filmId});
        }
    });
});
app.put('/api/films/:id',(req,res)=>{
    const filmId = req.params.id;
    const {title,category,director,duration,recording_date,status} = req.body;
    const sql = 'UPDATE films SET title = ?, category = ?, director = ?, duration = ?, recording_date = ?, status = ? WHERE film_id = ?';
    db.query(sql,[title,category,director,duration,recording_date,status,filmId],(err,result)=>{
        if(err){
            console.error('Database update error:', err);
            res.status(500).json({error: 'Database update error', details: err.message});
        } else{
            res.json({message: 'Film updated successfully'});
        }
    });
});

app.delete('/api/films/:id',(req,res)=>{
    const filmId = req.params.id;
    const sql = 'DELETE FROM films WHERE film_id = ?';
    db.query(sql,[filmId],(err,result)=>{
        if(err){
            console.error('Database deletion error:', err);
            res.status(500).json({error: 'Database deletion error', details: err.message});
        } else{
            res.json({message: 'Film deleted successfully'});
        }
    });
});


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});






