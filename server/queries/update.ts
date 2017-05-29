
export function update(id: number, props: any, model: any) {
    // return model.update(
    //     props,
    //     {
    //         where: {id}
    //     }
    // );
    return model.findById(id, {})
        .then((result) => result.update(props))
        .then((result) => result)
}

export function updateUserPosition(UserId: number, props: any, model: any, CouncilInstanceId: number) {
    /*return model.update(
        props,
        {
            where: {
                UserId: userId,
                CouncilInstanceId: councilInstanceId
            }
        }
    );*/

    return model.findOne({
        where: {UserId, CouncilInstanceId} })
        .then((result) => result.update(props))
        .then((result) => result)
}

export function updateEmployeePosition(EmployeeId: number, props: any, model: any, CouncilId: number) {
    /*return model.update(
        props,
        {
            where: {EmployeeId, CouncilId}
        }
    );*/

    return model.findOne({
        where: {EmployeeId, CouncilId} })
        .then((result) => result.update(props))
        .then((result) => result)
}
