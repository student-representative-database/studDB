import * as ORM from 'sequelize';
import { LoggingOptions, Sequelize } from 'sequelize';
// tslint:disable-next-line:max-line-length
import { initCouncilModel, initCouncilInstanceModel } from './DBModel/initCouncilModel';
import { initFacultyModel } from './DBModel/initFacultyModel';
import { initUserModel, initUserPositionModel } from './DBModel/initUserModel';
import { initEmployeeModel, initEmployeePositionModel } from './DBModel/initEmployeeModel';

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

// Faculty -> Council, Faculty -> User; Faculty -> Employee
FacultyModel.hasMany(CouncilModel, { foreignKey: 'facultyId' });
CouncilModel.belongsTo(FacultyModel, { foreignKey: 'facultyId' });

FacultyModel.hasMany(UserModel);
UserModel.belongsTo(FacultyModel);

FacultyModel.hasMany(EmployeeModel);
EmployeeModel.belongsTo(FacultyModel);

// Council -> CouncilInstance -> UserPosition -> User
CouncilModel.hasMany(CouncilInstanceModel, { foreignKey: 'councilId' });
CouncilInstanceModel.belongsTo(CouncilModel, { foreignKey: 'councilId' });

CouncilInstanceModel.belongsToMany(UserModel, {through: UserPositionModel});
UserModel.belongsToMany(CouncilInstanceModel, {through: UserPositionModel});

/* CouncilInstanceModel.hasMany(UserPositionModel);
UserPositionModel.belongsTo(CouncilInstanceModel);

UserModel.hasMany(UserPositionModel);
UserPositionModel.belongsTo(UserModel);*/

// Council -> EmployeePosition -> Employee
CouncilModel.belongsToMany(EmployeeModel, {through: EmployeePositionModel});
EmployeeModel.belongsToMany(CouncilModel, {through: EmployeePositionModel});

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
}).then(() => {
    return CouncilModel.create({
        name: 'Rådet för snickare',
        description: 'Hammare och spik!!!',
        facultyId: 2,
        studentPositions: 2,
        phdPositions: 2
    })
}).then(() => {
    return CouncilInstanceModel.create({
        from: new Date('January 1, 2017'),
        till: new Date('May 30, 2017'),
        councilId: 1
    })
}).then(() => {
    return CouncilInstanceModel.create({
        from: new Date('January 1, 2017'),
        till: new Date('May 30, 2017'),
        councilId: 2
    })
}).then(() => {
    return CouncilInstanceModel.create({
        from: new Date('February 1, 2017'),
        till: new Date('May 20, 2017'),
        councilId: 2
    })
}).then(() => {
    return UserModel.create({
        firstName: 'Fredrik',
        lastName: 'Olsson',
        phone: '0123456-123',
        email: 'fredriko.olsson@gmail.com',
        facultyId: 1,
        password: 'dingDong',
        graduationYear: 2018,
        birthDate: new Date('October 10, 1980'),
        program: 'UDM',
        comments: 'bla'
    })
}).then(() => {
    return UserModel.create({
        firstName: 'Andras',
        lastName: 'Balla',
        phone: '0123456-123',
        email: 'andrasBalla@gmail.com',
        facultyId: 2,
        password: 'hello',
        phd: true,
        graduationYear: 2018,
        birthDate: new Date('October 10, 1980'),
        program: 'some course',
        comments: 'bla'
    })
}).then(() => {
    return UserModel.create({
        firstName: 'Pär',
        lastName: 'Popniten',
        phone: '0123456-123',
        email: 'pär@gmail.com',
        facultyId: 1,
        password: 'password',
        graduationYear: 2018,
        birthDate: new Date('October 10, 1980'),
        program: 'UDM',
        comments: 'bla'
    })
}).then(() => {
    return UserModel.create({
        firstName: 'Olga',
        lastName: 'Oc',
        phone: '0123456-123',
        email: 'oc@gmail.com',
        facultyId: 2,
        password: 'password',
        graduationYear: 2018,
        birthDate: new Date('October 10, 1980'),
        program: 'hallo',
        comments: 'bla'
    })
}).then(() => {
    return EmployeeModel.create({
        firstName: 'Olga',
        lastName: 'Oc',
        phone: '0123456-123',
        email: 'oc@gmail.com',
        facultyId: 1,
        profileUrl: "kllökök",
        password: 'password',
    })
}).then(() => {
    return EmployeeModel.create({
        firstName: 'Olga',
        lastName: 'Oc',
        phone: '0123456-123',
        email: 'oc@gmail.com',
        facultyId: 1,
        profileUrl: "kllökök",
        password: 'password',

    })
}).then(() => {
    return EmployeePositionModel.create({
        CouncilId: 1,
        EmployeeId: 1,
        secretary: false,
        chairman: true,
        convener: false,
    })
}).then(() => {
    return EmployeePositionModel.create({
        CouncilId: 1,
        EmployeeId: 2,
        secretary: false,
        chairman: true,
        convener: false,
    })
}).then(() => {
    return UserPositionModel.create({
        CouncilInstanceId: 1,
        UserId: 1,
        from: new Date('October 13, 2018'),
        till: new Date('October 13, 2020')
    })
}).then(() => {
    return UserPositionModel.create({
        CouncilInstanceId: 2,
        UserId: 2,
        from: new Date('January 13, 2020'),
        till: new Date('October 13, 2020')
    })
})/*.then(() => {
    return CouncilInstanceModel.findAll(

         {
        include: [
            {
                model: UserModel
            }
        ]
         }

    )
}).then((res) => {
    const blabla = res[0].get({plain: true});
    console.log(JSON.stringify(res))
})*/
/*.then(() => {
    const facultyId = 1;
    return CouncilModel.findById(1,
        {
            include: [
                {
                    model: EmployeeModel,
                }
                {
                    model: CouncilInstanceModel,
                    include: [
                        {
                            model: UserModel
                        }
                }
            ]
        }
    )
}).then((res) => {
    const blabla = res; // [].get({plain: true});
    console.log(JSON.stringify(blabla, null, 2));
})*/
