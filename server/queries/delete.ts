export function deleteOne(id: number, model: any) {
    let record = null;

    return model.findById(id)
        .then ( (r) => { record = r; } )
        .then(() => model.destroy({
            where: {id}
        })).then(() => record)
}

export function deleteUserPosition(UserId: number, CouncilInstanceId: number, model: any) {
    let record = null;

    return model.findOne({
        where: {UserId, CouncilInstanceId} })
        .then ( (r) => { record = r; } )
        .then(() => model.destroy({
            where: {UserId, CouncilInstanceId}
        })).then(() => record)
}

export function deleteEmployeePosition(EmployeeId: number, CouncilId: number, model: any) {
    /*return model.destroy({
        where: {EmployeeId, CouncilId}
    });*/

    let record = null;

    return model.findOne({
        where: {EmployeeId, CouncilId} })
        .then ( (r) => { record = r; } )
        .then(() => model.destroy({
            where: {EmployeeId, CouncilId}
        })).then(() => record)
}
