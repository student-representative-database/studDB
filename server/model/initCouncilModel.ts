import ORM = require("sequelize");
import {Sequelize} from 'sequelize';

export function initCouncilModel(sequelize: Sequelize) {
    return sequelize.define('Council', {
        name: ORM.STRING,
        facultyId: ORM.INTEGER,
    });
}
