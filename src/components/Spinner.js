import React from 'react';
import { generate } from 'shortid';

const keyframes = (id, radius) => {
  const offset = Math.round(2 * Math.PI * radius);
  return `@keyframes dash-${id} {
    0% { stroke-dashoffset: ${offset}; }
    50% {
      stroke-dashoffset: ${offset / 4};
      transform:rotate(135deg);
    }
    100% {
      stroke-dashoffset: ${offset};
      transform:rotate(450deg);
    }
  }`;
};

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
    const size = this.size = this.props.size || (this.props.small ? 32 : 66);
    this.radius = (size - 6) / 2;
    this.stroke = size > 40 ? 6 : size > 20 ? 3 : 2;
    this.duration = size > 40 ? '1.4s' : size > 20 ? '1.7s' : '2s';
    this.id = generate();
    this.style = props.style || {};
  }

  componentDidMount() {
    const style = document.createElement('style');
    style.textContent = keyframes(this.id, this.radius);
    this.styleEl = document.head.appendChild(style);
  }

  componentWillUnmount() {
    if (this.styleEl) {
      document.head.removeChild(this.styleEl);
      delete this.styleEl;
    }
  }

  render() {
    const { color = '#6ac1ff' } = this.props;
    const size = this.size;
    const width = `${size - 1}px`;
    const cx = size / 2;
    const r = this.radius;
    const strokeWidth = this.stroke;
    const offset = Math.round(Math.PI * 2 * r);
    const duration = this.duration;
    const style = Object.assign(this.style, { animationDuration: duration });

    return (
      <svg
        className="spinner"
        width={width}
        height={width}
        viewBox={`0 0 ${size} ${size}`}
        xmlns="http://www.w3.org/2000/svg"
        style={style}
      >
        <circle
          className="spinner-circle"
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${offset}px`}
          cx={cx}
          cy={cx}
          r={r}
          style={{ animationName: `dash-${this.id}`, animationDuration: duration }}
        />
      </svg>
    );
  }
}
