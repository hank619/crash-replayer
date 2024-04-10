import { Injectable } from '@nestjs/common';
import { CreateEventsDto } from './events.dto';
import { db } from '../fireasbe';

@Injectable()
export class EventsService {
  async findList(browserId: string, offset: number, limit: number) {
    const step1Ref = browserId
      ? db.collection('users').where('browserId', '==', browserId)
      : db.collection('users');
    const recordRef = step1Ref.offset(offset).limit(limit);
    const snapshot = await recordRef.get();
    const customers = [];
    snapshot.forEach((doc) => {
      const listItem = doc.data();
      delete listItem.events;
      customers.push(listItem);
    });
    return customers;
  }

  async findDetail(browserId: string) {
    const recordRef = db
      .collection('users')
      .where('browserId', '==', browserId);
    const snapshot = await recordRef.get();
    if (snapshot.empty) {
      return 'customer not found';
    } else {
      return snapshot.docs[0].data();
    }
  }

  async create(createEventDto: CreateEventsDto) {
    const { error, source, lineno, colno, customerId, browserId, events } =
      createEventDto;
    const recordRef = db
      .collection('users')
      .where('browserId', '==', browserId);
    const snapshot = await recordRef.get();
    let res = null;
    if (snapshot.empty) {
      res = await db.collection('users').add({
        error,
        source,
        lineno,
        colno,
        browserId,
        customerId,
        events,
      });
    } else {
      res = await db.collection('users').doc(snapshot.docs[0].id).update({
        events,
      });
    }
    return res;
  }
}
