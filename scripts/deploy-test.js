import request from './utils/superagent';

const {SC_API: apiKey} = process.env;
const authorization = new Buffer(`${apiKey}:x`).toString('base64');
const options = {
  Accept: 'application/json',
  authorization: `Basic ${authorization}`,
  'accept-encoding': 'gzip,deflate'
};

const {argv} = process;
const noteI = argv.indexOf('-n') || argv.indexOf('--note');
let [note] = noteI > -1 ? argv.slice(noteI + 1, noteI + 2) : [];

if (!note) {
  const {TRAVIS_BRANCH, TRAVIS_COMMIT} = process.env;

  if (TRAVIS_BRANCH && TRAVIS_COMMIT) {
    note = `testing in CI ${TRAVIS_BRANCH}_${TRAVIS_COMMIT}`;
  } else {
    throw new Error('Please supply a note');
  }
} else {
  note = `testing locally ${note}`;
}

console.log(`*Found Note: ${note}*`);

const sites = request
  .get('https://api.speedcurve.com/v1/sites')
  .set(options);

const notes = request
  .get(`https://api.speedcurve.com/v1/notes`)
  .set(options);;

Promise.all([sites, notes]).then((data) => {
  const [sites, notes] = data.map(({body}) => body);
  const name = 'dfp-gh-pages';
  const [site] = sites.sites.filter(site => site.name === name);
  let prom;

  if (site) {
    const {site_id: siteId} = site;
    const [sameNote] = notes.notes.filter(noteData => {
      return noteData.site_id === siteId && noteData.note === note;
    });

    if (sameNote) {
      prom = Promise.reject(`Site with name: ${name} and id: ${siteId} found with same note: ${note}`);
    } else {
      prom = request
        .post('https://api.speedcurve.com/v1/deploy')
        .set(options)
        .send({
          site_id: siteId,
          note
        });
    }
  } else {
    prom = Promise.reject(`No site found with name: ${name}`);
  }

  return prom
}).then(({body}) => {
  console.log('**SUCCESS**', body);
}).catch((err) => {
  console.log('**FAIL**', err.response.body);
});
