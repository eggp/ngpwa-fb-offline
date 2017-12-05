// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: 'AIzaSyAKprkbWMpoCT300AeS6-niQoTeX5uwLFI',
    authDomain: 'ngpwa2.firebaseapp.com',
    databaseURL: 'https://ngpwa2.firebaseio.com',
    projectId: 'ngpwa2',
    storageBucket: 'ngpwa2.appspot.com',
    messagingSenderId: '262469553124'
  }
};
