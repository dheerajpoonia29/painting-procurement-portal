// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Painting from 'App/Models/Painting'

export default class PaintingsController {
    public async getAll() {
        const paintings = await Painting.all()
        return paintings;
    }

    public async getById(ctx) {
        const painting = await Painting.find(ctx.params.id)
        return painting;
    }

    public async createNew(ctx) {
        const data = ctx.request.all()
        console.log("params data = ", data)
        try{
            const painting = new Painting()
            let res = await painting.fill(data).save()
            return {msg:"New painting created successfully !", id: res.id}
        }
        catch(err){
            return err;
        }
        
    }
}
