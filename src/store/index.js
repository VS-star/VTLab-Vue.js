import { createStore } from 'vuex';

import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';

export default createStore({
  modules: {
    alert,
    authentication,
    users,
  },
});
