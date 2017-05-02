
export function update(id: number, props: any, model: any) {

    return model.update(
        props,
        {
            where: {id}
        }
    );
}

export function updateCouncilInst(councilId: number, props: any, model: any, year: number) {

    return model.update(
        props,
        {
            where: {councilId, year}
        }
    );
}
