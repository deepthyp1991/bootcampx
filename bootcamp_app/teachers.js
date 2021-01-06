const { Pool } = require('pg');

const pool = new Pool({
  user:'vagrant',
  password:'123',
  host:'localhost',
  database:'bootcampx'
});

pool.query(`
SELECT DISTINCT teachers.name AS teacher, 
cohorts.name AS cohort,
COUNT(assistance_requests.*)
FROM cohorts 
JOIN students ON cohorts.id = cohort_id 
JOIN assistance_requests ON students.id = student_id 
JOIN teachers ON teachers.id = teacher_id 
WHERE cohorts.name = '${process.argv[2] || 'JUL02'}' 
GROUP BY teacher, cohort
ORDER BY teacher;
`).then(res => {
  res.rows.forEach(row => {
    console.log(`${row.cohort}: ${row.teacher}`);
  })
})
.catch(err => console.log(err))