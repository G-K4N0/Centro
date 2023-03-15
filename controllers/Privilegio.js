import Privilegio from '../models/Privilegio.js'

export const getAllPrivileges = async (req,res) => {
    try {
        const privilegios = await Privilegio.findAll();
        res.json(privilegios);
    } catch (error) {
        res.json({message:error.message});
    }
}
