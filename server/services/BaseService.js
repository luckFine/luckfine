module.exports = class BaseService{
    constructor(){
        this.Model = null;
    }
    getModel(){
        if(!this.Model){
            console.log('Model is undefined');
            throw new Exception();
        }
        return this.Model;
    }
    findById(id){
        
    }
    async create(entity){
        const Model = this.getModel();
        const model = new Model(entity);
        const result = await model.save();
        return result;
    }
    async findAll(){
        const Model = this.getModel();
        const result = await Model.find().exec();
        return result;
    }
}