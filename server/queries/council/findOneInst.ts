import { CouncilInstanceModel, CouncilPositionsModel } from './../../model/model';
import { CouncilModel } from '../../model/model';
import { createCouncilInstance } from '../../model/councilInst';

export function findOneInst(councilId: number, year: number) {
    return CouncilInstanceModel.findOne({
        where: { councilId, year },
        include: [{ model: CouncilPositionsModel }]
    })
    .then(createCouncilInstance);
}
