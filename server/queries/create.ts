
export function create(props: any, model: any, optional?: any) {
    if (optional) {
        props.facultyId = optional;
        return model.create(props);
    }else {
        return model.create(props);
    }
}

export function createCouncilPosition(model: any, councilId: number, year: number, councilInstanceId) {
    // return model.create(props);
    return model.create({year, councilId, councilInstanceId });
}
