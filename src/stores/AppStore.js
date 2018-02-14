import { observable, action } from 'mobx';
import { getSmurfs } from '../services/smurf-service';
import Smurfs from './Smurfs';
import Drag from '../drag';

class AppStore {
  smurfsStore;
  dragStore;
  @observable width = 300;

  constructor() {
    this.smurfsStore = new Smurfs();
    this.dragStore = new Drag(this);

    getSmurfs().then(smurfs => {
      this.smurfsStore.setSmurfs(smurfs);
    });
  }

  @action setWidth = (width) => {
    this.width = width;
  };

  @action startDrag = (e) => {
    this.dragStore.onDragStart(e);
  }
}

export default AppStore;