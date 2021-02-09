# Liverpool doc

# 0. Contact, participants and links

> 1. frontend developer: <br>
> <https://github.com/interhub> <br>
> Stepan Turchenko
> 2. backend developer: <br>
> <https://github.com/dmitrvk> <br>
> Dmitry Kalyukov
> 3. ... d

## Documentation link resources

- <a>[react doc](https://reactjs.org/docs/getting-started.html)</a>
- <a>[react native doc](https://reactnative.dev/docs/getting-started)</a>
- <a>[react navigation doc](https://reactnavigation.org/docs/getting-started/)</a>
- <a>[expo react native doc](https://docs.expo.io/)</a>
- <a>[react native firebase doc](https://rnfirebase.io/)</a>
- <a>[typescript doc](https://www.typescriptlang.org/docs/)</a>
- <a>[react native code push doc](https://github.com/microsoft/react-native-code-push/tree/master/docs)</a>
- <a>[react testing enzyme doc](https://enzymejs.github.io/enzyme/)</a>
- <a>[jest js testing doc](https://jestjs.io/docs/en/getting-started.html)</a>
- <a>[react native maps doc](https://github.com/react-native-maps/react-native-maps)</a>
- <a>[redux doc](https://redux.js.org/introduction/getting-started)</a>
- <a>[redux tool kit doc](https://redux-toolkit.js.org/introduction/quick-start)</a>
- <a>[formik doc](https://formik.org/)</a>  

# 1. NPM **command**

start develpe server
> npm run start:server  

<br>

remote code application update for all devices

> npm run codupush

<br>

run unit , integration and hooks testing

> npm run test

<br>

generate typedoc documentation

> npm run documentation:type

<br>

get full code for once file to word doc (google doc) from .tsx ext

> npm run documentation:word

<br>

# 2. File **tree** directory

* android - (android studio project for puilding apk and abb bundle)
* ios - (ios project xcode directory for publish to app store)
* README.md - (this documentation)
* App.tsx - (entry application point and providers)
* scr
  * api - (files server request and response tool)
  * components - (reusable application components)
  * config - (some global configuration for style / navigation / memoizing /animation)
  * font - (fonts for use in TextLine in all text and info)
  * hook - (reusable react hooks for change store state and loading app state and selectors)
  * img - (icons / images / background)
  * navigators - (react navigation navigators)
  * screen - (all application screens)
    * CartPage - (cart page before order payment)
    * DemoMenu - (screen for display menu before auth to start app. Added after ios access)
    * Login - (Start login application screen for phone input)
    * MapPage - (Map page for change address state or find user location)
    * Pay - (react navigation pay screen navigator screens)
      * PayInput - (input order info screen before payment)
      * PayProcess - (pay web page after confirm order)
      * PaySuccess - (screen after success payment from PaymentProcess)
    * ProductPage - (product item page detail info and recomendations)
    * Registr - (registration start application screen)
    * SalePage - (sale info web info from server promotions state detail)
    * SmsAuth - (sms access input code page for resending code and confirm code)
    * TabsProfile - (react navigation tabs custom navigator tabs)
      * HistoryTab - (left user loginned tabs for detail order history and it status)
      * MenuTab - (start loginned center tab for display accessed menu and promotions with animate header)
      * ProfileTab - (right user profile tab for change user info and logout)
  * selector - (reselect or redux tool kit selector)
  * store - (redux or redux tool kit config for store, state, reducer, actions)
  * test - (integration, unit, hook test and mocks)
  * tool - (global class for work to location/ notification / login and other state)
  * vars - (global constant values and application info and Cityes)

<br>

# 3. Publish to **store**

## app-store doc

- <https://reactnative.dev/docs/publishing-to-app-store>
  
## google play doc

- <https://reactnative.dev/docs/signed-apk-android>

<br>

# 4. Remote air "code push" update

## SDK configuration

- <https://docs.microsoft.com/en-us/appcenter/distribution/codepush/rn-api-ref>

## App status updates info . Service for configuration every air uptaes

- <https://appcenter.ms/>

## Mobile OS **air** update npm command

> npm run codepush:ios

> npm run codepush:android

> npm run codepush

```md
> npm run codepush
 command is equal
> npm run codepush:android && npm run codepush:ios
```

## Configuration info key file exist to path

### > ios

> ./ios/liverpool/info.plist  

```plist
<key>CodePushDeploymentKey</key>
<string>sNXAQWGOlq1eei2a6OKw81Y9yfDNS_HbyWHSO</string>
```

### > android

> ./android/app/scr/main/res/values/string.xml

```xml
  <string moduleConfig="true" name="CodePushDeploymentKey">NWQtuOTEmDqbXRVdiv5M_ay76U4xLXkIze47v</string>
```

<br>

## manual code push load app configuration

 > ./App.tsx

```ts
// App entry get app component code push HOC
//.... 

const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL, installMode: codePush.InstallMode.IMMEDIATE }
const codePushProvider = codePush(codePushOptions)(ProviderApp)

//add by info from https://github.com/microsoft/react-native-code-push/issues/647
codePush.notifyAppReady()
export default __DEV__ ? ProviderApp : codePushProvider
```

 > ./scr/hook/useCodePush.ts

```ts
//change splash screen state by expo-splash-screen doc
SplashScreen.preventAutoHideAsync()

onst useCodePush = () => {
 const syncCodePush = async (): Promise<boolean> => {
  return new Promise((ok) => {
   codePush.sync({ installMode: codePush.InstallMode.IMMEDIATE, },
    (status) => {
     switch (status) {
      case codePush.SyncStatus.UP_TO_DATE: SplashScreen.hideAsync(); return ok(true)
      case codePush.SyncStatus.UNKNOWN_ERROR: return ok(true)
     }
    },
    async (progress) => {
     if (progress.receivedBytes === progress.totalBytes) {
      setTimeout(ok, SLEEP_TIME, true)
     }
    })
  })
 }
 return { syncCodePush }
}
export default useCodePush
```

<br>

# 5. **Firebase** configuration

## firebase project **url**

- <https://console.firebase.google.com/project/liverpool-e2d58/settings/general/android:com.interhub.liverpool>

## **android** config file

- [/android/app/google-services.json](/android/app/google-services.json)

## **ios** config file

- [/ios/liverpool/GoogleService-Info.pist](/ios/liverpool/GoogleService-Info.pist)

## Firebase **SDK** configuration

- <https://rnfirebase.io/>
