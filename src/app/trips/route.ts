import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const trips = await prisma.trip.findMany();

  return new NextResponse(JSON.stringify(trips), {
    status: 200,
  });
}
// export async function GET(request: NextRequest) {
//   return new NextResponse(
//     JSON.stringify({
//       id: 1,
//       name: "John Doe",
//       email: "john@gmial.com",
//     }),
//     {
//       status: 200,
//     }
//   );
// }
