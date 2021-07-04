/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Painting from 'App/Models/Painting'

Route.get('/', async () => {
  return { hello: 'world' }
})

Route
  .group(() => {
    Route.get('get-all', 'PaintingsController.getAll')
    Route.get('get-by/:id', 'PaintingsController.getById')
    Route.post('create-new', 'PaintingsController.createNew')
  })
  .prefix('api/painting/')

Route 
.group(()=>{  
  Route.get('get-all', 'PaintersController.getAll')
  Route.get('get-by/:address', 'PaintersController.getPaintingIds')
  Route.post('create-new', 'PaintersController.registerPainting')
})
.prefix('api/painter/')

Route 
.group(()=>{  
  Route.get('get-all', 'BiddingsController.getAll')
  Route.get('get-by/:address', 'BiddingsController.getPaintings')
  Route.post('post-bid', 'BiddingsController.postBid')
  Route.post('close-bid', 'BiddingsController.closeBid')
})
.prefix('api/bidding/')

