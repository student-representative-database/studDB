
export function deleteOne(id: number, model: any, year?: number) {
    if (year) {
        return model.destroy({
            where: {id, year}
        });
    }
    return model.destroy({
        where: {id}
    });
}
