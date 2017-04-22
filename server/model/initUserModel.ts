import ORM = require("sequelize");
import {Sequelize} from 'sequelize';
import * as bcryptjs from 'bcryptjs';

export function initUserModel(sequelize: Sequelize) {
    let User = sequelize.define('User', {
            id: {
                type: ORM.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            firstName: {
                type: ORM.STRING,
                field: 'first_name',
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [1,20]
                }
            },
            lastName: {
                type: ORM.STRING,
                field: 'last_name',
                allowNull: false,
                validate: {
                    notEmpty: true,
                    len: [1,20]
                }
            },
            email: {
                type: ORM.STRING,
                allowNull: false
            },
            password: {
                type: ORM.STRING,
                allowNull: false
            }
        }, {
            //Uncomment this Andras
            hooks: {
                 afterValidate: function(user){
                     user.password = bcryptjs.hashSync(user.password, 8)
                 }
            }


            // ,
            // freezeTableName: true,
            // instanceMethods: {
            //     generateHash: function (password) {
            //         bcryptjs.hashSync(password, 8);
            //
            //     },
            //     validPassword: function (password) {
            //         return bcryptjs.compareSync(password, this.password);
            //     },
            // }
        });

    return User;
}
