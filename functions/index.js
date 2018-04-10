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

    admin.firestore().collection('wedding_todos').add({
      user_id: uid,
      text: 'Book a venue',
      date: new Date("January 10, 2018"),
      days_before_wedding: 365,
      complete: false,
      parent_id: null,
      vendor: true,
      vendor_id: null
    })
});
