# true-sheet-repro-dismiss-hidden

Minimal reproduction for `@lodev09/react-native-true-sheet` 4.0.0 on iOS: a sheet route
closed while its screen is covered by a push on an outer native stack gets stuck with
`closing: true`. When the screen comes back the sheet is presented again and can't be
dismissed.

## Layout

```
app/_layout.tsx            outer native <Stack>: (sheets) + pushed
app/(sheets)/_layout.tsx   <Sheet> navigator: index (base, anchor) + details (detents ['auto'])
app/(sheets)/index.tsx     "Open sheet"  -> router.push('/details')
app/(sheets)/details.tsx   "Push screen" -> router.push('/pushed'), "Close (router.back())"
app/pushed.tsx             "Close sheet via dismissTo('/')" -> router.dismissTo('/'), "Back"
```

The grey box on `index` and `pushed` prints the root navigation state (route names, nested
state in `[]`, and `closing` flags), so the stuck route is visible on screen.

## Run (iOS simulator)

```sh
npm install
npx expo prebuild --platform ios
npx expo run:ios
```

## Steps

1. Tap **Open sheet**. The `details` sheet is presented.
2. Tap **Push screen**. `pushed` is pushed on the outer stack and the sheet hides.
3. Tap **Close sheet via dismissTo('/')**. This pops `pushed` and navigates the `Sheet`
   navigator to its base route `index` in one state change.

**Expected:** the `details` route is removed. The base screen shows without the sheet.

**Actual:** the sheet is presented again over `index`. The readout shows
`details (closing: true)`, and Metro logs
`TrueSheet: sheet is already dismissed. No need to dismiss it again.`
**Close (router.back())** in the sheet does nothing: the route is already closing, so the
pop is a no-op. Only a user dismissal (swipe down or tap outside) gets rid of it, because
that is the first `onDidDismiss` the navigator receives.

## The fix

Branch `with-fix` applies the proposed fix to `ios/TrueSheetView.mm` through
[patch-package](https://github.com/ds300/patch-package)
(`patches/@lodev09+react-native-true-sheet+4.0.0.patch`, applied on `postinstall`).

To see the bug, check out `main` (stock 4.0.0, no patch). To toggle the fix:

```sh
git checkout with-fix           # or main for the bug
rm -rf node_modules && npm install   # applies the patch on with-fix
npx expo prebuild --platform ios
npx expo run:ios                # rebuild: the fix is native
```

With the fix, step 3 removes the `details` route and the sheet does not come back. The
normal path still works: Open sheet → Push screen → **Back** restores the sheet.

## Versions

- `@lodev09/react-native-true-sheet` 4.0.0
- `expo` 58.0.16, `expo-router` 58.0.24
- `react-native` 0.88.0 (New Architecture), `react` 19.3.0
- `react-native-screens` 4.30.0
- Xcode 27.1, iOS 27.0 simulator
