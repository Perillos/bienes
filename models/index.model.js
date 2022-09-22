import Own from './own.model.js'
import Price from './price.model.js'
import Category from './category.model.js'
import User from './user.model.js'


// Price.hasOne(Own)
// Own.belongsTo(Price, { foreignKey: 'precioId'}) // foreignKey, puedes llamarle al campo como desees.
Own.belongsTo(Price) // O puedes dejar que el nombre lo decida squalice
Own.belongsTo(Category)
User.hasMany(Own)



export {
    Own,
    Price,
    Category,
    User
}