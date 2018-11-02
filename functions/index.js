const functions = require('firebase-functions');
const admin = require('firebase-admin');

import {
  PAYMENT,
  TASK,
  VENDOR
} from 'app/config/todo_types';

admin.initializeApp(functions.config().firebase);

exports.createWedding = functions.firestore
  .document('weddings/{weddingId}')
  .onCreate(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const wedding = event.data.data();
    const weddingId = event.params.weddingId

    // perform desired operations ...

    const batch = admin.firestore().batch()
    const wedding_todos_collection_ref = admin.firestore().collection('wedding_todos')
    batch.set(wedding_todos_collection_ref.doc(), {
      user_id: wedding.user_id,
      text: 'Book a venue',
      date: null,
      days_before_wedding: 365,
      complete: false,
      parent_id: null,
      vendor: true,
      type: VENDOR,
      vendor_id: null,
      wedding_id: weddingId
    })

    batch.set(wedding_todos_collection_ref.doc(), {
      user_id: wedding.user_id,
      text: 'Order Invitations',
      date: null,
      days_before_wedding: 150,
      complete: false,
      parent_id: null,
      vendor: false,
      type: TASK,
      vendor_id: null,
      wedding_id: weddingId
    })

    batch.commit().then(() => console.log('successfully created todos'))


    // admin.firestore().collection('wedding_todos').add({
    //   user_id: uid,
    //   text: 'Book a venue',
    //   // date: new Date("January 10, 2018"),
    //   days_before_wedding: 365,
    //   complete: false,
    //   parent_id: null,
    //   vendor: true,
    //   vendor_id: null
    // }, {
    //   user_id: uid,
    //   text: 'Order Invitations',
    //   // date: new Date("January 10, 2018"),
    //   days_before_wedding: 150,
    //   complete: false,
    //   parent_id: null,
    //   vendor: false,
    //   vendor_id: null
    // })
});
