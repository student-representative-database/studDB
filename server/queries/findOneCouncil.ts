import {CouncilModel} from "../model/model";
import {createCouncil} from "../model/council";


export function findOneCouncil(councilId: number) {
    console.log(councilId);
    return CouncilModel.findById(councilId)
        .then(createCouncil);
}
