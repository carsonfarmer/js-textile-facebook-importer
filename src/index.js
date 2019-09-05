const {Command, flags} = require('@oclif/command')
var JSZip = require('jszip')
var fs = require('fs')
var textile = require('@textile/js-http-client').default
var uuid = require('uuid/v4')

function main(path) {
  fs.readFile(path, async function (err, data) {
    if (err) throw err
    const media = await textile.schemas.defaultByName('media')
    const zip = await JSZip.loadAsync(data)
    zip.folder('photos_and_videos').folder('album').forEach(async (relativePath, file) => {
      if (file.name.endsWith('.json')) {
        const doc = await file.async('text')
        const album = JSON.parse(doc)
        const name = album.name
        const photos = album.photos
        const key = `textile_photos-shared-${uuid()}`
        const thread = await textile.threads.add(name, media, key, 'open', 'shared')
        photos.forEach(async photo => {
          const file = zip.file(photo.uri)
          const data = await file.async('nodebuffer')
          try {
            const added = await textile.files.add(data, photo.description || '', thread.id)
            if (photo.comments) {
              [...photo.comments].reverse().forEach(comment => {
                textile.comments.add(added.block, `${comment.author}: ${comment.comment}`)
              })
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(error.toString())
          }
        })
      }
    })
  })
}

class JsTextileFacebookImporterCommand extends Command {
  async run() {
    const {args} = this.parse(JsTextileFacebookImporterCommand)
    const path = args.zip
    this.log(`processing ${path}`)
    main(path)
  }
}

JsTextileFacebookImporterCommand.description = `Import a facebook json data dump into Textile
You must first 'Download a copy of your Facebook data' in JSON format.
Next, make sure you have your Textile daemon running (textile daemon).
Finally, point this cli tool at your zip file, and let it do the rest!
`

JsTextileFacebookImporterCommand.args = [
  {
    name: 'zip',
    required: true,
    description: 'Zip file to process',
  },
]

JsTextileFacebookImporterCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
}

module.exports = JsTextileFacebookImporterCommand
