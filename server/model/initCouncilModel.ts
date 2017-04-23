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
        year: {
            type: ORM.INTEGER,
            primaryKey: true,
        },
        councilId: {
            type: ORM.INTEGER,
            allowNull: false
        },
    });
}

export function initCouncilPositionsModel(sequelize: Sequelize) {
    return sequelize.define('CouncilPosition', {
        year: {
            type: ORM.INTEGER,
            primaryKey: true,
        },
        councilId: {
            type: ORM.INTEGER,
            primaryKey: true,
        },
        phd: {
            type: ORM.BOOLEAN,
            allowNull: false,
        },
        vacant: {
            type: ORM.BOOLEAN,
            defaultValue: true,
            allowNull: false,
        }
    });
}
