import {CouncilModel} from '../../model/model';

export function createCouncil(facultyId: number, props: any) {
    props.facultyId = facultyId;
    return CouncilModel.create(props);
}
