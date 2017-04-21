
import {Application} from "express";
import {apiGetAllFaculties} from "./apiGetAllFaculties";
import {apiCreateFaculty} from "./apiCreateFaculty";
import {apiCreateCouncil} from "./apiCreateCouncil";

export function initRestApi(app: Application) {

    //Closed API
    app.route('/api/v1/faculties').get(apiGetAllFaculties);
    app.route('/api/v1/faculties').post(apiCreateFaculty);
    //app.route('/api/v1/faculties/:id').patch(apiPatchFaculty);
    //app.route('/api/v1/faculties/:id').delete(apiDeleteFaculty);

    //app.route('/api/v1/faculties/:faculty/:id').get(apiGetAllCouncils);
    app.route('/api/v1/faculties/:facultyId/').post(apiCreateCouncil);
    //app.route('/api/v1/faculties/:faculty/:id').patch(apiPatchCounsil);
    //app.route('/api/v1/faculties/:faculty/:id').delete(apiDeleteCounsil);

    //Open API

}
