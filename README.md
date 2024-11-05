<h1 align="center">Red Planet Staffing</h1>
<img src="./assets/red-planet.webp" alt="Red Planet Staffing" >

Welcome to the red planet! At just over one million people as of the 2050 census, Martian settlements are flourishing. As the leading staffing marketplace on Mars, Red Planet connects workplaces with workers to fill shifts.

### Business context

Our primary customers are Martian workplaces. While they have full-time staff, they occasionally need short-term flexible staff to fill gaps in their operations (for example, when a worker is sick or on a vacation to the Moon).

When they need a worker, workplaces post a "shift" on our marketplace. Workers on our marketplace then claim these shifts and are assigned to them. Once assigned, workers perform the work at the shift's start time until it's end time, and are paid based on the hours worked.

## Getting started

This microservice uses technologies that have stood the test of time.

- [TypeScript](https://www.typescriptlang.org/)
- [NestJS](https://docs.nestjs.com/)
- [Prisma](https://www.prisma.io/docs/concepts/components/prisma-client)

### Local development commands

```bash
# Install dependencies
npm install

# Create and migrate the database, and then apply seed data located at `./prisma/seed`
npx prisma migrate dev --name init

# Drop and re-seed the database
npx prisma migrate reset

# Start the server in watch mode with hot-reloading
npm run start:dev
```

## Top Three Workplaces

After migrating the dataset and starting the next server, the top three workplaces can be queried with the `top-workplaces.ts` file. Afte running `npm run start:topWorplaces` it produces the following result:
  ```json
  [
    {
      "id": 14,
      "name": "Saturn Systems",
      "status": 0,
      "shifts": [
        {
          "id": 17,
          "createdAt": "2024-10-28T07:14:10.196Z",
          "startAt": "2024-06-20T07:00:00.000Z",
          "endAt": "2024-06-20T15:00:00.000Z",
          "workplaceId": 14,
          "workerId": 7,
          "cancelledAt": null
        },
        {
          "id": 18,
          "createdAt": "2024-10-28T07:14:10.196Z",
          "startAt": "2024-06-21T07:00:00.000Z",
          "endAt": "2024-06-21T15:00:00.000Z",
          "workplaceId": 14,
          "workerId": 8,
          "cancelledAt": null
        },
        {
          "id": 19,
          "createdAt": "2024-10-28T07:14:10.197Z",
          "startAt": "2024-06-22T07:00:00.000Z",
          "endAt": "2024-06-22T15:00:00.000Z",
          "workplaceId": 14,
          "workerId": 9,
          "cancelledAt": null
        }
      ],
      "shiftCount": 3
    },
    {
      "id": 16,
      "name": "Venus Ventures",
      "status": 0,
      "shifts": [
        {
          "id": 21,
          "createdAt": "2024-10-28T07:14:10.198Z",
          "startAt": "2024-06-24T07:00:00.000Z",
          "endAt": "2024-06-24T15:00:00.000Z",
          "workplaceId": 16,
          "workerId": 15,
          "cancelledAt": null
        },
        {
          "id": 22,
          "createdAt": "2024-10-28T07:14:10.199Z",
          "startAt": "2024-06-25T07:00:00.000Z",
          "endAt": "2024-06-25T15:00:00.000Z",
          "workplaceId": 16,
          "workerId": 2,
          "cancelledAt": null
        }
      ],
      "shiftCount": 2
    },
    {
      "id": 11,
      "name": "Deep Space Technologies",
      "status": 0,
      "shifts": [
        {
          "id": 15,
          "createdAt": "2024-10-28T07:14:10.195Z",
          "startAt": "2024-06-18T07:00:00.000Z",
          "endAt": "2024-06-18T15:00:00.000Z",
          "workplaceId": 11,
          "workerId": 12,
          "cancelledAt": null
        }
      ],
      "shiftCount": 1
    }
  ]
  ```

  The `shiftCount` key shows the number of active shits on the workplace. The active shifts are filtered beforehand wherever the workplace had `status` code set to 0.

## API

### Workers

- `POST /workers`: Create a worker.
  - Body: [`createWorkerSchema`](./src/modules/workers/workers.schemas.ts).
- `GET /workers/:id`: Get a worker by ID.
  - Path parameters:
    - `:id`: Worker ID.
- `GET /workers`: Get workers.
  - Query parameters:
    - `page` (optional): Page number.
- `GET /workers/claims`: Get worker claims.
  - Query parameters:
    - `:workerId`: Worker ID.
    - `page` (optional): Page number.

### Workplaces

- `POST /workplaces`: Create a workplace.
  - Body: [`createWorkplaceSchema`](./src/modules/workplaces/workplaces.schemas.ts).
- `GET /workplaces/:id`: Get a workplace by ID.
  - Path parameters:
    - `:id`: Workplace ID.
- `GET /workplaces`: Get workplaces.
  - Query parameters:
    - `page` (optional): Page number.

### Shifts

- `POST /shifts`: Create a shift.
  - Body: [`createShiftSchema`](./src/modules/shifts/shifts.schemas.ts).
- `GET /shifts/:id`: Get a shift by ID.
  - Path parameters:
    - `:id`: Shift ID.
- `POST /shifts/:id/claim`: Claim a shift.
  - Path parameters:
    - `:id`: Shift ID.
  - Body:
    - `workerId`: Worker ID.
- `POST /shifts/:id/cancel`: Cancel a claimed shift.
  - Path parameters:
    - `:id`: Shift ID.
- `GET /shifts`: Get shifts.
  - Query parameters:
    - `page` (optional): Page number.
