import {CouncilModel, FacultyModel} from "../../model/model";
import {createFaculties, createFaculty} from "../../model/faculty";

export function findOneFaculty(facultyId: number) {
    return FacultyModel.findById(facultyId, {
        include: [
            {
                model: CouncilModel
            }
        ]
    })
        .then(createFaculty)
}
