import { NextResponse } from "next/server";

type Booking = { date:string; slot:string; email:string; name:string; mode:string; status:string };
const bookings: Booking[] = [];

export async function POST(request: Request) {
  const body = await request.json() as Partial<Booking>;
  if (!body.date || !body.slot || !body.email || !body.name || !body.mode) return NextResponse.json({ message:"Completá los campos obligatorios para solicitar el turno." }, { status:400 });
  if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ message:"Revisá el correo de contacto." }, { status:400 });
  const duplicate = bookings.some(item => item.date === body.date && item.slot === body.slot && item.status !== "cancelada");
  if (duplicate) return NextResponse.json({ message:"Ese horario acaba de ser solicitado por otra persona. Elegí otro momento." }, { status:409 });
  bookings.push({ date:body.date, slot:body.slot, email:body.email, name:body.name, mode:body.mode, status:"pendiente" });
  return NextResponse.json({ message:"Recibimos tu solicitud. Quedó pendiente de confirmación; todavía no se envió ningún correo automático." }, { status:201 });
}
