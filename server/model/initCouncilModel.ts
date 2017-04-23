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
            primaryKey: true
        },
        councilId: {
            type: ORM.INTEGER,
            primaryKey: true
        }
    });
}
// Finns typ 5 stycken till ett råd
export function initCouncilPositionsModel(sequelize: Sequelize) {
    return sequelize.define('CouncilPosition', {
        id: {
            type: ORM.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        year: {
            type: ORM.INTEGER,
        },
        councilId: {
            type: ORM.INTEGER,
        },
        phd: {
            type: ORM.BOOLEAN,
            defaultValue: false,
        },
        vacant: {
            type: ORM.BOOLEAN,
            defaultValue: true
        },
        name: {
            type: ORM.TEXT
        }
    });
}
