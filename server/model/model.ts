
import * as ORM from "sequelize";
import {LoggingOptions, Sequelize} from 'sequelize';
import {initCouncilModel} from "./initCouncilModel";
import {initFacultyModel} from "./initFacultyModel";
import {initUserModel} from "./initUserModel";

const dbUrl = 'postgres://postgres:postgres@postgres:5432/studDB';

const options: LoggingOptions = {benchmark: true, logging: console.log};

const sequelize: Sequelize = new ORM(dbUrl, options);

export const FacultyModel =  initFacultyModel(sequelize);
export const CouncilModel =  initCouncilModel(sequelize);
export const UserModel    =  initUserModel(sequelize);

FacultyModel.hasMany(CouncilModel, {foreignKey: 'facultyId'});
CouncilModel.belongsTo(FacultyModel, {foreignKey: 'facultyId'});

// COMMENT OUT IF YOU DON'T WANT THE DB TO BE OVERWRITTEN AT EVERY RESTART, IF WORKING WITH THE DB MODELS THIS CODE
// SHOULD PROBABLY BE ACTIVE
// Sequelize forces overwrite of current models in DB in they are changed in code and all rows are removed.
sequelize.sync({
    force:true
});