import {randomBytes} from 'node:crypto';import {writeFileSync,existsSync} from 'node:fs';
if(existsSync('.env'))throw Error('.env уже існує. Змініть налаштування вручну; файл не перезаписано.');
const password='Aa!'+randomBytes(15).toString('base64url')+'7';
writeFileSync('.env',`APP_URL=http://localhost:3000\nPORT=3000\nSESSION_SECRET=${randomBytes(48).toString('hex')}\nADMIN_EMAIL=admin@example.test\nADMIN_PASSWORD=${password}\nMAIL_MODE=preview\nOIDC_ISSUER=http://localhost:3001\nOIDC_CLIENT_ID=accounts-local\n`,{mode:0o600});
console.log('Локальний .env створено. Він ігнорується Git.');console.log('Email адміністратора: admin@example.test');console.log('Збережіть пароль адміністратора:',password);
