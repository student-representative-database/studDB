import {
    CouncilInstanceModel, CouncilModel, EmployeeModel, EmployeePositionModel, FacultyModel, sequelize, UserModel,
    UserPositionModel
} from '../model';

export function seed() {
    sequelize.sync({
        force: true
    }).then(() => {
        return FacultyModel.create({
            name: 'Universitetsövergripande organ'
        })
    }).then(() => {
        return FacultyModel.create({
            name: 'Fakulteten för Eknomihögskolan'
        })
    }).then(() => {
        return FacultyModel.create({
            name: 'Fakulteten för Hälsa & Livsvetenskap'
        })
    }).then(() => {
        return FacultyModel.create({
            name: 'Fakulteten för Konst & Humaniora'
        })
    }).then(() => {
        return FacultyModel.create({
            name: 'Fakulteten för Samhällsvetenskap'
        })
    }).then(() => {
        return FacultyModel.create({
            name: 'Fakulteten för Teknik'
        })
    }).then(() => {
        return FacultyModel.create({
            name: 'Nämnden för Lärarutbildningen'
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Fakultetsstyrelsen',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 6,
            studentPositions: 2,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Dekans beslutsmöte',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 6,
            studentPositions: 3,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Utbildningsråd',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 6,
            studentPositions: 2,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Forskarutbildningsrådet',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 6,
            studentPositions: 2,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Anställningsnämnd',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 6,
            studentPositions: 3,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Internationaliseringsgrupp',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 6,
            studentPositions: 2,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Studerandeskyddsombud för Sjöfartshögskolan',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 6,
            studentPositions: 3,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Kursplanerådet för Sjökaptensprogrammet',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 6,
            studentPositions: 2,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Fakultetsämnden',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 7,
            studentPositions: 2,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Dekans beslutsmöte',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 7,
            studentPositions: 3,
            phdPositions: 2
        })
    }).then(() => {
        return CouncilModel.create({
            name: 'Beredningsrådet för forskarnivå',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
            facultyId: 7,
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
            from: new Date('January 1, 2016'),
            till: new Date('May 30, 2016'),
            councilId: 1
        })
    }).then(() => {
        return CouncilInstanceModel.create({
            from: new Date('August 1, 2016'),
            till: new Date('December 30, 2016'),
            councilId: 1
        })
    }).then(() => {
        return CouncilInstanceModel.create({
            from: new Date('August 1, 2017'),
            till: new Date('December 30, 2017'),
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
            from: new Date('January 1, 2017'),
            till: new Date('May 30, 2017'),
            councilId: 3
        })
    }).then(() => {
        return CouncilInstanceModel.create({
            from: new Date('January 1, 2017'),
            till: new Date('May 30, 2017'),
            councilId: 4
        })
    }).then(() => {
        return CouncilInstanceModel.create({
            from: new Date('January 1, 2017'),
            till: new Date('May 30, 2017'),
            councilId: 5
        })
    }).then(() => {
        return CouncilInstanceModel.create({
            from: new Date('January 1, 2017'),
            till: new Date('May 30, 2017'),
            councilId: 6
        })
    }).then(() => {
        return CouncilInstanceModel.create({
            from: new Date('January 1, 2017'),
            till: new Date('May 30, 2017'),
            councilId: 7
        })
    }).then(() => {
        return CouncilInstanceModel.create({
            from: new Date('January 1, 2017'),
            till: new Date('May 30, 2017'),
            councilId: 8
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Ryan',
            lastName: 'Nilsson',
            phone: '0123456-123',
            email: 'fredrikn@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: false,
            graduationYear: 2018,
            birthDate: new Date('October 10, 1980'),
            program: 'UDM',
            comments: '...'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Andreas',
            lastName: 'Jönsson',
            phone: '0123456-123',
            email: 'andreas@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: true,
            graduationYear: 2018,
            birthDate: new Date('October 10, 1980'),
            program: 'Interaktionsdesign',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Nils',
            lastName: 'Poppe',
            phone: '0123456-123',
            email: 'poppe@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: false,
            graduationYear: 2019,
            birthDate: new Date('October 10, 1981'),
            program: 'UDM',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Olivia',
            lastName: 'Stone',
            phone: '0123456-123',
            email: 'olivia@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: true,
            graduationYear: 2018,
            birthDate: new Date('October 10, 1980'),
            program: 'Interaktionsdesign',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Lisa',
            lastName: 'Jackman',
            phone: '0123456-123',
            email: 'lisa@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            graduationYear: 2018,
            birthDate: new Date('October 10, 1980'),
            program: 'UDM',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Hugh',
            lastName: 'Reynolds',
            phone: '0123456-123',
            email: 'hugh@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: true,
            graduationYear: 2020,
            birthDate: new Date('October 10, 1989'),
            program: 'UDM',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Ola',
            lastName: 'Bengtsson',
            phone: '0123456-123',
            email: 'ola@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: false,
            graduationYear: 2018,
            birthDate: new Date('October 10, 1980'),
            program: 'UDM',
            comments: '...'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Carina',
            lastName: 'Axelsson',
            phone: '0123456-123',
            email: 'carina@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: true,
            graduationYear: 2018,
            birthDate: new Date('October 10, 1980'),
            program: 'Interaktionsdesign',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Nils',
            lastName: 'Gran',
            phone: '0123456-123',
            email: 'nille@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: false,
            graduationYear: 2019,
            birthDate: new Date('October 10, 1981'),
            program: 'UDM',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Oliver',
            lastName: 'Skoog',
            phone: '0123456-123',
            email: 'oliver@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: true,
            graduationYear: 2018,
            birthDate: new Date('October 10, 1980'),
            program: 'WP',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Curt',
            lastName: 'Hackman',
            phone: '0123456-123',
            email: 'curre@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            graduationYear: 2018,
            birthDate: new Date('October 10, 1980'),
            program: 'UDM',
            comments: 'bla'
        })
    }).then(() => {
        return UserModel.create({
            firstName: 'Nathalie',
            lastName: 'Persson',
            phone: '0123456-123',
            email: 'natta@gmail.com',
            facultyId: 6,
            password: 'pswd12345',
            phd: true,
            graduationYear: 2020,
            birthDate: new Date('October 10, 1989'),
            program: 'UDM',
            comments: 'bla'
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 1,
            UserId: 1,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: true
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 1,
            UserId: 2,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: true
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 1,
            UserId: 3,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: true
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 1,
            UserId: 4,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: true
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 2,
            UserId: 5,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: true
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 2,
            UserId: 6,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: true
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 3,
            UserId: 6,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: true
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 4,
            UserId: 7,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: true
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 4,
            UserId: 8,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: false
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 4,
            UserId: 9,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: false
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 4,
            UserId: 10,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: false
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 4,
            UserId: 11,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: false
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 5,
            UserId: 12,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: false
        })
    }).then(() => {
        return UserPositionModel.create({
            CouncilInstanceId: 4,
            UserId: 12,
            from: new Date('januari 2, 2017'),
            till: new Date('may 29, 2017'),
            elected: false
        })
    }).then(() => {
        return EmployeeModel.create({
            firstName: 'Håkan',
            lastName: 'Hellstrand',
            phone: '0123456-123',
            email: 'hh@gmail.com',
            facultyId: 1,
            profileUrl: "https://www.google.se/#q=h%C3%A5kan+hellstr%C3%B6m",
            password: 'pswd12345',
        })
    }).then(() => {
        return EmployeeModel.create({
            firstName: 'Sanna',
            lastName: 'Nilsson',
            phone: '0123456-123',
            email: 'sn@gmail.com',
            facultyId: 1,
            profileUrl: "https://www.google.se/#q=sanna+nielsen",
            password: 'pswd12345',

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
    })
}
