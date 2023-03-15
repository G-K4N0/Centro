import express from 'express';
import {createTopic, deleteTopic, getAllTopics, getTopic, updateTopic} from '../controllers/Materia.js';

const topicRoutes = express.Router();

topicRoutes.get('/',getAllTopics);
topicRoutes.get('/:id',getTopic);
topicRoutes.post('/',createTopic);
topicRoutes.put('/:id',updateTopic);
topicRoutes.delete('/:id',deleteTopic);

export default topicRoutes;