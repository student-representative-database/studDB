
// export function create(props: any, model: any, optional?: any) {
//     if (optional) {
//         props.facultyId = optional;
//         return model.create(props);
//     }else {
//         return model.create(props);
//     }
// }

export function create(props: any, model: any) {
    return model.create(props);
}
