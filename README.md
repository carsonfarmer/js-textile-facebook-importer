js-textile-facebook-importer
============================

Simple cli tool to import facebook json data dump into Textile

[![oclif](https://img.shields.io/badge/cli-oclif-brightgreen.svg)](https://oclif.io)
[![License](https://img.shields.io/github/license/carsonfarmer/js-textile-facebook-importer)](https://github.com/carsonfarmer/js-textile-facebook-importer/blob/master/LICENSE)

# Install

You'll need to `clone` and `install` (and if you want to use the nice cli tool, you'll also want to `link`):

```
git clone git@github.com:carsonfarmer/js-textile-facebook-importer.git
cd js-textile-facebook-importer
npm install
npm link
```

You'll also have to have a Textile `daemon` installed, see [these instructions](https://docs.textile.io/install/the-daemon/) for details. Alternatively, you should be able to:

```
npm install -g @textile/go-textile
```

# Usage

Once you have installed the tool and the Textile daemon, usage is pretty simple:

```
Import a facebook json data dump into Textile

USAGE
  $ txtl-import ZIP

ARGUMENTS
  ZIP  Zip file to process

OPTIONS
  -h, --help     show CLI help
  -v, --version  show CLI version

DESCRIPTION
  You must first 'Download a copy of your Facebook data' in JSON format.
  Next, make sure you have your Textile daemon running (textile daemon).
  Finally, point this cli tool at your zip file, and let it do the rest!
```
