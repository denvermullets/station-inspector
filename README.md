# Inspection-Station

NodeJS server w/a React frontend that lets you upload a CSV of records. Frontend holds a form that lets you click or drag and drop a CSV to upload. Progress will be shown while uploading.

### What the plan was

In order to account for potentially large CSV files, I opted to offload the creation of the records to a worker queue system (BullMQ) that will allow the user to quickly upload the CSV, which will be parsed with CSV-Parser. If the record doesn't meet the intended criteria, it will reject that record and move on, prior to being assigned to the queue. The flaw with this setup, as is, is that there's no way to alert the user to any bad records or if any transactions fail.

I wasn't sure what a 'provider' was, truly, so I setup an assumed relationship between Provider and Vehicle records, doesn't really impact much here. In theory, a query I could see being used is one that would show how many Vehicles a Provider has.

I provided a seed file that will populate the DB with 10 or so Provider's for when you upload your CSV. I also provided a Postman collection for additional routes, 1 of which is a route to generate a CSV with a specified number of rows w/optional extra columns.

There is an additional folder called `/files` that is where the generated CSV will go and also the temp folder from the upload processing. I left in 2 files for reference.

```bash
  http://localhost:3000/api/v1/csv/generate?numRows=10&numExtraColumns=10
```

## Installation

Create your Postgres database in PSQL (or other) and put that url inside of a .env in `/server`

ex:

```
  DATABASE_URL="postgres://<username>:postgres@localhost:5432/<db_name>"
```

Inside the root folder, `/server`, and `/client` you will need to run `yarn install`

Inside the `/client` folder you will need to run the migration and the seed file.

```
  yarn db:migrate && yarn db:seed
```

You run `yarn dev` from the root folder to start up the frontend, backend, and workers.

The client can be accessed via `http://127.0.0.1:5173/`

### Note

If you opt to access the client via `http://localhost:5173`, you will need to uncomment Line 17 in `index.ts` inside the server folder.

## The Stack

#### Frontend

- React
- Chakra UI
- Socket.io
- axios
- Vite

#### Backend

- NodeJS / Express
- BullMQ
- CSV-Parser
- Multer
- Knex
- Postgres
- REDIS
- Socket.io
