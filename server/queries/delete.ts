
export function deleteOne(id: number, model: any) {
    return model.destroy({
        where: {id}
    });
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
