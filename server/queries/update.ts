
export function update(id: number, props: any, model: any) {

    return model.update(
        props,
        {
            where: {id}
        }
    );
}
