import superagent from 'superagent';
import wrap from 'superagent-promise';

export default wrap(superagent, Promise);
