// import { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Painting from 'App/Models/Painting';

export default class BiddingsController {
    public async getAll(ctx) {
        const bids = await Painting.all();
        return bids;
    }

    public async getPaintings(ctx) {
        let bids = await Painting.query().where('bidder', ctx.params.address)
        return bids ? bids : [];
    }

    public async postBid(ctx) {
        try {
            const data = ctx.request.all()
            let painting = await Painting.findBy('id', parseInt(data.painting_id));
            if (painting.is_bid_closed === "true") {
                return { msg: "This bid is closed !" }
            }
            let temp = await Painting.query().where('id', parseInt(data.painting_id)).update({ bidder: data.address, heighest_bid: String(data.heighest_bid) })
            return { msg: "Bid updated" }
        }
        catch (err) {
            return err;
        }
    }

    public async closeBid(ctx) {
        try {
            const data = ctx.request.all()
            let painting = await Painting.findBy('id', parseInt(data.painting_id));
            if (painting.is_bid_closed === "true") {
                return { msg: "Bid is already closed" }
            }
            await Painting.query().where('id', parseInt(data.painting_id)).update({ is_bid_closed: "true" })
            return { msg: `Bid closed successfully \nWinner: ${painting.bidder} \nHeighest Bid: ${painting.heighest_bid} ` }
        }
        catch (err) {
            return err;
        }
    }
}
