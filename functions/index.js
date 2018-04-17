const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

exports.createUser = functions.firestore
  .document('users/{userId}')
  .onCreate(event => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const user = event.data.data();
    console.log('user:')
    console.log(user)
    console.log('event data:')
    console.log(event.data)

    // access a particular field as you would any JS property
    const uid = user.user_auth_uid;

    // perform desired operations ...

    const batch = admin.firestore().batch()
    const wedding_todos_collection_ref = admin.firestore().collection('wedding_todos')
    batch.set(wedding_todos_collection_ref.doc(), {
      user_id: uid,
      text: 'Book a venue',
      // date: new Date("January 10, 2018"),
      days_before_wedding: 365,
      complete: false,
      parent_id: null,
      vendor: true,
      vendor_id: null
    })

    batch.set(wedding_todos_collection_ref.doc(), {
      user_id: uid,
      text: 'Order Invitations',
      // date: new Date("January 10, 2018"),
      days_before_wedding: 150,
      complete: false,
      parent_id: null,
      vendor: false,
      vendor_id: null
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
