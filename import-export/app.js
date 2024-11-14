//require('dotenv').config();
import 'dotenv/config';
//const express = require("express");
import express from 'express';
import bodyParser from 'body-parser';
import read from 'node-readability';
import { Article } from  './db.js';
import ejs from 'ejs';

const app = express();
const articles = [{title : 'Example1'} , {title : 'Example2'} , {title : 'Example3'}];
//const Article = require('./db').Article;
//const read = require('node-readability');

const port = process.env.PORT || 3001
app.set('port' , process.env.PORT || 3001);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/css/bootstrap.css' , express.static('node-modules/bootstrap/dist/css/bootstrap.css'))

app.get('/' , (req,res) => {
    res.send("Hello word!");
})

//app.get('/articles' , (req,res,next) => {
//    res.send(articles);
//})

app.get('/articles' , (req,res,next) => {
    Article.all( (err, articles) => {
      if (err) return next(err)  
      //console.log(articles);
      
      res.format({
        html: () => {
         // console.log("RES is >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");  
         // console.log(res);  
          res.render('articles.ejs' , {articles : articles});    
        },
        json: () => {
          res.send(articles);  
        }
      })  
     // res.send(articles);
    })
})

//app.get('/articles/:id' , (req,res,next) => {
//    const id = req.params.id;
//    console.log("Fetching:" , id);
//    res.send(articles[id]);
//})

app.get('/articles/:id' , (req,res,next) => {
    const id = req.params.id;
    Article.find(id, (err, articles) => {
        if (err) return next(err)  
        res.send(articles);
    })
})
//app.delete('/articles/:id' , (req,res,next) => {
//    const id = req.params.id;
//    console.log("Deleting:" , id);
//    delete(articles[id]);
//    res.send( {message : 'Deleted'} );
//})

app.delete('/articles/:id' , (req,res,next) => {
    const id = req.params.id;
    Article.delete(id, (err, articles) => {
        if (err) return next(err)  
        res.send( {message : 'Deleted'} );
    })
})

//app.post('/articles' , (req,res,next) => {
//    const article = { title : req.body.title };
//    articles.push(article);
//    res.send(article);
//})

app.post('/articles' , (req,res,next) => {
    const url = req.body.url;
    console.log(url);
    read(url, (err, result) => {
      if (err || !result) res.status(500).send('Error downloading article');
      Article.create(
        {title : result.title , content : result.content},
        (err, articles) => {
            if (err) return next(err)  
            res.send('ok');
        }
      )
    })
})

app.listen(app.get('port') , () => {
    console.log(`Web app available at http://127.0.0.1:${app.get('port')}`)
})

//module.exports = app;
export default app