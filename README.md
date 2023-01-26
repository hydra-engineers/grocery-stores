# Grocery Stores
One api wrapper for multiple grocery stores. Delivering data within a standard format.

## About
This repository contains a api wrapper for multiple grocery stores. Currently only supporting apis of dutch grocery stores. The core structure of the code is based on the api wrappers that are made and maintained by [@RinseV](https://github.com/RinseV). These api wrappers are currently migrated into a single repository We are currently only supporting 5 different api's of dutch grocery stores (because of the 5 wrappes mady by [@RinseV](https://github.com/RinseV)), which will be expanded to support more api's of grocery stores once our first stable release is out.

## Beta Release
The migration of the wrappers is completed this means that we moved to the first beta release 🥳. With this being said i'll list some things that we start working on while where in beta and i'll list some things where planning to build after the a stable v1 is release.

### Before Stable Release
- global
	- [ ] New and migrated test cases to patch a bigger chunk of bugs that probably exist right now, this is done so were able to move to the first stable release.
	- [ ] Optimizing and adding more generic classes so we are able to easly add more api's to the project.
- core
	- [ ] Rework the core structure, which will also be done for implementing a couple of new but necessary features which are listed below this bullet point
	- [ ] EventEmitter Implementation
	- [ ] Request Caching
	- [ ] Response Data Transformer

### After Stable Release
- core
	- [ ] Web Crawler
	- [ ] Web Scraper
	- [ ] Databases
		- [ ] SQL
		- [ ] MongoDB
		- [ ] Directus

## Supported API's and stores
We currently only support stores from The Netherlands.

| # | Country | Company      | Tests | Stability | Pass % | Fail % |
|:--|:--------|:-------------|:------|:---------:|-------:|-------:|
| 1 | nl      | Albert Heijn | none  | unstable  |     0% |     0% |
| 2 | nl      | Aldi         | none  | unstable  |     0% |     0% |
| 3 | nl      | Coop         | none  | unstable  |     0% |     0% |
| 4 | nl      | Jumbo        | none  | unstable  |     0% |     0% |
| 5 | nl      | Plus         | none  | unstable  |     0% |     0% |

## Licenses
This project is licensed under the MIT & GPL Licenses.

### MIT License
> **Note**: Look at the [MIT License](./LICENSE-MIT) file for more details about your limitations when contiributed.

Because of the fact that the code is migrated and based on the 5 api wrappers created and maintained by [@RinseV](https://github.com/RinseV), which are licensed under the MIT License. We added a MIT License which is properly licensed with [@RinseV](https://github.com/RinseV) as the author.

### GPL License
> **Note**: Look at the [GPL License](./LICENSE-GPL) file for more details about your limitations when contiributed.

This project is also licensed under the GPL License. For the code that is written by all the maintainers and contributors of this project.
