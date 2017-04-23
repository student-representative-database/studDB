import {FacultyModel} from '../../model/model';

export function updateFaculty(id: number, props: any) {

    return FacultyModel.update(
        props,
        {
            where: {id}
        }
    );
}
