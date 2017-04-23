
export function deleteOne(id: number, model: any) {
    return model.destroy({
        where: {id}
    });
}
