import moment from 'moment';

const fs = window.top.require('fs');

export const opfHelper = {
    updateManifest(gamePath, tags) {
        const opfFilePath = `${gamePath}/EPUB/package.opf`;

        let data = fs.readFileSync(opfFilePath, 'utf-8');

        let override = '';
        let example = `<item id="[ID]" href="[HREF]" media-type="[TYPE]" />`;

        for (let i in tags) {
            let tag = tags[i];

            let item = example.replace('[ID]', tag.id);
            item = item.replace('[HREF]', tag.href);
            item = item.replace('[TYPE]', tag.type);

            override += item;
        }

        var content = data.replace('[MANIFEST_ITEMS]', override);

        fs.writeFileSync(opfFilePath, content, 'utf-8');
    },

    updateMetadata(gamePath, title) {
        const opfFilePath = `${gamePath}/EPUB/package.opf`;

        let data = fs.readFileSync(opfFilePath, 'utf-8');

        var content = data.replace('[GAME_NAME]', title);
        content = content.replace('[DATE]', moment().format('YYYY-MM-DD'));

        fs.writeFileSync(opfFilePath, content, 'utf-8');
    },
};
