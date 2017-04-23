import ORM = require('sequelize');
import {Sequelize} from 'sequelize';
import * as bcryptjs from 'bcryptjs';
// const bcryptjs = require('bcryptjs');

export function initUserModel(sequelize: Sequelize) {
  const User = sequelize.define('User', {
    id: {
      type: ORM.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    firstName: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    },
    lastName: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20]
      }
    },
    phd: {
      type: ORM.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    phone: {
      type: ORM.STRING,
      allowNull: false
    },
    email: {
      type: ORM.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    faculty: {
      type: ORM.STRING,
      allowNull: false
    },
    graduationYear: {
      type: ORM.DATE,
      allowNull: false
    },
    password: {
      type: ORM.STRING,
      allowNull: false
    }
  }
    , {
      hooks: {
        beforeCreate: (user: any) => {
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
