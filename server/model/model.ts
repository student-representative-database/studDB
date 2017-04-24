import * as ORM from 'sequelize';
import { LoggingOptions, Sequelize } from 'sequelize';
import { initCouncilModel, initCouncilInstanceModel, initCouncilPositionsModel } from './initCouncilModel';
import { initFacultyModel } from './initFacultyModel';
import { initUserModel } from './initUserModel';
import { initEmployeeModel } from './initEmployeeModel';

const dbUrl = 'postgres://postgres:postgres@postgres:5432/studDB';

const options: LoggingOptions = { benchmark: true, logging: console.log };

const sequelize: Sequelize = new ORM(dbUrl, options);

export const FacultyModel = initFacultyModel(sequelize);
export const CouncilModel = initCouncilModel(sequelize);
export const UserModel = initUserModel(sequelize);
export const EmployeeModel = initEmployeeModel(sequelize);
export const CouncilInstanceModel = initCouncilInstanceModel(sequelize);
export const CouncilPositionsModel = initCouncilPositionsModel(sequelize);

FacultyModel.hasMany(CouncilModel, { foreignKey: 'facultyId' });
CouncilModel.belongsTo(FacultyModel, { foreignKey: 'facultyId' });

CouncilModel.hasMany(CouncilInstanceModel, { foreignKey: 'councilId'  });
CouncilInstanceModel.belongsTo(CouncilModel, { foreignKey: 'councilId' });

CouncilInstanceModel.hasMany(CouncilPositionsModel, { foreignKey: 'councilInstanceId' });
CouncilPositionsModel.belongsTo(CouncilInstanceModel, { foreignKey: 'councilInstanceId' });

UserModel.hasMany(CouncilPositionsModel, { as: 'councils' });
//CouncilPositionsModel.hasOne(UserModel);

// CouncilModel.belongsToMany(CouncilPositionsModel, { through: CouncilInstanceModel });
// CouncilPositionsModel.belongsToMany(CouncilModel, { through: CouncilInstanceModel });

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
    return CouncilInstanceModel.findAll({
        include: [
            {
                model: CouncilPositionsModel
            }
        ]
    })
});
// .then((res) => console.log(res[0].dataValues.CouncilPositions));
// .then((res) => console.log(res));
