import {CouncilModel} from "../model/model";

export function deleteCouncil(id: number) {
    return CouncilModel.destroy({
        where: {id}
    });
}
