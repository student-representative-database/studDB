import {CouncilModel} from "../model/model";
const hri = require('human-readable-ids').hri;

export function updateCouncil(id: string, props: any) {

    return CouncilModel.update(
        props,
        {
            where: {id}
        }
    );


}