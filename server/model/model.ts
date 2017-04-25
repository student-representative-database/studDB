import * as ORM from 'sequelize';
import { LoggingOptions, Sequelize } from 'sequelize';
import { initCouncilModel, initCouncilInstanceModel, initCouncilPositionsModel } from './initCouncilModel';
import { initFacultyModel } from './initFacultyModel';
import { initUserModel, initUserPositionModel } from './initUserModel';
import { initEmployeeModel, initEmployeePositionModel } from './initEmployeeModel';

const dbUrl = 'postgres://postgres:postgres@postgres:5432/studDB';

const options: LoggingOptions = { benchmark: true, logging: console.log };

const sequelize: Sequelize = new ORM(dbUrl, options);

export const FacultyModel = initFacultyModel(sequelize);
export const CouncilModel = initCouncilModel(sequelize);
export const UserModel = initUserModel(sequelize);
export const UserPositionModel = initUserPositionModel(sequelize);
export const EmployeeModel = initEmployeeModel(sequelize);
export const EmployeePositionModel = initEmployeePositionModel(sequelize);
export const CouncilInstanceModel = initCouncilInstanceModel(sequelize);
export const CouncilPositionsModel = initCouncilPositionsModel(sequelize);

FacultyModel.hasMany(CouncilModel, { foreignKey: 'facultyId' });
CouncilModel.belongsTo(FacultyModel, { foreignKey: 'facultyId' });

CouncilModel.hasMany(CouncilInstanceModel, { foreignKey: 'councilId' });
CouncilInstanceModel.belongsTo(CouncilModel, { foreignKey: 'councilId' });

//CouncilModel.hasMany(EmployeeModel, { foreignKey: 'councilId' });
//EmployeeModel.belongsTo(EmployeeModel, { foreignKey: 'councilId' });

CouncilModel.hasOne(EmployeePositionModel)
EmployeePositionModel.belongsTo(CouncilModel)

EmployeePositionModel.hasOne(EmployeeModel)
EmployeeModel.belongsTo(EmployeePositionModel)

CouncilInstanceModel.hasMany(CouncilPositionsModel, { foreignKey: 'councilInstanceId' });
CouncilPositionsModel.belongsTo(CouncilInstanceModel, { foreignKey: 'councilInstanceId' });

CouncilPositionsModel.hasOne(UserPositionModel)
UserPositionModel.belongsTo(CouncilPositionsModel)

//UserPositionModel.hasOne(UserModel)
//UserModel.belongsTo(UserPositionModel)

UserModel.hasOne(UserPositionModel)
UserPositionModel.belongsTo(UserModel)

// COMMENT OUT IF YOU DON'T WANT THE DB TO BE OVERWRITTEN AT EVERY RESTART, IF WORKING WITH THE DB MODELS THIS CODE
// SHOULD PROBABLY BE ACTIVE
// Sequelize forces overwrite of current models in DB in they are changed in code and all rows are removed.
sequelize.sync({
    force: true
}).then(() => {
    return FacultyModel.create({
        name: 'Fakulteten för datavetenskap'
    })
}).then(() => {
    return FacultyModel.create({
        name: 'Fakulteten för ngntingannat'
    })
}).then(() => {
    return CouncilModel.create({
        name: 'Rådet för datornördar',
        description: 'Nerds R US, vi som capsar och dricker jolt cola',
        facultyId: 1,
        studentPositions: 2,
        phdPositions: 2
    })
})
    .then(() => {
        return CouncilModel.create({
            name: 'Rådet för snickare',
            description: 'Hammare och spik!!!',
            facultyId: 2,
            studentPositions: 2,
            phdPositions: 2
        })
    })
    .then(() => {
        return CouncilInstanceModel.create({
            year: 2017,
            councilId: 1
        })
    })
    .then(() => {
        return CouncilInstanceModel.create({
            year: 2018,
            councilId: 2
        })
    })
    .then(() => {
        return CouncilInstanceModel.create({
            year: 2017,
            councilId: 2
        })
    })
    .then(() => {
        return CouncilPositionsModel.create({
            year: 2017,
            councilId: 1,
            councilInstanceId: 1
        })
    })
    .then(() => {
        return CouncilPositionsModel.create({
            year: 2017,
            councilId: 1,
            councilInstanceId: 1
        })
    })
    .then(() => {
        return CouncilPositionsModel.create({
            year: 2017,
            councilId: 1,
            councilInstanceId: 1
        })
    })
    .then(() => {
        return UserModel.create({
            firstName: 'Fredrik',
            lastName: 'Olsson',
            phone: '0123456-123',
            email: 'fredriko.olsson@gmail.com',
            faculty: 'data...',
            position: 'hkjhk',
            profileUrl: 'kllökök',
            password: 'dingDong',
            graduationYear: 2018,
        })
    })
    .then(() => {
        return UserModel.create({
            firstName: 'Andras',
            lastName: 'Balla',
            phone: '0123456-123',
            email: 'andrasBalla@gmail.com',
            faculty: 'data...',
            position: 'hkjhk',
            profileUrl: 'kllökök',
            password: 'hello',
            phd: true,
            graduationYear: 2018,
        })
    })
    .then(() => {
        return UserModel.create({
            firstName: 'Pär',
            lastName: 'Popniten',
            phone: '0123456-123',
            email: 'pär@gmail.com',
            faculty: 'data...',
            position: 'hkjhk',
            profileUrl: 'kllökök',
            password: 'password',
            graduationYear: 2018,
        })
    })
    .then(() => {
        return UserModel.create({
            firstName: 'Olga',
            lastName: 'Oc',
            phone: '0123456-123',
            email: 'oc@gmail.com',
            faculty: 'data...',
            position: 'hkjhk',
            profileUrl: 'kllökök',
            password: 'password',
            graduationYear: 2018,
        })
    })
    .then(() => {
        return UserPositionModel.create({
            CouncilPositionId: 1,
            UserId: 1
        })
    })
    .then(() => {
        return UserPositionModel.create({
            CouncilPositionId: 1,
            UserId: 2
        })
    })
    /*.then(() => {
        return CouncilInstanceModel.findAll({
            include: [
                {
                    model: CouncilPositionsModel,
                    include: [{
                        model: UserPositionModel,
                        include: [{
                            model: UserModel
                        }]
                    }]
                }
            ]
        })
    })*/
    .then(() => {
        return CouncilModel.findById(1, {
            include: [{
                    model: CouncilInstanceModel
                }]
        })
    })
 .then((res) => console.log(res.dataValues.CouncilInstances));
// .then((res) => console.log(res));
