import {
    CouncilInstanceModel, CouncilModel, FacultyModel, sequelize, UserModel,
    UserPositionModel
} from "../../model/model";
import {createVacancies} from "../../model/Interfaces/vacancy";
import {createFaculties} from "../../model/Interfaces/vacancy2";

export function findAllVacantPositions(year?: number) {
    let from;
    let till;

    if (year < 3000 && year > 2000){
        from = new Date(year);
        till = new Date(year);
        from.setMonth(from.getMonth() + 6);
        till.setMonth(from.getMonth() + 12);
    } else {
        from = new Date();
        till = new Date();
        if (from.getMonth() < 7){
            from.setFullYear(from.getFullYear() - 1);
            from.setMonth(7);
            from.setDate(1);
            till.setMonth(7);
            till.setDate(7);
        }
    }
    return sequelize.query('select "Faculties".name AS "facultyName", "Councils"."facultyId", "Councils".name,' +
        ' "CouncilInstances"."councilId", "CouncilInstances".id AS "CouncilInstId", "Councils"."studentPositions",' +
        ' "elected".Stud AS "electedStuds", "Councils"."phdPositions", "elected".phd AS "electedPhds"' +
        ' from "CouncilInstances"' +
        ' LEFT JOIN "Councils" ON "CouncilInstances"."councilId" = "Councils"."id"' +
        ' LEFT JOIN "Faculties" ON "Faculties"."id" = "Councils"."facultyId"' +
        ' LEFT JOIN' +
        ' (select "UserPositions"."CouncilInstanceId", count(CASE when' +
        ' "Users".phd = FALSE then 1 else null END) AS Stud,' +
        ' count(CASE when "Users".phd = TRUE then 1 else null end) AS phd FROM "UserPositions"' +
        ' LEFT JOIN "Users" ON "UserPositions"."UserId" = "Users".id' +
        ' WHERE "from" > ' + '\'' + from.toDateString() + '\'' + '::DATE AND' +
        ' "till" < ' + '\'' + till.toDateString() + '\'' + '::DATE AND elected = TRUE' +
        ' GROUP BY "UserPositions"."CouncilInstanceId") AS elected' +
        ' ON elected."CouncilInstanceId" = "Councils"."facultyId"' +
        ' WHERE "CouncilInstances"."from" > ' + '\'' + from.toDateString() + '\'' + '::DATE AND' +
        ' "CouncilInstances"."till" < ' + '\'' + till.toDateString() + '\'' + '::DATE')
        .then((res) => createVacancies(res[0]))
}

export function findAllVacantPositions2(year?: number) {
    let from;
    let till;

    if (year < 3000 && year > 2000){
        from = new Date(year);
        till = new Date(year);
        from.setMonth(from.getMonth() + 6);
        till.setMonth(from.getMonth() + 12);
    } else {
        from = new Date();
        till = new Date();
        if (from.getMonth() < 7){
            from.setFullYear(from.getFullYear() - 1);
            from.setMonth(7);
            from.setDate(1);
            till.setMonth(7);
            till.setDate(7);
        }
    }
    return FacultyModel.findAll(
        {
            attributes: ['id', 'name'],
            include: [
                {
                    model: CouncilModel,
                    attributes: ['id', 'name', 'studentPositions', 'phdPositions'],
                    include: [
                        {
                            model: CouncilInstanceModel,
                            attributes: ['id'],
                            where: {
                                from: {
                                    $lt: new Date(till)
                                },
                                till: {
                                    $gt: new Date(from)
                                }
                            },
                            include: [
                                {
                                    model: UserModel,
                                    attributes: ['id', 'phd'],
                                    through: {
                                        model: UserPositionModel,
                                        where: {elected: {$eq: true}},
                                        attributes: ['elected']
                                    }
                                }
                            ],
                        }
                    ]
                }
            ]
        }
    ).then((res) => createFaculties(res))
       //.then((res) => res)
}
