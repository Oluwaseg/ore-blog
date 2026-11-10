import { getSession } from '@/features/auth/session';
import { db } from '@/lib/db';

const BATCH_SIZE = 500;

function csvCell(value: string) {
  const safeValue = /^[\t\r\n ]*[=+\-@]/.test(value) ? `'${value}` : value;
  return `"${safeValue.replaceAll('"', '""')}"`;
}

export async function GET() {
  const session = await getSession();

  if (!session) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const admin = await db.admin.findUnique({
    where: { id: session.adminId },
    select: { id: true },
  });

  if (!admin) {
    return Response.json(
      { error: 'Unauthorized' },
      { status: 401, headers: { 'Cache-Control': 'private, no-store' } }
    );
  }

  const encoder = new TextEncoder();
  let cursor: string | undefined;
  let headerSent = false;
  const stream = new ReadableStream<Uint8Array>({
    async pull(controller) {
      try {
        if (!headerSent) {
          controller.enqueue(
            encoder.encode(
              '\uFEFFEmail,Status,Subscribed at,Unsubscribed at\r\n'
            )
          );
          headerSent = true;
          return;
        }

        const batch = await db.newsletterSubscriber.findMany({
          orderBy: { id: 'asc' },
          ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),
          take: BATCH_SIZE,
          select: {
            id: true,
            email: true,
            status: true,
            subscribedAt: true,
            unsubscribedAt: true,
          },
        });

        if (batch.length === 0) {
          controller.close();
          return;
        }

        const csvRows = batch.map((subscriber) =>
          [
            subscriber.email,
            subscriber.status,
            subscriber.subscribedAt.toISOString(),
            subscriber.unsubscribedAt?.toISOString() ?? '',
          ]
            .map(csvCell)
            .join(',')
        );

        cursor = batch[batch.length - 1].id;
        controller.enqueue(encoder.encode(`${csvRows.join('\r\n')}\r\n`));
      } catch (error) {
        console.error('Subscriber CSV export failed.', error);
        controller.error(error);
      }
    },
  });

  return new Response(stream, {
    headers: {
      'Cache-Control': 'private, no-store',
      'Content-Disposition':
        'attachment; filename="newsletter-subscribers.csv"',
      'Content-Type': 'text/csv; charset=utf-8',
    },
  });
}
