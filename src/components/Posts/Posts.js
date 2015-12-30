require("./Posts.css");

import React, {Component} from "react";
import {fetchPosts} from "action_creators/post"

class Posts extends Component {

  componentDidMount() {
    this.props.dispatch(fetchPosts())
  }

  render() {
    var views = this.props.post.posts.map(function(item, i) {
      return <div className="Post" key={i}>{item.title}</div>
    });

    return (
      <div className="Posts">
        <div className="Posts-info" onClick={this.handleClick.bind(this)}>{this.props.post.message}</div>
        <div className="Posts-content">{views}</div>
      </div>
    )
  }

  handleClick() {
    if (this.props.post.isFetching) {
      alert("正在加载")
    } else {
      this.props.dispatch(fetchPosts())
    }
  }
}

export default Posts;