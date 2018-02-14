import { observable, action, runInAction, computed } from 'mobx';
import Smurf from './Smurf';
import { deleteSmurfs } from '../services/smurf-service';

class Smurfs {
  @observable smurfs = [];
  @observable activeItem;
  @observable selectedItems = [];
  @observable isEditMode;
  @observable deleting;
  @observable filter;

  @action setSmurfs(smurfs) {
    this.smurfs = smurfs.map(smurf => new Smurf(smurf));
  }

  @action onItemClick = (item) => {
    const newSmurfs = this.smurfs.slice();
    newSmurfs.splice(newSmurfs.indexOf(item), 1, {...item, isRead: true});

    this.activeItem = item;
    this.smurfs = newSmurfs;
  };

  @action onSelectItem = (item, isSelected) => {
    let selectedItems;
    if (isSelected) {
      selectedItems = this.selectedItems.concat(item);
    } else {
      selectedItems = this.selectedItems.filter(item2 => item2.name !== item.name);
    }

    this.selectedItems = selectedItems;
  };

  @action onEdit = () => {
    this.isEditMode = !this.isEditMode;
  };

  @action onDelete = () => {
    const { smurfs, selectedItems } = this;
    this.deleting = true;

    deleteSmurfs(selectedItems).then(runInAction(() => {
      this.smurfs = smurfs.filter(item => !selectedItems.find(item2 => item2.name === item.name));
      this.isEditMode = false;
      this.selectedItems = [];
      this.deleting = false;
    }));
  };

  @action onFilterChange = (filter) => {
    this.filter = filter;
  };

  @computed
  get canDelete() {
    return this.selectedItems.length > 0;
  }

  @computed
  get filteredSmurfs() {
    if (!this.filter) return this.smurfs;

    const regex = new RegExp(this.filter, "i");

    return this.smurfs.map(item => Object.assign({}, item, {
      match: item.name.match(regex)
    })).filter(item => item.match);
  }

  @computed
  get isDeleteDisabled() {
    return !this.isEditMode || !this.canDelete;
  }

  @computed
  get deleteTooltip() {
    return this.isDeleteDisabled ? "Please select a smurf in order to delete" : '';
  }
}

export default Smurfs;