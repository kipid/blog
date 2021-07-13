const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = '123123';
const someOtherPlaintextPassword = 'not_bacon';

bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
  // Store hash in your password DB.
  console.log(hash);
  console.log(hash.length);
});

var hash = "$2b$10$me0cqMd7dpOxeFhsBirkPeDf0wiNVXdsB/Rp1CltIbmH5Ixg.hfsW";

bcrypt.compare(myPlaintextPassword, hash, function(err, result) {
  // result == true
  console.log(`correct : ${result}`);
});

bcrypt.compare(someOtherPlaintextPassword, hash, function(err, result) {
  // result == false
  console.log(`incorrect : ${result}`);
});
