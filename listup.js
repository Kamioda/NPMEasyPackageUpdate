import { readJson } from 'nodeeasyfileio';

/**
 * list up dependencies
 * @param {string} packageJsonPath
 * @param  {...string} exclude
 * @returns {{dependencies: string[], devDependencies: string[]}}
 */
export function listup(packageJsonPath, ...exclude) {
    const packageJson = readJson(packageJsonPath);
    const dependencies = Object.keys(packageJson.dependencies);
    const devDependencies = Object.keys(packageJson.devDependencies);
    return {
        dependencies: exclude.length === 0 ? dependencies : dependencies.filter(dep => !exclude.includes(dep)),
        devDependencies: exclude.length === 0 ? devDependencies : devDependencies.filter(dep => !exclude.includes(dep)),
    };
}

/**
 * 
 * @param {{dependencies: string[], devDependencies: string[]}} packages 
 * @param {boolean} excludeDependencies 
 * @param {boolean} excludeDevDependencies 
 * @returns 
 */

export function createPackageList(packages, excludeDependencies, excludeDevDependencies) {
    const list = [];
    if (!excludeDependencies) list.push(...packages.dependencies);
    if (!excludeDevDependencies) list.push(...packages.devDependencies);
    return list;
}