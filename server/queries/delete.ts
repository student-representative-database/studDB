export function deleteOne(id: number, model: any) {
    let record = null;

    return model.findById(id)
        .then ( (r) => { record = r; } )
        .then(() => model.destroy({
            where: {id}
        })).then(() => record)
}

export function deleteUserPosition(UserId: number, CouncilInstanceId: number, model: any) {
    return model.destroy({
        where: {UserId, CouncilInstanceId}
    });
}

export function deleteEmployeePosition(EmployeeId: number, CouncilId: number, model: any) {
    return model.destroy({
        where: {EmployeeId, CouncilId}
    });
}
