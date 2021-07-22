// import module here
// db model or js modules

/*
    GET /api/menu/menulist
*/

exports.getMenuList = (req, res) => {
  console.log('do something here');
  // respond to the client
  res.json({
    message: 'success',
  });
};

/*
    POST /api/menu/order
    {
        need specification
    }
*/

exports.postOrder = (req, res) => {
  console.log('do something here');
  // respond to the client
  res.json({
    message: 'success',
  });
};
