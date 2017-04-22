import {CouncilModel} from "../model/model";

export function updateCouncil(id: number, props: any) {

    return CouncilModel.update(
        props,
        {
            where: {id}
        }
    );
}