import {CouncilModel, FacultyModel} from "../model/model";
import {createFaculties} from "../model/faculty";

export function findAllFaculties() {
    return FacultyModel.findAll({
        include: [
            {
                model: CouncilModel
            }
        ]
    })
        .then(createFaculties)
}
