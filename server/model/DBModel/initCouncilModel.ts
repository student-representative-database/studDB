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
        description: {
            type: ORM.STRING,
            allowNull: false
        },
        facultyId: {
            type: ORM.INTEGER,
            allowNull: false
        },
        studentPositions: {
            type: ORM.INTEGER,
            allowNull: false
        },
        phdPositions: {
            type: ORM.INTEGER,
            allowNull: false
        }
    });
}

export function initCouncilInstanceModel(sequelize: Sequelize) {
    return sequelize.define('CouncilInstance', {
        id: {
            type: ORM.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        from: {
            type: ORM.DATE,
            unique: 'compositeIndex',
            allowNull: false
        },
        till: {
            type: ORM.DATE,
            unique: 'compositeIndex',
            allowNull: false
        },
        councilId: {
            type: ORM.INTEGER,
            unique: 'compositeIndex',
            allowNull: false
        }
    });
}
