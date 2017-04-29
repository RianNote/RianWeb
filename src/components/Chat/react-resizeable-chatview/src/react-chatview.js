import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { clone } from 'lodash';

let supportsPassive = false;
try {
  const opts = Object.defineProperty({}, 'passive', {
    get() {
      supportsPassive = true;
    },
  });
  window.addEventListener('test', null, opts);
} catch (e) { /* pass */ }

export default class ChatView extends Component {
  static propTypes = {
    flipped: PropTypes.bool,
    reversed: PropTypes.bool,
    scrollLoadThreshold: PropTypes.number,
    onInfiniteLoad: PropTypes.func.isRequired,
    loadingSpinnerDelegate: PropTypes.element,
    className: PropTypes.string,
    maxHeight: PropTypes.string,
    children: PropTypes.node,
    returnScrollable: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.rafRequestId = null; // for cleaning up outstanding requestAnimationFrames on WillUnmount
    this.scrollTop = 0; // regular mode initial scroll
    this.scrollHeight = undefined; // it's okay, this won't be read until the second render.
    // In flipped mode, we need to measure the scrollable height from the DOM to write to the scrollTop.
    // Flipped and regular measured heights are symmetrical and don't depend on the scrollTop

    this.state = {
      isInfiniteLoading: false
    };
  }

  componentDidMount() {
    // If there are not yet any children (they are still loading),
    // this is a no-op as we are at both the top and bottom of empty viewport
    const heightDifference = this.props.flipped
        ? this.scrollable.scrollHeight - this.scrollable.clientHeight
        : 0;

    this.scrollable.scrollTop = heightDifference;
    this.scrollTop = heightDifference;

    // Unless passive events are supported, we must not hook onScroll event
    // directly - that will break hardware accelerated scrolling. We poll it
    // with requestAnimationFrame instead.
    if (supportsPassive) {
      this.scrollable.addEventListener('scroll', this.onScroll, { passive: true });
    } else {
      this.rafRequestId = window.requestAnimationFrame(this.pollScroll);
    }

    // upper ref
    if (typeof this.props.returnScrollable === 'function') this.props.returnScrollable(this.scrollable);
  }

  // componentDidUpdate(prevProps, prevState) {
  componentDidUpdate() {
    this.updateScrollTop();
  }

  componentWillUnmount() {
    this.scrollable.removeEventListener('scroll', this.onScroll, { passive: true });
    window.cancelAnimationFrame(this.rafRequestId);
  }

  // componentWillUpdate(nextProps, nextState) {}

  // detect when dom has changed underneath us- either scrollTop or scrollHeight (layout reflow)
  // may have changed.
  onScroll = () => {
    if (this.scrollable.scrollTop !== this.scrollTop) {
      if (this.shouldTriggerLoad()) {
        this.setState({ isInfiniteLoading: true });
        const p = this.props.onInfiniteLoad();
        p.then(() => this.setState({ isInfiniteLoading: false }));
      }
      // the dom is ahead of the state
      this.updateScrollTop();
    }
  }

  pollScroll() {
    this.onScroll();
    this.rafRequestId = window.requestAnimationFrame(this.pollScroll);
  }

  isPassedThreshold = (flipped, scrollLoadThreshold, scrollTop, scrollHeight, clientHeight) => {
    return flipped
        ? scrollTop <= scrollLoadThreshold
        : scrollTop >= (scrollHeight - clientHeight - scrollLoadThreshold);
  }

  shouldTriggerLoad() {
    const passedThreshold = this.isPassedThreshold(
        this.props.flipped,
        this.props.scrollLoadThreshold,
        this.scrollable.scrollTop,
        this.scrollable.scrollHeight,
        this.scrollable.clientHeight);
    return passedThreshold && !this.state.isInfiniteLoading;
  }

  updateScrollTop() {
    // todo this is only the happy path
    let newScrollTop = this.scrollable.scrollTop + (this.props.flipped
        ? this.scrollable.scrollHeight - (this.scrollHeight || 0)
        : 0);

    // if scrollHeightDifference is > 0 then something was removed from list
    const scrollHeightDifference = this.scrollHeight ? this.scrollHeight - this.scrollable.scrollHeight : 0;

    // if something was removed from list we need to include this difference in new scroll top
    if (this.props.flipped && scrollHeightDifference > 0) {
      newScrollTop += scrollHeightDifference;
    }

    if (newScrollTop !== this.scrollable.scrollTop) {
      this.scrollable.scrollTop = newScrollTop;
    }

    this.scrollTop = this.scrollable.scrollTop;
    this.scrollHeight = this.scrollable.scrollHeight;

    // Setting scrollTop can halt user scrolling (and disables hardware acceleration)

    // Both cases - flipped and refular - have cases where the content expands in the proper direction,
    // or the content expands in the wrong direciton. Either history or new message in both cases.
    // We are only handling half of the cases. Or an image resized above or below us.
  }

  render() {
    const displayables = clone(this.props.children);
    if (this.props.flipped && !this.props.reversed) {
      displayables.reverse();
    }

    const loadSpinner = (<div ref={e => { this.loadingSpinner = e; }}>
      {this.state.isInfiniteLoading ? this.props.loadingSpinnerDelegate : null}
    </div>);

    return (
      <div className={this.props.className} ref={e => { this.scrollable = e; }}
        style={this.props.maxHeight ? { overflowX: 'hidden', overflowY: 'scroll', maxHeight: this.props.maxHeight } : { overflowX: 'hidden', overflowY: 'scroll' }}
      >
        <div ref={e => { this.smoothScrollingWrapper = e; }}>
          {this.props.flipped ? loadSpinner : null}
          {displayables}
          {this.props.flipped ? null : loadSpinner}
        </div>
      </div>
    );
  }
}

ChatView.defaultProps = {
  flipped: false,
  scrollLoadThreshold: 10,
  loadingSpinnerDelegate: <div />,
  className: '',
  maxHeight: ''
};
