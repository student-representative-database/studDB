import {FacultyModel} from "../model/model";

export function deleteFaculty(id: number) {
    return FacultyModel.destroy({
        where: {id}
    });
}
