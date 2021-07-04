// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Painter from 'App/Models/Painter'

export default class PaintersController {
    public async getAll() {
        const painters = await Painter.all();
        return painters;
    }

    public async getPaintingIds(ctx) {
        let painter = await Painter.findBy('address', ctx.params.address);
        painter = painter.toJSON()
        return painter ? painter.painting_id.split(',').map((val) => parseInt(val)) : [];
    }

    public async registerPainting(ctx) {
        const data = ctx.request.all()
        // const data = {
        //     address: "0x2",
        //     painting_id: "100"
        // }
        try {
            let res;
            try {
                let painter = await Painter.findBy('address', data.address);
                painter = painter.toJSON();
                let tp = painter.painting_id.split(',')
                tp = tp.map((value) => parseInt(value))
                if (tp.indexOf(parseInt(data.painting_id)) === -1)
                    await Painter.query().where('address', data.address).update({ painting_id: painter.painting_id + ',' + data.painting_id })
                res = painter;
            }
            catch (err) {
                const painter = new Painter()
                res = await painter.fill(data).save()
            }
            return { msg: "Painter saved in blockchain !", id: res.id }
        }
        catch (err) {
            return err;
        }
    }
}
