
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
