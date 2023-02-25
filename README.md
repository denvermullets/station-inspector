yarn install inside root dir, inside /server, inside /client
yarn dev from root folder to start up client, server, and workers

create database via psql
add `DATABASE_URL` to .env inside /server
example: `DATABASE_URL="postgres://<username>:postgres@localhost:5432/<database_name>"`

switch to server folder
`yarn db:migrate`
`yarn db:seed`

this is how to generate a csv if you don't have one
`http://localhost:3000/api/v1/csv/generate`
numRows
numExtraColumns

client: http://127.0.0.1:5173/
