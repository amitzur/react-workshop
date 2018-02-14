import { observable } from 'mobx';

class Smurf {
  @observable name;
  @observable src;
  @observable desc;

  constructor(data) {
    this.name = data.name;
    this.src = data.src;
    this.desc = data.desc;
  }
}

export default Smurf;