import commandLineArgs from 'command-line-args';
import { listup, createPackageList } from './listup.js';
import { exec } from 'child_process';

const argOptions = [
    { name: 'exclude', type: String, multiple: true, defaultOption: false },
    { name: 'exclude-dependencies', type: Boolean, multiple: false, defaultValue: false },
    { name: 'exclude-dev-dependencies', type: Boolean, multiple: false, defaultValue: false },
    { name: 'src', type: String, multiple: false, defaultOption: true, defaultValue: './package.json' }
];

const options = commandLineArgs(argOptions);
const updateIgnores = listup(options.src, ...options.exclude);
const list = createPackageList(updateIgnores, options['exclude-dependencies'], options['exclude-dev-dependencies']);

const commandArg = list.join(' ');
exec('npm install ' + commandArg, (error, stdout, stderr) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(stdout);
});
