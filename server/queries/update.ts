
export function update(id: number, props: any, model: any) {
    return model.update(
        props,
        {
            where: {id}
        }
    );
}


// Needs to be fixed... removed councilid
export function updateCouncilInst(props: any, model: any, id: number) {
    return model.update(
        props,
        {
            where: {id}
        }
    );
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
