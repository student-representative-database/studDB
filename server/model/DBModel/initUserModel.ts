import ORM = require('sequelize');
import { Sequelize } from 'sequelize';
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
    birthDate: {
      type: ORM.DATE,
      allowNull: false
    },
    phd: {
      type: ORM.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    facultyId: {
      type: ORM.INTEGER,
      allowNull: true
    },
    graduationYear: {
      type: ORM.DATE,
      allowNull: false
    },
    program: {
      type: ORM.STRING,
      allowNull: false
    },
    comments: {
      type: ORM.TEXT,
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

export function initUserPositionModel(sequelize: Sequelize) {
  return sequelize.define('UserPosition', {
        UserId: {
            type: ORM.INTEGER,
            primaryKey: true
        },
        CouncilInstanceId: {
            type: ORM.INTEGER,
            primaryKey: true
        },
        from: {
            type: ORM.DATE,
            allowNull: false
        },
        till: {
            type: ORM.DATE,
            allowNull: false
        },
        elected: {
            type: ORM.BOOLEAN,
            defaultValue: false
        }
  });
}
