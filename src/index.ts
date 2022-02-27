/*
 * Copyright (c) 2020 Michael Federczuk
 * SPDX-License-Identifier: MPL-2.0 AND Apache-2.0
 */

import { deepFreeze } from "@mfederczuk/deeptools";

const DEFAULT_ALLOW_EMPTY = true;
const DEFAULT_ALLOW_NULL = false;
const DEFAULT_ALLOW_UNDEFINED = false;

function isArray(obj: unknown, allowEmpty?: boolean): obj is unknown[] {
	if(typeof(allowEmpty) !== "boolean") allowEmpty = DEFAULT_ALLOW_EMPTY;
	return obj instanceof Array && (allowEmpty || obj.length > 0);
}

class CustomTypeChecker {
	constructor() {
		deepFreeze(this);
	}

	0<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>);
	0<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null);
	0<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined);
	0<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined);
	0<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, _allowEmpty?: boolean,             allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined) {
		if(typeof(allowNull) !== "boolean") allowNull = DEFAULT_ALLOW_NULL;
		if(typeof(allowUndefined) !== "boolean") allowUndefined = DEFAULT_ALLOW_UNDEFINED;
		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		if(typeof(checker) !== "function") checker = (obj: unknown): obj is T => (false);

		if(obj === null) return allowNull;
		if(typeof(obj) === "undefined") return allowUndefined;
		return checker(obj);
	}

	1<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[];
	1<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[];
	1<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[];
	1<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[];
	1<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[] {
		return isArray(obj, allowEmpty) && obj.every((item) => {
			return this[0](item, checker, allowEmpty, allowNull as never, allowUndefined as never);
		});
	}

	2<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[][];
	2<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[][];
	2<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[][];
	2<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[][];
	2<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[][] {
		return isArray(obj, allowEmpty) && obj.every((item) => {
			return this[1](item, checker, allowEmpty, allowNull as never, allowUndefined as never);
		});
	}

	3<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[][][];
	3<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[][][];
	3<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[][][];
	3<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[][][];
	3<T>(obj: unknown, checker: (obj: NonNullable<unknown>) => obj is T, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[][][] {
		return isArray(obj, allowEmpty) && obj.every((item) => {
			return this[2](item, checker, allowEmpty, allowNull as never, allowUndefined as never);
		});
	}
}
deepFreeze(CustomTypeChecker);
const customTypeChecker = new CustomTypeChecker();

class SimpleTypeChecker<T> {
	constructor(private readonly checker: (obj: unknown) => obj is T) {
		deepFreeze(this);
	}

	0(obj: unknown, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>);
	0(obj: unknown, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null);
	0(obj: unknown, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined);
	0(obj: unknown, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined);
	0(obj: unknown, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined) {
		return customTypeChecker[0](obj, this.checker, allowEmpty, allowNull as never, allowUndefined as never);
	}

	1(obj: unknown, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[];
	1(obj: unknown, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[];
	1(obj: unknown, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[];
	1(obj: unknown, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[];
	1(obj: unknown, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[] {
		return customTypeChecker[1](obj, this.checker, allowEmpty, allowNull as never, allowUndefined as never);
	}

	2(obj: unknown, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[][];
	2(obj: unknown, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[][];
	2(obj: unknown, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[][];
	2(obj: unknown, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[][];
	2(obj: unknown, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[][] {
		return customTypeChecker[2](obj, this.checker, allowEmpty, allowNull as never, allowUndefined as never);
	}

	3(obj: unknown, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[][][];
	3(obj: unknown, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[][][];
	3(obj: unknown, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[][][];
	3(obj: unknown, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[][][];
	3(obj: unknown, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[][][] {
		return customTypeChecker[3](obj, this.checker, allowEmpty, allowNull as never, allowUndefined as never);
	}
}
deepFreeze(SimpleTypeChecker);

class InstanceTypeChecker {
	constructor() {
		deepFreeze(this);
	}

	0<T extends Function>(obj: unknown, constructor: T, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>);
	0<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null);
	0<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined);
	0<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined);
	0<T extends Function>(obj: unknown, constructor: T, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined) {
		return customTypeChecker[0](obj, (obj): obj is T => {
			return obj instanceof constructor;
		}, allowEmpty, allowNull as never, allowUndefined as never);
	}

	1<T extends Function>(obj: unknown, constructor: T, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[];
	1<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[];
	1<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[];
	1<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[];
	1<T extends Function>(obj: unknown, constructor: T, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[] {
		return customTypeChecker[1](obj, (obj): obj is T => {
			return obj instanceof constructor;
		}, allowEmpty, allowNull as never, allowUndefined as never);
	}

	2<T extends Function>(obj: unknown, constructor: T, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[][];
	2<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[][];
	2<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[][];
	2<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[][];
	2<T extends Function>(obj: unknown, constructor: T, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[][] {
		return customTypeChecker[2](obj, (obj): obj is T => {
			return obj instanceof constructor;
		}, allowEmpty, allowNull as never, allowUndefined as never);
	}

	3<T extends Function>(obj: unknown, constructor: T, allowEmpty?: boolean,              allowNull?: false,              allowUndefined?: false):   obj is (NonNullable<T>)[][][];
	3<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined?: false):   obj is (Exclude<T, undefined> | null)[][][];
	3<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: (false | undefined), allowUndefined: true):     obj is (Exclude<T, null> | undefined)[][][];
	3<T extends Function>(obj: unknown, constructor: T, allowEmpty: (boolean | undefined), allowNull: true,                allowUndefined: true):     obj is (T | null | undefined)[][][];
	3<T extends Function>(obj: unknown, constructor: T, allowEmpty?: boolean,              allowNull?: boolean,            allowUndefined?: boolean): obj is (T | null | undefined)[][][] {
		return customTypeChecker[3](obj, (obj): obj is T => {
			return obj instanceof constructor;
		}, allowEmpty, allowNull as never, allowUndefined as never);
	}
}
deepFreeze(InstanceTypeChecker);



export const custom = customTypeChecker;

// eslint-disable-next-line @typescript-eslint/no-unused-vars,@typescript-eslint/no-explicit-any
export const any = new SimpleTypeChecker((obj): obj is any => (true));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const unknown = new SimpleTypeChecker((obj): obj is unknown => (true));

export const bigint = new SimpleTypeChecker((obj): obj is bigint => {
	return typeof(obj) === "bigint";
});

export const boolean = new SimpleTypeChecker((obj): obj is boolean => {
	return typeof(obj) === "boolean";
});

export const number = new SimpleTypeChecker((obj): obj is number => {
	return typeof(obj) === "number";
});

export const string = new SimpleTypeChecker((obj): obj is string => {
	return typeof(obj) === "string";
});

export const symbol = new SimpleTypeChecker((obj): obj is symbol => {
	return typeof(obj) === "symbol";
});

export const object = new SimpleTypeChecker((obj): obj is object => {
	return typeof(obj) === "object";
});

export const instance = new InstanceTypeChecker();
