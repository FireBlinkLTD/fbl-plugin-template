# fbl-plugin-template

[![CircleCI](https://circleci.com/gh/FireBlinkLTD/generator-fbl-plugin.svg?style=svg)](https://circleci.com/gh/FireBlinkLTD/generator-fbl-plugin) [![Greenkeeper badge](https://badges.greenkeeper.io/FireBlinkLTD/fbl-plugin-template.svg)](https://greenkeeper.io/)

FireBlink Logistic's plugin project generator.

## Installation

First, install [FBL](https://www.npmjs.com/package/fbl).

```bash
npm install -g fbl
```

Then generate your new plugin project with:

```bash
fbl https://github.com/FireBlinkLTD/fbl-plugin-template/archive/master.tar.gz
```

You can also pass all the options into command itself to avoid answering prompts:

```bash
fbl \
 -a \$.ctx.name=plugin_name \
 -a \$.ctx.author=AuthorName \
 -a \$.ctx.license=MIT \ 
 -a \$.ctx.destination=/path/to/plugin_directory \
 https://github.com/FireBlinkLTD/fbl-plugin-template/archive/master.tar.gz
```
