import {CouncilModel} from "../model/model";


export function deleteCouncil(id: string) {
    return CouncilModel.destroy({
        where: {id}
    });
}
