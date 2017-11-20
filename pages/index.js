import React, { Component } from "react";
import Head from "next/head";
import LazyLoadTranscript from '../components/lazyLoadTranscript';
import Loader from '../components/loader';
import InfiniteScroll from 'react-infinite-scroller';
import superagent from 'superagent'
import { get as _get, merge as _merge, set as _set, range as _range } from 'lodash'


export default class Lazyload extends Component {

  constructor(props) {
    super(props)
    this._loadMore = this._loadMore.bind(this)
    this._handleSubParagraph = this._handleSubParagraph.bind(this)
    this.state = {
      transcript: {},
      hasMore: true,
      currentPage: props.pageStart
    }
  }

  _loadMore(page) {
    superagent.get(`http://localhost:3000/transcript?page=${page}`)
      .end((err, res) => {
        let body = _get(res, 'body', {}),
            data = _get(body, 'data', {}),
            paginData = _get(data, page, []),
            hasMore = _get(body, 'hasMore', false),
            transcript = _get(this, 'state.transcript', {})

        if (paginData.length) {
          _set(transcript, page, paginData)
          this.setState({transcript, hasMore, currentPage: page })  
        }
        
      })
  }

  _handleSubParagraph(currentParagraph) {

    let { transcript } = this.state,
        text = [],
        main,
        sub,
        paginData = _get(transcript, currentParagraph, {})

    for (let i=0; i<paginData.length; i++) {
      let name = _get(paginData, `${i}.name`, ''),
          para = _get(paginData, `${i}.para`, ''),
          arr = para.split('-')

      sub = arr[1]
      main = arr[0]

      text[sub] = (text[sub] || '') + ` ${name}`

    }
    return text.map((subPara, i) => <p key={`${main}-${i}`} className={`${main}-${i}`}>{ subPara }</p>)
    
  }

  render() {

    let { pageStart } = this.props,
        { transcript, hasMore, currentPage } = this.state,
        subPara,
        paragraph = []

    return (
      <div>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta charSet="utf-8" />
        </Head>

        <div id="content">
          <h1>Transcript</h1>
          <div>
            <InfiniteScroll pageStart={pageStart} loadMore={this._loadMore} hasMore={hasMore} loader={Loader}>
              <div>
              { _range(0, currentPage + 1).reduce((accu, value) => accu.concat(this._handleSubParagraph(value)), []) }
              </div>
            </InfiniteScroll>
          </div>
          <button></button>
        </div>
      </div>
    )
  }

}

Lazyload.defaultProps = {
  pageStart: 1
}

