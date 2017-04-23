import {CouncilModel} from '../../model/model';
import {createCouncil} from '../../model/council';

export function findOneCouncil(councilId: number) {
    return CouncilModel.findById(councilId)
        .then(createCouncil);
}
