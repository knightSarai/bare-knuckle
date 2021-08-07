import cookie from 'cookie';

const cookieParser = req => cookie.parse(req?.headers.cookie ?? '');

export default cookieParser;