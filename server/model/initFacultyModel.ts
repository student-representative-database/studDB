
import * as ORM from 'sequelize';
import {Sequelize} from 'sequelize';

export function initFacultyModel(sequelize: Sequelize) {
    return sequelize.define('Faculty', {
        id: {
            type: ORM.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: ORM.STRING,
            unique: true,
            allowNull: false
        }
    })
}
