import { Injectable } from '@nestjs/common';
import { CreateEventsDto } from './events.dto';
import { db } from 'src/fireasbe';

@Injectable()
export class EventsService {
  async findList(customerId: string, offset: number, limit: number) {
    const step1Ref = customerId
      ? db.collection('users').where('customerId', '==', customerId)
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

  async findDetail(customerId: string) {
    const recordRef = db
      .collection('users')
      .where('customerId', '==', customerId);
    const snapshot = await recordRef.get();
    if (snapshot.empty) {
      return 'customer not found';
    } else {
      return snapshot.docs[0].data();
    }
  }

  async create(createEventDto: CreateEventsDto) {
    const { error, source, lineno, colno, customerId, events } = createEventDto;
    const recordRef = db
      .collection('users')
      .where('customerId', '==', customerId);
    const snapshot = await recordRef.get();
    let res = null;
    if (snapshot.empty) {
      res = await db.collection('users').add({
        error,
        source,
        lineno,
        colno,
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
