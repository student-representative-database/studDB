import ORM = require('sequelize');
import {Sequelize} from 'sequelize';

export function initCouncilModel(sequelize: Sequelize) {
    return sequelize.define('Council', {
        id: {
            type: ORM.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: ORM.STRING,
            allowNull: false
        },
        facultyId: {
            type: ORM.INTEGER,
            allowNull: false
        }
    });
}
