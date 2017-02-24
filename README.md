Pancake
=======

> A tool to help the Gov.au UI-KIT installation through the npm ecosystem. Checking peerDependencies, writing compiled files and discovering new modules


## Content

* [What’s inside?](#whats-inside)
* [Requirements](#requirements)
* [Pancake](#pancake)
* [Batter](#batter)
* [Syrup](#syrup)
* [Cream](#cream)
* [Creating your own Pancake modules](#creating-your-own-pancake-modules)
* [Contributing](#contributing)
* [Taste / Tests](#taste--tests)
* [Release History](#release-history)
* [License](#license)


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## What’s inside?

![the Pancake tool](https://raw.githubusercontent.com/govau/pancake/master/assets/pancake.jpg)

This tool comes with three commands:
* [Batter](#batter)
* [Syrup](#syrup)
* [Cream](#cream)

> Pancakes needs batter. Can’t do no Pancakes without batter. This is essential!

**Batter** will check the peerDependencies of all installed Pancake modules for conflicts and error out with a meaningful error message.

> Eating Pancakes without Syrup is pretty dry. You could but it’s not really fun.

**Syrup** will compile all assets and give you options as to where you might want those assets.

> Putting cream on top makes this a sweet experience. This is why you want more.

**Cream** will present you with options to upgrade your existing Pancake project or to start a new one. All that while checking conflicts, communicating what
breaking changes might occur and what an easy way out might be.


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Requirements

- npm >= 3
- bash _(Windows is not supported at this time)_
- a `package.json` file in your root (run `yarn init` or `npm init`)

Pancake has been testing with Ubuntu 16.04, Mac OS 10.11, 10.12 all node version coming with npm 3 and higher:

- node `v5.0.0`
- node `v5.12.0`
- node `v6.9.5`
- node `v7.0.0`
- node `v7.4.0`
- node `v7.5.0`
- node `v7.6.0`

_Dependencies have been fixed to specific versions to keep the dependency tree and security impact as low as possible. We also ship a `yarn.lock` file._


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Pancake

![the batter command](https://raw.githubusercontent.com/govau/pancake/master/assets/pancake.png)

### batter
`batter`  
Type: `[command]`  

The root command will display the help.

```shell
pancake
```

You can also get help for each command.

```shell
pancake help batter
```


### settings
`-s`, `--set`  
Type: `<flag> [setting] [value]`  

Save new global settings. Available settings are:

|   setting   |                                 value                                 |
|-------------|-----------------------------------------------------------------------|
| `creamJson` | This is the [cream json](#the-json-file) with all your modules inside |
|   `npmOrg`  | This is the npm org scope                                             |

```shell
pancake --set npmOrg "@gov.au"
```


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Batter

![the batter command](https://raw.githubusercontent.com/govau/pancake/master/assets/batter.jpg)

### batter
`batter`  
Type: `[command]`  
Option: `<path>` _(optional) overwrite where to look for the `node_modules` folder_  
Default value: `The path to the nearest package.json on this folder or below`

To make sure all peerDependencies are resolved without conflicts this tool goes through your `node_modules` folder and reads each <sup>_(Only the ones
in scope)_</sup> `package.json` in search for a Pancake module. If it finds one, identified by the tag `pancake-module` and org scope `gov.au`
<sup>_(A [setting](#settings) you can change)_</sup>, it will record it’s peerDependencies and cross check against all other installed Pancake modules.

```shell
pancake batter
```

You can also pass it a path to the `node_modules` folder and overwrite the default:

```shell
pancake batter path/to/folder/of/your/project
```

Batter will also run [Syrup](#syrup) after a successful run.
You can change that behavior by adding `"uikit": { "auto-syrup": false }` into your package.json or run batter with the `--dry` flag.


### dry run
`-d`, `--dry`  
Type: `<flag>`  

Run batter without syrup.

```shell
pancake batter --dry
```


### overwrite npm org name
`-o`, `--org`  
Type: `<flag> [setting]`  

You can temporarily overwrite the npm org scope by suppling this flag. This can be useful for testing. Do make sure to use the [settings](#settings) for a
permanent change.

```shell
pancake batter --org @otherOrg
```


### verbose output
`-v`, `--verbose`  
Type: `<flag>`  

Run Pancake in verbose silly mode.

```shell
pancake batter --verbose
```


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Syrup

![the syrup command](https://raw.githubusercontent.com/govau/pancake/master/assets/syrup.jpg)

### syrup
`syrup`  
Type: `[command]`  
Option: `<path>` _(optional) overwrite where to look for the `node_modules` folder_  
Default value: `The path to the nearest package.json on this folder or below`

Syrup compiles your Pancake assets and writes them to disk. It comes with sane defaults that you can overwrite by adding the `pancake` object into your
`package.json`. All settings are automatically saved into your `package.json` file unless you supply the `--nosave` flag.

```shell
pancake syrup
```

Below are all possible settings with default values.

```js
{
	"name": "your-name",
	"version": "0.1.0",
	"uikit": {
		"auto-syrup": true,          //run syrup right after batter
		"auto-save": true,           //save all settings into your package.json
		"css": {
			"minified": true,          //minify your CSS output?
			"modules": false,          //save a css file per module?
			"browsers": [              //the browser support settings for autoprefixer
				"last 2 versions",
				"ie 8",
				"ie 9",
				"ie 10"
			],
			"location": "uikit/css/",  //path where to save those files, relative to your package.json
			"name": "uikit.min.css"    //name of your css file with all modules
		},
		"sass": {
			"modules": false,          //save a Sass file per module?
			"location": "uikit/sass/", //path where to save those files, relative to your package.json
			"name": "uikit.scss"       //name of the Sass file with all modules, set this to false if you don’t want the Sass files to be generated
		},
		"js": {
			"minified": true,          //minify js code?
			"modules": false,          //save a js file per module?
			"location": "uikit/js/",   //path where to save those files, relative to your package.json
			"name": "uikit.min.js"     //name of the js file with all modules
		}
	}
}
```


### don’t save to package.json
`-n`, `--nosave`  
Type: `<flag>`  

The command will stop Pancake from merging your local settings, complete them with the defaults and save them into your `package.json`.
This will sort-of shrink-wrap all settings in so you are completely reproducible.
You can also opt-out of this behavior by adding `"uikit": { "auto-save": false }` into your package.json.

```shell
pancake syrup --nosave
```


### overwrite npm org name
`-o`, `--org`  
Type: `<flag> [setting]`  

You can temporarily overwrite the npm org scope by suppling this flag. This can be useful for testing. Do make sure to use the [settings](#settings) for a
permanent change.

```shell
pancake batter --org @otherOrg
```


### verbose output
`-v`, `--verbose`  
Type: `<flag>`  

Run Pancake in verbose silly mode.

```shell
pancake syrup --verbose
```


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Cream

![the cream command](https://raw.githubusercontent.com/govau/pancake/master/assets/cream.jpg)

### cream
`cream`  
Type: `[command]`  
Option: `<path>` _(optional) overwrite where to look for the `node_modules` folder_  
Default value: `The path to the nearest package.json on this folder or`  below 

Cream will analyze your currently installed Pancake modules and show you in a user friendly interface what you can easily update and what update will entail
breaking changes.

```shell
pancake cream
```

### temporarily overwrite cream json
`-v`, `--verbose`  
Type: `<flag>`  
Default value: whatever is inside your `settings.json`

To overwrite the cream json global settings URL needed by cream type:

```shell
pancake cream --json https://you.domain/to/json/file.json
```

_Note: You can make this change on a global level by using the [set flag](#settings)._


### overwrite npm org name
`-o`, `--org`  
Type: `<flag> [setting]`  

You can temporarily overwrite the npm org scope by suppling this flag. This can be useful for testing. Do make sure to use the [settings](#settings) for a
permanent change.

```shell
pancake batter --org @otherOrg
```


### verbose output
`-v`, `--verbose`  
Type: `<flag>`  

Run Pancake in verbose silly mode.

```shell
pancake syrup --verbose
```


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Creating your own Pancake modules

💡 You can use Pancake with your own modules. All you have to do in your modules is:

1. keep a certain folder structure
2. add one or two keywords to your `package.json` file
3. add the Pancake script to your `package.json` file
4. publish a json file which contains all modules, versions and dependencies
5. and publish your module to npm.

### 1. Folder structure

```shell
.
├── CHANGELOG.md
├── LICENSE
├── README.md
├── lib                   # this is the folder that Pancake with look into to compile your assets
│   ├── js
│   │   └── module.js     # (optional) your javascript goes in this folder and must be named module.js
│   └── sass
│       ├── _globals.scss # you can have other Sass partials in this folder but make sure they are imported inside the _module.scss file
│       └── _module.scss  # your Sass partial goes in this folder and must be named _module.scss
└── package.json          # your package.json file holds some Pancake magic described below
```

### 2. Keywords

To make sure Pancake can detect your module amongst the other hundred npm packages you have to add the `pancake-module` keyword:

```shell
{
	"name": "your-module-name",
	"version": "1.0.0",
	"description": "Your description",
	"keywords": [
		"pancake-module",          # <------- This keyword
		"pancake-sass-versioning"  # <------- This keyword
	],
	"dependencies": {
		"@gov.au/pancake": "latest",
	},
	"peerDependencies": {},
	"devDependencies": {},
	"scripts": {
		"test": "echo \"Error: no test specified\" && exit 1"
	},
	"author": "",
	"license": "ISC"
}
```

You can also add the `pancake-sass-versioning` keyword to tell Pancake you are using [Sass-versioning](https://github.com/dominikwilkowski/sass-versioning)
with your module so it can add the `versioning-check();` function at the end of each generated Sass file.

### 3. The script

The magic of Pancake lies within the `postinstall` script. To enable Pancake add it as a dependency and add the script:

```shell
{
	"name": "your-module-name",
	"version": "1.0.0",
	"description": "Your description",
	"keywords": [
		"pancake-module",
		"pancake-sass-versioning"
	],
	"dependencies": {
		"@gov.au/pancake": "latest",  # <------- This dependency
	},
	"peerDependencies": {},
	"devDependencies": {},
	"scripts": {
		"postinstall": "pancake batter ../"  # <------- This script
	},
	"author": "",
	"license": "ISC"
}
```

This will run `batter` and `syrup` right after install and make sure Pancake is always up-to-date.
If you have to change settings (very likely) you don’t actually have to fork this project. You can set those settings globally before running it with your
`postinstall` script.

```shell
"postinstall": "pancake set creamJson \"https://yourjson.com\" && pancake set npmOrg \"yourOrg\" && pancake batter \"$(cd .. && npm prefix)\""
```

### 4. The json file

Pancake cream requires a json file to look up what you can install and compare it against what is installed. The format of that json file can be seen below.

```json
{
	"@gov.au/core": {
		"name": "@gov.au/breadcrumbs",
		"version": "1.0.2",
		"peerDependencies": {}
	},
	"@gov.au/body": {
		"name": "@gov.au/body",
		"version": "1.1.0",
		"peerDependencies": {
			"@gov.au/core": "^1.0.0"
		}
	},
	"@gov.au/button": {
		"name": "@gov.au/button",
		"version": "2.4.10",
		"peerDependencies": {
			"@gov.au/core": "^1.0.0",
			"@gov.au/body": "^1.1.0"
		}
	}
}
```

Make sure you [change the settings](#settings) for `creamJson` in Pancake to suit your module needs.

### 5. Publish

You’re ready to publish your modules and start using Pancake.


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Contributing

Hi there 👀,

❤️ We LOVE that you’re looking into this section. We welcome any feedback or pull requests and are super psyched about you putting your own time into this
project. To make your contribution count, have a read through the code first and see what our thinking was. We will do the same with yours.

To run the project install dependencies and devDependencies:

```shell
yarn
```

To run the transpiler watch that will transpile your ES2016 code into ES5:

```shell
yarn watch
```

❗️ Make sure you only edit file inside the `src/` folder. Files inside the `bin/` folder are overwritten by the transpiler.

_Please look at the coding style and work with it, not against it. 🌴_


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Taste / Tests

We have published three test modules in our scoped npm org to test interdependencies. Find below a list of what is inside each version:

**@gov.au/testmodule1**
- `v12.0.0`
- `v12.0.1`
- `v12.0.2`
- `v12.1.0`
- `v12.1.1`
- `v12.2.0`
- `v12.3.0`
- `v13.0.0`
- `v13.0.1`

**@gov.au/testmodule2**
- `v14.0.0`  
	- └── `@gov.au/testmodule1`: `^12.0.0`
- `v14.0.1`  
	- └── `@gov.au/testmodule1`: `^12.0.0`
- `v15.0.0`  
	- └── `@gov.au/testmodule1`: `^13.0.0`
- `v16.0.0`  
	- └── `@gov.au/testmodule1`: `^13.0.0`
- `v17.0.0`  
	- └── `@gov.au/testmodule1`: `^13.0.1`

**@gov.au/testmodule3**
- `v12.0.0`  
	- ├── `@gov.au/testmodule1`: `^12.0.0`
	- └── `@gov.au/testmodule2`: `^14.0.0`
- `v12.0.1`  
	- ├── `@gov.au/testmodule1`: `^12.1.0`
	- └── `@gov.au/testmodule2`: `^14.0.0`
- `v12.0.2`  
	- ├── `@gov.au/testmodule1`: `^12.2.0`
	- └── `@gov.au/testmodule2`: `^14.0.1`
- `v12.1.0`  
	- ├── `@gov.au/testmodule1`: `^12.3.0`
	- └── `@gov.au/testmodule2`: `^14.0.1`
- `v13.0.1`  
	- ├── `@gov.au/testmodule1`: `^13.0.1`
	- └── `@gov.au/testmodule2`: `^17.0.0`

Pancake comes with automated end-to-end test that are run via the test command.

```shell
yarn test
```

[The script](https://github.com/govau/pancake/blob/develop/tests/tester.js) will take a number of scenarios and compare the output of pancake against fixtures.

_(We will be adding unit tests as we progress.)_


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## Release History

* v0.1.0 - First Pancake
* v0.0.X - Pre-releases of unstable, undercooked Pancakes


**[⬆ back to top](#content)**


----------------------------------------------------------------------------------------------------------------------------------------------------------------


## License

Copyright (c) Commonwealth of Australia. Licensed under the [MIT](https://raw.githubusercontent.com/AusDTO/uikit-pancake/master/LICENSE).


**[⬆ back to top](#content)**


# };
