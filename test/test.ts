// SPDX-License-Identifier: CC0-1.0

import * as typesafeArray from "../src";
import assert from "assert";

assert(typesafeArray.any[0]({}));
assert(!typesafeArray.any[0](null));
assert(!typesafeArray.any[0](undefined));
assert(typesafeArray.any[1]([0, 1, "2", false, [], {}]));
assert(!typesafeArray.any[1]({ 0: 1, 1: 2, 2: 3, length: 3 }));
assert(typesafeArray.any[2]([[true], [false], [0]]));
assert(!typesafeArray.any[2]([0, [], {}, [], "foo"]));
assert(typesafeArray.any[3]([[[1], [2], [3]], [[[], [], []]]]));
assert(!typesafeArray.any[3]([[[]], [[]], { 0: {} }]));

assert(typesafeArray.bigint[0](BigInt("123456789")));
assert(typesafeArray.bigint[1]([BigInt(69), BigInt(420), BigInt(1337)]));
assert(!typesafeArray.bigint[1]("nice"));

assert(typesafeArray.boolean[0](true));
assert(typesafeArray.boolean[1]([true, true, false]));
assert(!typesafeArray.boolean[1]([1, 1, 0]));

assert(typesafeArray.number[0](123));
assert(typesafeArray.number[1]([0, 64, 125.25]));
assert(!typesafeArray.number[1](["6", "6", "6"]));

assert(typesafeArray.string[0]("foobar"));
assert(typesafeArray.string[1](["yee", "haw"]));
assert(!typesafeArray.string[1]([["c", "h", "a", "r"], ["a", "r", "r", "a", "y"]]));

assert(typesafeArray.object[0]({}));
assert(typesafeArray.object[1]([{}, [], new Date()]));
assert(!typesafeArray.object[1]({ 0: {}, 1: {}, length: 2 }));

assert(typesafeArray.instance[0](new Date(), Date));
assert(typesafeArray.instance[1]([assert], Function));
assert(!typesafeArray.instance[1](["^(.*)$"], RegExp));


assert(typesafeArray.number[1]([], true));
assert(typesafeArray.number[1]([0, 1, 2], false));
assert(!typesafeArray.number[1]([], false));

assert(typesafeArray.number[1]([0, 1, 2], undefined, false));
assert(!typesafeArray.number[1]([0, null, 2], undefined, false));
assert(typesafeArray.number[1]([0, 1, 2], undefined, true));
assert(typesafeArray.number[1]([0, null, 2], undefined, true));

assert(typesafeArray.number[1]([0, 1, 2], undefined, undefined, false));
assert(!typesafeArray.number[1]([0, undefined, 2], undefined, undefined, false));
assert(typesafeArray.number[1]([0, 1, 2], undefined, undefined, true));
assert(typesafeArray.number[1]([0, undefined, 2], undefined, undefined, true));
