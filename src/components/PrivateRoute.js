/*eslint-disable no-unused-vars*/
import { BrowserRouter as Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authed, path, ...rest }) => {
  if (authed === true) {
    return (
      <Route path={path}>
        <Component {...rest} />
      </Route>
    );
  } else {
    return (
      <Redirect
        to={{
          pathname: '/login',
          state: { errorMessage: 'Please login first' },
        }}
      />
    );
  }
};
/*eslint-enable no-unused-vars*/

export default PrivateRoute;
