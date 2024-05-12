import { Request, Response } from 'express';
import Task, { ITask } from '../models/Task.js';
import { authRequest } from '../@types/auth';
import _ from 'lodash';


export const createTask = async (req: authRequest, res: Response) => {
    try {

        const userId = req.user._id;
        console.log(userId);


        const { title, description, completed } = req.body;
        if (!title) {
            return res.status(400).json({ message: 'Title is required' });
        }



        const newTask: ITask = await Task.create({ title, description, completed, user: userId });

        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create task' });
    }
};


export const getTasks = async (req: authRequest, res: Response) => {
    try {
        const page: number = req.query.page ? parseInt(req.query.page.toString(), 10) : 1;
        const limit: number = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 15;
        const completed: boolean | undefined = req.query.completed ? req.query.completed === 'true' : undefined;

        const skip: number = (page - 1) * limit;


        const query: any = { user: req.user._id };
        if (completed !== undefined) {
            query.completed = completed;
        }


        const tasks: ITask[] = await Task.find(query)
            .skip(skip)
            .limit(limit)
            .exec();


        const totalCount: number = await Task.countDocuments(query);

        const totalPages: number = Math.ceil(totalCount / limit);

        res.status(200).json({
            tasks,
            currentPage: page,
            totalPages,
            totalCount,
            limit
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch tasks' });
    }
};


export const getTaskById = async (req: authRequest, res: Response) => {
    const { taskId } = req.params;
    try {
        const task: ITask | null = await Task.findOne({ _id: taskId, user: req.user._id });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch task' });
    }
};


export const updateTask = async (req: authRequest, res: Response) => {
    const { taskId } = req.params;
    try {

        const { title, description, completed } = req.body;

        const updatedTask: ITask | null = await Task.findOneAndUpdate(
            { _id: taskId, user: req.user._id },
            { title, description, completed, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update task' });
    }
};


export const deleteTask = async (req: authRequest, res: Response) => {
    const { taskId } = req.params;
    try {
        const deletedTask: ITask | null = await Task.findOneAndDelete({ _id: taskId, user: req.user._id });
        if (!deletedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(deletedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to delete task' });
    }
};





const DEBOUNCE_DELAY = 300;

export const searchTasks = async (req: authRequest, res: Response) => {
    try {
        const searchQuery: string = req.query.q as string || '';
        const page: number = req.query.page ? parseInt(req.query.page.toString(), 10) : 1;
        const limit: number = req.query.limit ? parseInt(req.query.limit.toString(), 10) : 10;
        const completed: boolean | undefined = req.query.completed ? req.query.completed === 'true' : undefined;
        let query: any

        const debouncedSearch = _.debounce(async () => {

            const searchRegex = new RegExp(searchQuery, 'i');


            if (searchQuery) {
                query = {
                    user: req.user._id,
                    title: { $regex: searchRegex }
                }
            } else {
                query = {
                    user: req.user._id,
                }
            }



            if (completed !== undefined) {
                query.completed = completed;
            }


            const skip: number = (page - 1) * limit;
            const tasks: ITask[] = await Task.find(query)
                .skip(skip)
                .limit(limit);


            const totalCount: number = await Task.countDocuments(query);

            const totalPages: number = Math.ceil(totalCount / limit);

            res.status(200).json({
                tasks,
                currentPage: page,
                totalPages,
                totalCount,
                limit
            });
        }, DEBOUNCE_DELAY);

        debouncedSearch();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to search tasks' });
    }
};
