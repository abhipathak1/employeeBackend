const express = require('express')
const {EmployeModel} = require('../Models/Employee.Model')
const { model } = require('mongoose')
const empRoute = express.Router()

empRoute.post('/', async(req, res)=>{
    try{
        const emp = new EmployeModel(req.body)
        await emp.save()
        res.status(200).json({msg:'Employee added!'})
    }catch(err){
        res.status(500).json({error:'Employee Not added'})
    }
})

empRoute.get('/', async (req, res) => {
    try {
        const { department, sortBy } = req.query;
        const query = {}; 

        if (department) {
            query.department = department;
        }

        const sortOption = {};

        if (sortBy === 'asc') {
            sortOption.salary = 1;
        } else if (sortBy === 'desc') {
            sortOption.salary = -1;
        }

        const employees = await EmployeModel.find(query).sort(sortOption);

        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

empRoute.patch('/:id', async(req, res)=>{
const {id} = req.params
try{
    await EmployeModel.findByIdAndUpdate(id, req.body)
    res.status(200).json('data updated')
}catch(err){
    res.status(500).json(err)
}
})

empRoute.delete('/:id', async(req, res)=>{
    const {id} = req.params
    try{
        await EmployeModel.findByIdAndDelete(id)
        res.status(200).json('data deleted!')
    }catch(err){
        res.status(500).json(err)
    }
    })


module.exports = {empRoute}