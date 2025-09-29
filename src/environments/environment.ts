// src/environments/environment.ts
export const environment = {
  production: false,
  obp: {
    baseUrl: 'https://apisandbox.openbankproject.com',
    apiVersion: 'v5.1.0',                 // pode manter assim
    consumerKey: 'COLOQUE_SUA_CONSUMER_KEY',
    username: 'SEU_USUARIO',
    password: 'SUA_SENHA',
    bankId:   'SEU_BANK_ID',              // ex.: 'gh.29.uk' ou outro do sandbox
    accountId:'SEU_ACCOUNT_ID',           // id de conta do sandbox
    viewId:   'owner',                    // 'owner' funciona no sandbox para ver transações
  }
};
