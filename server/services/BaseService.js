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
    async update(entity){
        const Model = this.getModel();
        try{
            if(entity._id){
                const result = await Model.findByIdAndUpdate(entity._id, entity, {new:true}).exec();
                return result;
            }else{
                console.log('update failed:no id found');
                throw new Exception();
            }
        }catch(e){
            throw new Exception(e);
        }
        
    }
    async save(entity){
        let result;
        if(entity._id){
            result = await this.update(entity);
        }else{
            result = await this.create(entity)
        }
        return result;
    }
}