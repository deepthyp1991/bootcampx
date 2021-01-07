const { Pool } = require('pg');

const pool = new Pool({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'bootcampx'
});

const querystring = `
SELECT DISTINCT teachers.name AS teacher, 
cohorts.name AS cohort,
COUNT(assistance_requests.*)
FROM cohorts 
JOIN students ON cohorts.id = cohort_id 
JOIN assistance_requests ON students.id = student_id 
JOIN teachers ON teachers.id = teacher_id 
WHERE cohorts.name LIKE $1 
GROUP BY teacher, cohort
ORDER BY teacher;
`;

const cohortName = process.argv[2] || 'JUL02';
const values = [cohortName]

pool.query(querystring, values).then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => console.log(err))