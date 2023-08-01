import { prisma } from "@/lib/prisma";

const getTrips = async () => {
  const trips = await prisma.trip.findMany({});

  return trips;
};

const Trips = async () => {
  const data = await fetch(
    "https://api.github.com/users/rafael-rufino/repos"
  ).then((res) => res.json());

  return (
    <div>
      <h1>Rafael Rufino</h1>
      {data?.map((trip: any) => {
        return (
          <div key={trip.name}>
            <h2>{trip.name}</h2>
            <p>{trip.description}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Trips;
