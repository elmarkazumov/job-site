// const editButton = document.querySelectorAll('#editVacancy');
// const deleteButton = document.querySelectorAll('#deleteVacancy');
// import {connection} from '../../settings/db';

// editButton.forEach(button => { button.addEventListener('click', function() {
//     const vacancyId = button.parentNode.parentNode.dataset.id;
//     alert(vacancyId);
// })});

// deleteButton.forEach(button => { button.addEventListener('click', function() {
//     const vacancyId = button.parentNode.parentNode.dataset.id;
//     alert(vacancyId);

//     connection.query("DELETE FROM `Vacancy` WHERE `id` = '" + vacancyId + "'", (error, rows, fields) =>{
//         if(error){
//             console.log(400, error, res);
//         } else{
//             const sql = "DELETE FROM `Vacancy` WHERE `id` = '" + vacancyId + "'";
//             connection.query(sql, (error, results) => {
//                 if(error) {
//                     console.log(error);
//                 } else{
//                     console.log('Вакансия успешно удалена');
//                 }
//             })
//         }
//     })

// })});

console.log(document.querySelector('.main__vacancy'));