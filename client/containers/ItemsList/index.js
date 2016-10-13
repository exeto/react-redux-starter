import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux-apist';

import actionsItem from '../../actions/item';
import actionsTopstories from '../../actions/topstories';
import Item from '../../components/Item';
import Button from '../../components/Button';

class ItemsList extends Component {
  componentDidMount() {
    const { aTopstories, topstories } = this.props;
    if (topstories.length) {
      this.loadItems();
    }
    aTopstories.fetchAll().then(() => this.loadItems());
  }

  loadItems() {
    const { aItem, items, topstories } = this.props;
    const topstoriesLen = topstories.length;
    let nextLoad = items.length;
    let limit = nextLoad + 15;
    limit = limit < topstoriesLen ? limit : topstoriesLen;

    for (; nextLoad < limit; nextLoad += 1) {
      aItem.fetch(topstories[nextLoad]);
    }
  }

  render() {
    const { items, isLoading } = this.props;
    return (
      <div>
        {items.map(item => <Item key={item.id} item={item} />)}
        <Button handleClick={() => this.loadItems()} isLoading={isLoading}>Load More</Button>
      </div>
    );
  }
}

ItemsList.propTypes = {
  items: PropTypes.array,
  topstories: PropTypes.array,
  aItem: PropTypes.object,
  aTopstories: PropTypes.object,
  isLoading: PropTypes.number,
};

export default connect(
  state => ({
    items: state.items,
    topstories: state.topstories,
    isLoading: state.loading,
  }),
  dispatch => ({
    aItem: bindActionCreators(actionsItem, dispatch),
    aTopstories: bindActionCreators(actionsTopstories, dispatch),
  })
)(ItemsList);
