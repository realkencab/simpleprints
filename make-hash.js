// make-hash.js
const bcrypt = require('bcryptjs');

// 1. CHOOSE YOUR PASSWORD: Change the text inside the quotes to the password you want.
const plainTextPassword = 'testsalespassword'; 

// 2. Generate the secure hash
const salt = bcrypt.genSaltSync(10);
const passwordHash = bcrypt.hashSync(plainTextPassword, salt);

// 3. Output the result to the terminal
console.log('\n==================================================================');
console.log('SUCCESS! Copy the entire scrambled string below into your Google Sheet:');
console.log('==================================================================\n');
console.log(passwordHash);
console.log('\n==================================================================\n');
