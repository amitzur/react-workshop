import { observable, action, runInAction } from 'mobx';
import { getSmurfs } from '../services/smurf-service';
import Smurfs from './Smurfs';
import Drag from './Drag';

class AppStore {
  smurfsStore;
  dragStore;
  @observable loading = true;
  @observable width = 300;

  constructor() {
    this.smurfsStore = new Smurfs();
    this.dragStore = new Drag(this);

    getSmurfs().then(smurfs => runInAction(() => {
      this.smurfsStore.setSmurfs(smurfs);
      this.loading = false;
    }));
  }

  @action setWidth = (width) => {
    this.width = width;
  };

  @action startDrag = (e) => {
    this.dragStore.onDragStart(e);
  }
}

export default AppStore;