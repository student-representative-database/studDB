import * as ORM from 'sequelize';
import {LoggingOptions, Sequelize} from 'sequelize';
import { initCouncilModel, initCouncilInstanceModel } from './DBModel/initCouncilModel';
import { initFacultyModel } from './DBModel/initFacultyModel';
import { initUserModel, initUserPositionModel } from './DBModel/initUserModel';
import { initEmployeeModel, initEmployeePositionModel } from './DBModel/initEmployeeModel';
import {seed} from './dbSeed/seed'

const dbUrl = 'postgres://postgres:postgres@postgres:5432/studDB';

const options: LoggingOptions = {benchmark: true, logging: console.log};

const sequelize: Sequelize = new ORM(dbUrl, options);

export const FacultyModel = initFacultyModel(sequelize);
export const CouncilModel = initCouncilModel(sequelize);
export const UserModel = initUserModel(sequelize);
export const UserPositionModel = initUserPositionModel(sequelize);
export const EmployeeModel = initEmployeeModel(sequelize);
export const EmployeePositionModel = initEmployeePositionModel(sequelize);
export const CouncilInstanceModel = initCouncilInstanceModel(sequelize);

// Faculty -> Council, Faculty -> User; Faculty -> Employee
FacultyModel.hasMany(CouncilModel, {foreignKey: 'facultyId'});
CouncilModel.belongsTo(FacultyModel, {foreignKey: 'facultyId'});

FacultyModel.hasMany(UserModel);
UserModel.belongsTo(FacultyModel);

FacultyModel.hasMany(EmployeeModel);
EmployeeModel.belongsTo(FacultyModel);

// Council -> CouncilInstance -> UserPosition -> User
CouncilModel.hasMany(CouncilInstanceModel, {foreignKey: 'councilId'});
CouncilInstanceModel.belongsTo(CouncilModel, {foreignKey: 'councilId'});

CouncilInstanceModel.belongsToMany(UserModel, {through: UserPositionModel});
UserModel.belongsToMany(CouncilInstanceModel, {through: UserPositionModel});

// Council -> EmployeePosition -> Employee
CouncilModel.belongsToMany(EmployeeModel, {through: EmployeePositionModel});
EmployeeModel.belongsToMany(CouncilModel, {through: EmployeePositionModel});

// COMMENT OUT IF YOU DON'T WANT THE DB TO BE OVERWRITTEN AT EVERY RESTART, IF WORKING WITH THE DB MODELS THIS CODE
// SHOULD PROBABLY BE ACTIVE
// Sequelize forces overwrite of current models in DB in they are changed in code and all rows are removed.
seed();

export {sequelize};
