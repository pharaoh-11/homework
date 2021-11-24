const controllers = require('./controllers');

module.exports = async (req, res) => {
  const { pathname, method } = req;

  if (pathname === '/' && method === 'GET') return controllers.home(req, res);
  if (pathname === '/filter' && method === 'GET')
    return controllers.getFilter(req, res);
  if (pathname === '/filter' && method === 'POST')
    return controllers.postFilter(req, res);
  if (pathname === '/topprice' && method === 'GET')
    return controllers.topPrice(req, res);
  if (pathname === '/topprice' && method === 'POST')
    return controllers.postTopPrice(req, res);
  if (pathname === '/commonprice' && method === 'GET')
    return controllers.commonPrice(req, res);
  if (pathname === '/commonprice' && method === 'POST')
    return controllers.postCommonPrice(req, res);
  if (pathname === '/data' && method === 'POST')
    return controllers.writeData(req, res);
  if (pathname.includes('/discount') && method === 'GET') {
    if (pathname.endsWith('/promise'))
      return controllers.getDiscountPromise(req, res);
    if (pathname.endsWith('/promisify'))
      return controllers.getDiscountPromisify(req, res);
    if (pathname.endsWith('/async'))
      return controllers.getDiscountAsync(req, res);
    if (pathname.endsWith('/callback'))
      return controllers.getDiscountCallback(req, res);
  }
  if (pathname.includes('/discount') && method === 'POST') {
    if (pathname.endsWith('/promise'))
      return controllers.postDiscountPromise(req, res);
    if (pathname.endsWith('/promisify'))
      return controllers.postDiscountPromisify(req, res);
    if (pathname.endsWith('/async'))
      return controllers.postDiscountAsync(req, res);
  }

  return controllers.notFound(req, res);
};
