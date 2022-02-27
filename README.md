<!--
  Copyright (c) 2022 Michael Federczuk
  SPDX-License-Identifier: CC-BY-SA-4.0
-->

# TypeSafe-Array #

[version_shield]: https://img.shields.io/badge/version-v1.1.0-informational.svg
[release_page]: https://github.com/mfederczuk/typesafe-array-js/releases/tag/v1.1.0 "Release v1.1.0"
[![version: v1.1.0][version_shield]][release_page]
[![Changelog](https://img.shields.io/badge/-Changelog-informational.svg)](CHANGELOG.md "Changelog")

## About ##

**JavaScript** functions to check types of arrays.

## Usage ##

First of all, import/require the package.

```typescript
import * as typesafeArray from "typesafe-array";
```

```javascript
const typesafeArray = require('typesafe-array');
```

Then select the type to check for.

```typescript
typesafeArray.number;
typesafeArray.string;
typesafeArray.object;
```

The following types can be checked for:

* `custom`
* `any`
* `unknown` - use this instead of `any` when using **TypeScript**
* `bigint`
* `boolean`
* `number`
* `string`
* `object`
* `instance`

Then select how many dimensions the array should have.  
Currently, dimensions 0 - 3 are supported.

```typescript
typesafeArray.number[1];
typesafeArray.number[2];
```

Then pass your object.

```typescript
typesafeArray.number[1]([1, 2, 3]); // true
typesafeArray.string[1]([1, 2, 3]); // false
```

By default, empty arrays will always pass the test, the next optional parameter
 can turn this off.

```typescript
typesafeArray.number[1]([] /* , true */ ); // true
typesafeArray.number[1]([], false       ); // false
```

The next two optional parameters are there to allow `null` and `undefined`
 values, both are not allowed by default.

```typescript
typesafeArray.number[1]([1, null,      3], undefined /* , false */            ); // false
typesafeArray.number[1]([1, undefined, 3], undefined /* , undefined, false */ ); // false
typesafeArray.number[1]([1, null,      3], undefined, true                    ); // true
typesafeArray.number[1]([1, undefined, 3], undefined, undefined, true         ); // true
```

### Custom and Instance Types ###

The types `custom` and `instance` work a little bit different.

The `custom` type needs an extra parameter after the value that must be a
 function that returns a boolean value.  
This function will be passed the object to check.

```typescript
// leave out all the type stuff when you're using JavaScript

interface X {
	foobar: string;
}

const checker = (obj: unknown): obj is X => {
	return typeof(obj) === "object" &&
	       typeof((obj as X).foobar) === "string";
};

const obj1 = {
	foobar: "yeehaw"
};
const obj2 = {
	foobar: 42069
};

typesafeArray.custom[1]([obj1], checker); // true
typesafeArray.custom[1]([obj2], checker); // false
```

The passed object will never be `null` or `undefined`.

The `instance` type also needs an extra parameter, but instead of a function
 that manually checks the type of the object, it must be a constructor function.  
Things like `RegExp`, `Date`, `Map`.

```typescript
typesafeArray.instance[1]([/^(.*)$/,   /^.$/       ], RegExp); // true
typesafeArray.instance[1]([new Date(), "2001-05-17"], Date);   // false
```

The optional parameters to allow/disallow empty arrays, `null` and `undefined`
 values are also available for both `custom` and `undefined`.

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

## Installation ##

Using **npm**:

```sh
npm i typesafe-array
```

Using **Yarn**:

```sh
yarn add typesafe-array
```

## Contributing ##

Read through the [Contribution Guidelines](CONTRIBUTING.md) if you want to contribute to this project.

## License ##

**TypeSafe-Array** is licensed under both the [**Mozilla Public License 2.0**](LICENSES/MPL-2.0.txt) AND the
[**Apache License 2.0**](LICENSES/Apache-2.0.txt).  
For more information about copying and licensing, see the [`COPYING.txt`](COPYING.txt) file.
