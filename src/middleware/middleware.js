import thunk from 'redux-thunk';
import { applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

export const middleware = composeWithDevTools(applyMiddleware(thunk));
