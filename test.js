import test from 'ava';
import { listup, createPackageList } from './listup.js';

test('listup/all', t => {
    const result = listup('./package.json');
    const expected = {
        dependencies: ['child_process', 'command-line-args', 'nodeeasyfileio'],
        devDependencies: ['ava', 'c8', 'eslint', 'eslint-config-prettier', 'eslint-plugin-ava', 'prettier'],
    };
    t.deepEqual(result, expected);
});

test('listup/exclude/dependencies', t => {
    const result = listup('./package.json', 'nodeeasyfileio');
    const expected = {
        dependencies: ['child_process', 'command-line-args'],
        devDependencies: ['ava', 'c8', 'eslint', 'eslint-config-prettier', 'eslint-plugin-ava', 'prettier'],
    };
    t.deepEqual(result, expected);
});

test('listup/exclude/devDependencies', t => {
    const result = listup('./package.json', 'ava');
    const expected = {
        dependencies: ['child_process', 'command-line-args', 'nodeeasyfileio'],
        devDependencies: ['c8', 'eslint', 'eslint-config-prettier', 'eslint-plugin-ava', 'prettier'],
    };
    t.deepEqual(result, expected);
});

test('listup/exclude/double', t => {
    const result = listup('./package.json', 'child_process', 'eslint-plugin-ava');
    const expected = {
        dependencies: ['command-line-args', 'nodeeasyfileio'],
        devDependencies: ['ava', 'c8', 'eslint', 'eslint-config-prettier', 'prettier'],
    };
    t.deepEqual(result, expected);
});

test('createPackageList/all', t => {
    const dependencyInfo = listup('./package.json');
    const result = createPackageList(dependencyInfo, false, false);
    const expected = ['child_process', 'command-line-args', 'nodeeasyfileio', 'ava', 'c8', 'eslint', 'eslint-config-prettier', 'eslint-plugin-ava', 'prettier'];
    t.deepEqual(result, expected);
});

test('createPackageList/exclude/dependencies', t => {
    const dependencyInfo = listup('./package.json');
    const result = createPackageList(dependencyInfo, true, false);
    const expected = ['ava', 'c8', 'eslint', 'eslint-config-prettier', 'eslint-plugin-ava', 'prettier'];
    t.deepEqual(result, expected);
});

test('createPackageList/exclude/devDependencies', t => {
    const dependencyInfo = listup('./package.json');
    const result = createPackageList(dependencyInfo, false, true);
    const expected = ['child_process', 'command-line-args', 'nodeeasyfileio'];
    t.deepEqual(result, expected);
});
