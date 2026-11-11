import {randomBytes,randomInt,scrypt,timingSafeEqual,createHash} from 'node:crypto';
import {promisify} from 'node:util';
const derive=promisify(scrypt);
export const token=()=>randomBytes(32).toString('base64url');
export const digest=x=>createHash('sha256').update(String(x)).digest('hex');
export const otp=()=>String(randomInt(100000,1000000));
export function passwordErrors(p){const e=[];if(typeof p!=='string')return ['Введіть пароль'];if(p.length<8)e.push('Щонайменше 8 символів');if(p.length>128)e.push('Не більше 128 символів');if(!/\p{Lu}/u.test(p)||!/\p{Ll}/u.test(p))e.push('Великі й малі літери');if(!/\p{N}/u.test(p))e.push('Принаймні одна цифра');if(!/[^\p{L}\p{N}\s]/u.test(p))e.push('Спеціальний символ');return e;}
export async function hashPassword(p){const salt=randomBytes(16).toString('hex');const key=await derive(p,salt,64,{N:16384,r:8,p:1});return `scrypt$${salt}$${key.toString('hex')}`;}
export async function verifyPassword(p,encoded){try{const [kind,salt,hex]=encoded.split('$');if(kind!=='scrypt')return false;const expected=Buffer.from(hex,'hex');const actual=await derive(p,salt,64,{N:16384,r:8,p:1});return expected.length===actual.length&&timingSafeEqual(expected,actual);}catch{return false;}}
export function safeEqual(a,b){const x=Buffer.from(digest(a)),y=Buffer.from(digest(b));return timingSafeEqual(x,y);}
