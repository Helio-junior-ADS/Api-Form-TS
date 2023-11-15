import Express from 'express';
import UserControllers from '../controllers/UserControllers'
import PostControllers from '../controllers/PostControllers';

const app = Express();

app.use(Express.json());

app.post('/createUser', UserControllers.createUser);
app.post('/createPost', PostControllers.createPost);
app.get('/listPost/:id', PostControllers.listPost);
app.put('/updatePost', PostControllers.updatePost);
app.delete('/deletePost/:id', PostControllers.deletePost);


export default app;

