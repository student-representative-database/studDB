
import * as ORM from "sequelize";
import {Sequelize} from 'sequelize';

export function initFacultyModel(sequelize: Sequelize) {
    return sequelize.define('Faculty', {
        name: ORM.STRING,
    })
}
