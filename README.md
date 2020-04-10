# TypeSafe-Array #

[version_shield]: https://img.shields.io/badge/version-1.0.0-blue.svg
[latest_release]: https://github.com/mfederczuk/typesafe-array/releases/latest "Latest Release"
[![version: 1.0.0][version_shield]][latest_release]
[![Changelog](https://img.shields.io/badge/-Changelog-blue)](./CHANGELOG.md "Changelog")

## About ##

**JavaScript** functions to check types of arrays.

## Download ##

Using **npm**:

```sh
npm i typesafe-array
```

Using **Yarn**:

```sh
yarn add typesafe-array
```

## Examples ##

```typescript
import * as typesafeArray from "typesafe-array";

typesafeArray.number[1]([1, 2, 3]);   // true
typesafeArray.number[1]([1, "2", 3]); // false

typesafeArray.number[2]([[1, 2], [3, 4], [5, 6]]); // true
typesafeArray.number[2]([[1, 2], 3, [4, 5], 6]);   // false

typesafeArray.number[1]([]);        // true
typesafeArray.number[1]([], false); // false
```

## Contributing ##

Read through the [TypeSafe-Array Contribution Guidelines](./CONTRIBUTING.md)
 if you want to contribute to this project.

## License ##

[GNU GPLv3+](./LICENSE)
