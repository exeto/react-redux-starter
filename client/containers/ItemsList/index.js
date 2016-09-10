import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux-apist';

import actionItem from '../../actions/item';
import actionTopstories from '../../actions/topstories';
import Item from '../../components/Item';
import Button from '../../components/Button';

class ItemsList extends Component {
  constructor(props) {
    super(props);
    this.loadItems = this.loadItems.bind(this);
  }

  componentDidMount() {
    const { aTopstories } = this.props;
    aTopstories.fetchAll().then(() => this.loadItems());
  }

  loadItems() {
    const { aItem, items, topstories } = this.props;
    const topstoriesLen = topstories.length;
    let nextLoad = items.length;
    let limit = nextLoad + 15;
    limit = limit < topstoriesLen ? limit : topstoriesLen;

    for (; nextLoad < limit; nextLoad++) {
      aItem.fetch(topstories[nextLoad]);
    }
  }

  render() {
    const { items, isLoading } = this.props;
    return (
      <div>
        {items.map(item => <Item key={item.id} item={item} />)}
        <Button onClick={this.loadItems} isLoading={isLoading}>Load More</Button>
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
    aItem: bindActionCreators(actionItem, dispatch),
    aTopstories: bindActionCreators(actionTopstories, dispatch),
  })
)(ItemsList);
