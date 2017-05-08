
export function update(id: number, props: any, model: any) {

    return model.update(
        props,
        {
            where: {id}
        }
    );
}

export function updateCouncilInst(councilId: number, props: any, model: any, id: number) {

    return model.update(
        props,
        {
            where: {councilId, id}
        }
    );
}
