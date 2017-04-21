
import * as ORM from "sequelize";
import {LoggingOptions, Sequelize} from 'sequelize';
import {initCouncilModel} from "./initCouncilModel";
import {initFacultyModel} from "./initFacultyModel";

const dbUrl = 'postgres://postgres:postgres@postgres:5432/studDB';

const options: LoggingOptions = {benchmark: true, logging: console.log};

const sequelize: Sequelize = new ORM(dbUrl, options);

export const FacultyModel =  initFacultyModel(sequelize);

export const CouncilModel =  initCouncilModel(sequelize);

FacultyModel.hasMany(CouncilModel, {foreignKey: 'facultyId'});
CouncilModel.belongsTo(FacultyModel, {foreignKey: 'facultyId'});

sequelize.sync();