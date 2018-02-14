import { action } from 'mobx';

class Drag {
	startX;
	startWidth;
	store;

	constructor(store) {
		this.store = store;
	}

	@action onDragStart = (e) => {
    this.startX = e.pageX;
    this.startWidth = this.store.width;
    document.addEventListener("mousemove", this.onDragMove);
    document.addEventListener("mouseup", this.onDragEnd);
	};

	@action onDragMove = (e) => {
    this.store.setWidth(this.startWidth + e.pageX - this.startX);
	};

	@action onDragEnd = (e) => {
    document.removeEventListener("mousemove", this.onDragMove);
    document.removeEventListener("mouseup", this.onDragEnd);
	}
}

export default Drag;