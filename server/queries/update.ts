
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

export function updateUserPosition(userId: number, props: any, model: any, councilInstanceId: number) {
    return model.update(
        props,
        {
            where: {
                UserId: userId,
                CouncilInstanceId: councilInstanceId
            }
        }
    );
}

export function updateEmployeePosition(EmployeeId: number, props: any, model: any, CouncilId: number) {
    return model.update(
        props,
        {
            where: {EmployeeId, CouncilId}
        }
    );
}
