// Separate local OIDC provider for repeatable demonstrations. Not Google.
import Provider from 'oidc-provider';
const issuer=process.env.OIDC_ISSUER||'http://localhost:3001';
const provider=new Provider(issuer,{clients:[{client_id:process.env.OIDC_CLIENT_ID||'accounts-local',redirect_uris:[(process.env.APP_URL||'http://localhost:3000')+'/auth/callback'],response_types:['code'],grant_types:['authorization_code'],token_endpoint_auth_method:'none'}],claims:{openid:['sub'],email:['email','email_verified'],profile:['name']},pkce:{required:()=>true},async findAccount(ctx,id){return {accountId:id,async claims(){return {sub:id,email:'oidc.ivanka@example.test',email_verified:true,name:'Іванна · OIDC'};}};}});
provider.listen(3001,'0.0.0.0',()=>console.log('LOCAL TEST OIDC provider: '+issuer));
